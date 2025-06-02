import { useState, useEffect, useCallback, useMemo } from "react";
import { ref, onValue, update } from "firebase/database";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { db } from "./Firebase";

// Icons
import { Activity } from "lucide-react";
import SensorMonitoring from "./SensorMonitoring";
import SistemControl from "./SistemControl";
import LogAktivitas from "./LogAktivitas";
import HeaderInfo from "./Header";

ChartJS.register(ArcElement, Tooltip, Legend);

// Constants
const MAX_LOGS = 20;
const GAS_THRESHOLD = 300;
const DANGER_LEVELS = {
	LOW: 200,
	HIGH: GAS_THRESHOLD,
};

const FireDetectionDashboard = () => {
	// State management
	const [sensorData, setSensorData] = useState({
		gas: 0,
		flame: false,
	});

	const [controlData, setControlData] = useState({
		mode: "auto",
		fan: false,
		pump: false,
	});

	const [logs, setLogs] = useState([]);
	const [isConnected, setIsConnected] = useState(true);

	// Memoized values
	const gasLevel = useMemo(() => {
		if (sensorData.gas < DANGER_LEVELS.LOW) return "Aman";
		if (sensorData.gas < DANGER_LEVELS.HIGH) return "Sedang";
		return "Bahaya";
	}, [sensorData.gas]);

	const overallSafetyStatus = useMemo(
		() => sensorData.gas >= DANGER_LEVELS.HIGH || sensorData.flame,
		[sensorData.gas, sensorData.flame]
	);

	// Generate timestamp
	const generateTimestamp = useCallback(() => {
		return new Date().toLocaleString("id-ID", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});
	}, []);

	// Add log entry
	const addLogEntry = useCallback(
		(type, message) => {
			setLogs((prevLogs) => {
				const newLog = {
					timestamp: generateTimestamp(),
					type,
					message,
				};
				const updatedLogs = [newLog, ...prevLogs];
				return updatedLogs.length > MAX_LOGS
					? updatedLogs.slice(0, MAX_LOGS)
					: updatedLogs;
			});
		},
		[generateTimestamp]
	);

	// Initialize with system log
	useEffect(() => {
		addLogEntry("Sistem", "Dashboard berhasil dimuat.");
	}, [addLogEntry]);

	// Firebase listeners
	useEffect(() => {
		const sensorRef = ref(db, "sensor");
		const controlRef = ref(db, "control");
		const connectionRef = ref(db, ".info/connected");

		const sensorUnsubscribe = onValue(sensorRef, (snapshot) => {
			const currentFirebaseData = snapshot.val();
			if (currentFirebaseData) {
				setSensorData((prev) => {
					// Gas sensor logging
					if (currentFirebaseData.gas !== prev.gas) {
						const prevLevel =
							prev.gas < DANGER_LEVELS.LOW
								? "Aman"
								: prev.gas < DANGER_LEVELS.HIGH
								? "Sedang"
								: "Bahaya";
						const currentLevel =
							currentFirebaseData.gas < DANGER_LEVELS.LOW
								? "Aman"
								: currentFirebaseData.gas < DANGER_LEVELS.HIGH
								? "Sedang"
								: "Bahaya";

						if (prevLevel !== currentLevel) {
							addLogEntry(
								"Sensor Gas",
								`Level gas berubah menjadi ${currentLevel} (${currentFirebaseData.gas} PPM)`
							);
						}
					}

					// Flame sensor logging
					if (currentFirebaseData.flame !== prev.flame) {
						addLogEntry(
							"Sensor Api",
							currentFirebaseData.flame
								? "API TERDETEKSI!"
								: "Api tidak lagi terdeteksi."
						);
					}

					return {
						...prev,
						gas: currentFirebaseData.gas ?? 0,
						flame: currentFirebaseData.flame ?? false,
					};
				});
			}
		});

		const controlUnsubscribe = onValue(controlRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				setControlData((prev) => {
					if (data.mode !== prev.mode) {
						addLogEntry(
							"Sistem",
							`Mode sistem diubah ke ${data.mode.toUpperCase()}`
						);
					}
					if (data.fan !== prev.fan) {
						addLogEntry(
							data.mode === "auto" ? "Sistem Auto" : "Kontrol Manual",
							`Kipas Exhaust ${data.fan ? "dinyalakan" : "dimatikan"}`
						);
					}
					if (data.pump !== prev.pump) {
						addLogEntry(
							data.mode === "auto" ? "Sistem Auto" : "Kontrol Manual",
							`Pompa Air ${data.pump ? "dinyalakan" : "dimatikan"}`
						);
					}
					return data;
				});
			}
		});

		const connectionUnsubscribe = onValue(connectionRef, (snapshot) => {
			setIsConnected(snapshot.val() === true);
			if (snapshot.val() === false) {
				addLogEntry("Sistem", "Koneksi database terputus");
			} else {
				addLogEntry("Sistem", "Koneksi database pulih");
			}
		});

		return () => {
			sensorUnsubscribe();
			controlUnsubscribe();
			connectionUnsubscribe();
		};
	}, [addLogEntry]);

	// Control functions
	const toggleMode = async () => {
		const newMode = controlData.mode === "auto" ? "manual" : "auto";
		try {
			await update(ref(db, "control"), { mode: newMode });
		} catch (error) {
			console.error("Error mengubah mode:", error);
			addLogEntry("Error Sistem", "Gagal mengubah mode sistem.");
		}
	};

	const setActuator = async (actuator, state) => {
		try {
			await update(ref(db, "control"), { [actuator]: state });
		} catch (error) {
			console.error(`Error mengubah status ${actuator}:`, error);
			addLogEntry(
				"Error Kontrol",
				`Gagal mengubah status ${
					actuator === "fan" ? "Kipas Exhaust" : "Pompa Air"
				}.`
			);
		}
	};

	// Chart configuration
	const chartData = useMemo(() => {
		const colors = {
			green: "#00FFAA",
			yellow: "#FFD700",
			red: "#FF4D4D",
			track: "#1E293B",
		};

		return {
			datasets: [
				{
					data: [sensorData.gas, Math.max(0, 1000 - sensorData.gas)],
					backgroundColor: [
						sensorData.gas < DANGER_LEVELS.LOW
							? colors.green
							: sensorData.gas < DANGER_LEVELS.HIGH
							? colors.yellow
							: colors.red,
						colors.track,
					],
					borderColor: "transparent",
					borderWidth: 0,
					circumference: 360,
					borderRadius: 10,
				},
			],
		};
	}, [sensorData.gas]);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			cutout: "82%",
			plugins: { legend: { display: false }, tooltip: { enabled: false } },
			animation: { duration: 800, easing: "easeOutQuart" },
		}),
		[]
	);

	// UI helpers
	const getStatusBadgeVariant = (status) => {
		if (status === "Aman" || status === true) return "success";
		if (status === "Sedang") return "warning";
		if (status === "Bahaya" || status === false) return "destructive";
		return "default";
	};

	const getGasColorClass = (ppm) => {
		if (ppm < DANGER_LEVELS.LOW) return "text-emerald-400";
		if (ppm < DANGER_LEVELS.HIGH) return "text-amber-400";
		return "text-red-500";
	};

	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
			<div className="container mx-auto w-full max-w-xl">
				{/* Futuristic Header with Glow Effect */}
				<HeaderInfo />

				<main className="space-y-8">
					{/* Sensor Monitoring Section */}
					<SensorMonitoring
						gasLevel={gasLevel}
						sensorData={sensorData}
						chartData={chartData}
						chartOptions={chartOptions}
						getGasColorClass={getGasColorClass}
						getStatusBadgeVariant={getStatusBadgeVariant}
						DANGER_LEVELS={DANGER_LEVELS}
					/>

					{/* System Control Section */}
					<SistemControl
						controlData={controlData}
						toggleMode={toggleMode}
						setActuator={setActuator}
						isConnected={isConnected}
						overallSafetyStatus={overallSafetyStatus}
						generateTimestamp={generateTimestamp}
						getStatusBadgeVariant={getStatusBadgeVariant}
					/>

					{/* Activity Log Section */}
					<LogAktivitas logs={logs} />
				</main>

				{/* Futuristic Footer */}
				<footer className="text-center mt-12 py-8 text-sm text-slate-500 border-t border-slate-700/50">
					<p className="flex items-center justify-center">
						<Activity className="h-4 w-4 mr-2 text-cyan-400" />
						&copy; {new Date().getFullYear()} SMART HOME SAFETY PROTOTYPE
					</p>
				</footer>
			</div>
		</div>
	);
};

export default FireDetectionDashboard;

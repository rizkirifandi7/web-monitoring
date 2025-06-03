import {
	createContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
	useContext,
} from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../components/Firebase"; // Adjust path if necessary

const DashboardContext = createContext();

// Constants
const MAX_LOGS = 20;
const GAS_THRESHOLD = 400;
const DANGER_LEVELS = {
	LOW: 200,
	HIGH: GAS_THRESHOLD,
};

export const DashboardProvider = ({ children }) => {
	const [sensorData, setSensorData] = useState({ gas: 0, flame: false });
	const [controlData, setControlData] = useState({
		mode: "auto",
		fan: false,
		pump: false,
	});
	const [logs, setLogs] = useState([]);
	const [isConnected, setIsConnected] = useState(true);

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

	const addLogEntry = useCallback(
		(type, message) => {
			setLogs((prevLogs) => {
				const newLog = { timestamp: generateTimestamp(), type, message };
				const updatedLogs = [newLog, ...prevLogs];
				return updatedLogs.length > MAX_LOGS
					? updatedLogs.slice(0, MAX_LOGS)
					: updatedLogs;
			});
		},
		[generateTimestamp]
	);

	useEffect(() => {
		addLogEntry("Sistem", "Dashboard berhasil dimuat.");
	}, [addLogEntry]);

	useEffect(() => {
		const sensorRef = ref(db, "sensor");
		const controlRef = ref(db, "control");
		const connectionRef = ref(db, ".info/connected");

		const sensorUnsubscribe = onValue(sensorRef, (snapshot) => {
			const currentFirebaseData = snapshot.val();
			if (currentFirebaseData) {
				setSensorData((prev) => {
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
					if (data.mode !== prev.mode)
						addLogEntry(
							"Sistem",
							`Mode sistem diubah ke ${data.mode.toUpperCase()}`
						);
					if (data.fan !== prev.fan)
						addLogEntry(
							data.mode === "auto" ? "Sistem Auto" : "Kontrol Manual",
							`Kipas Exhaust ${data.fan ? "dinyalakan" : "dimatikan"}`
						);
					if (data.pump !== prev.pump)
						addLogEntry(
							data.mode === "auto" ? "Sistem Auto" : "Kontrol Manual",
							`Pompa Air ${data.pump ? "dinyalakan" : "dimatikan"}`
						);
					return data;
				});
			}
		});

		const connectionUnsubscribe = onValue(connectionRef, (snapshot) => {
			const connected = snapshot.val() === true;
			setIsConnected(connected);
			addLogEntry(
				"Sistem",
				connected ? "Koneksi database pulih" : "Koneksi database terputus"
			);
		});

		return () => {
			sensorUnsubscribe();
			controlUnsubscribe();
			connectionUnsubscribe();
		};
	}, [addLogEntry]);

	const gasLevel = useMemo(() => {
		if (sensorData.gas < DANGER_LEVELS.LOW) return "Aman";
		if (sensorData.gas < DANGER_LEVELS.HIGH) return "Sedang";
		return "Bahaya";
	}, [sensorData.gas]);

	const overallSafetyStatus = useMemo(
		() => sensorData.gas >= DANGER_LEVELS.HIGH || sensorData.flame,
		[sensorData.gas, sensorData.flame]
	);

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

	const value = {
		sensorData,
		controlData,
		logs,
		isConnected,
		addLogEntry,
		generateTimestamp,
		gasLevel,
		overallSafetyStatus,
		toggleMode,
		setActuator,
		DANGER_LEVELS,
	};

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboard = () => {
	const context = useContext(DashboardContext);
	if (context === undefined) {
		throw new Error("useDashboard must be used within a DashboardProvider");
	}
	return context;
};

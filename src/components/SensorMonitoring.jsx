import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Badge } from "@/components/ui/badge";
import { Cpu, Flame, Gauge, AlertTriangle, ShieldCheck } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const SensorMonitoring = ({
	sensorData,
	overallSafetyStatus,
	DANGER_LEVELS,
}) => {
	// Chart configuration
	const chartData = useMemo(() => {
		const colors = {
			green: "#00FFAA", // Emerald-like green
			yellow: "#FFD700", // Amber/Gold
			red: "#FF4D4D", // Softer Red
			track: "#1E293B", // Slate-800
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
					borderColor: "transparent", // No border for segments
					borderWidth: 0,
					circumference: 360, // Full circle
					borderRadius: 10, // Rounded ends for the data segment
				},
			],
		};
	}, [sensorData.gas, DANGER_LEVELS.HIGH, DANGER_LEVELS.LOW]);

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: false,
			cutout: "82%", // Creates the doughnut hole
			plugins: { legend: { display: false }, tooltip: { enabled: false } },
			animation: { duration: 800, easing: "easeOutQuart" },
		}),
		[]
	);

	// UI helper
	const getGasColorClass = (ppm) => {
		if (ppm < DANGER_LEVELS.LOW) return "text-emerald-400";
		if (ppm < DANGER_LEVELS.HIGH) return "text-amber-400";
		return "text-red-500";
	};

	const gasLegendItems = [
		{
			label: "Aman",
			color: "bg-emerald-400",
			value: `< ${DANGER_LEVELS.LOW} PPM`,
		},
		{
			label: "Siaga",
			color: "bg-amber-400",
			value: `${DANGER_LEVELS.LOW} - ${DANGER_LEVELS.HIGH - 1} PPM`,
		},
		{
			label: "Bahaya",
			color: "bg-red-500",
			value: `≥ ${DANGER_LEVELS.HIGH} PPM`,
		},
	];

	return (
		<section>
			<h2 className="text-xl font-semibold mb-10 text-sky-400 flex items-center">
				<Cpu className="mr-3 h-7 w-7 text-cyan-400" />{" "}
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-300">
					Real-time Sensor Monitoring
				</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card className="bg-slate-800/70 border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-lg hover:border-cyan-500/70 hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out overflow-hidden">
					<CardHeader className="border-b border-slate-700/80 pb-4 pt-5 px-5">
						<CardTitle className="flex items-center text-lg font-semibold text-slate-100">
							<Gauge size={22} className="mr-2.5 text-cyan-400" /> Gas Sensor
							Status
						</CardTitle>
						<CardDescription className="text-slate-400 text-sm mt-1">
							Real-time gas konsentrasi monitoring dalam PPM.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center pt-6 pb-6 px-5">
						<div className="relative mx-auto h-48 w-48 mb-8">
							<Doughnut data={chartData} options={chartOptions} />
							<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
								<span
									className={`text-6xl font-bold ${getGasColorClass(
										sensorData.gas
									)}`}
								>
									{sensorData.gas}
								</span>
								<span className="text-base text-slate-400 uppercase tracking-widest mt-1">
									PPM
								</span>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-2.5 w-full text-xs">
							{gasLegendItems.map((item) => (
								<div
									key={item.label}
									className="flex flex-col items-center justify-center p-3 bg-slate-700/50 rounded-lg shadow-md hover:bg-slate-700/70 transition-colors h-full" // Enhanced styling for legend items
								>
									<div className="flex items-center mb-1.5">
										<span
											className={`w-2 h-2 rounded-full ${item.color} mr-1 shadow-lg`} // Larger dot, more margin, stronger shadow
										></span>
										<span className="font-semibold text-slate-100 text-[10px]">
											{item.label}
										</span>{" "}
									</div>
									<span className="text-slate-400 font-mono text-[10px] tracking-tight">
										{item.value}
									</span>{" "}
								</div>
							))}
						</div>
					</CardContent>
				</Card>
				{/* Flame Sensor Card */}
				<Card
					className={`bg-slate-800/70 border rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden group ${
						sensorData.flame
							? "border-slate-700/50 hover:border-sky-500/70 hover:shadow-sky-500/30"
							: "border-red-500/60 hover:border-red-400/80 hover:shadow-red-500/40 animate-pulse-border-red-intense"
					}`}
				>
					<CardHeader className="border-b border-slate-700/80 pb-4 pt-5 px-5">
						<CardTitle className="flex items-center text-lg font-semibold text-slate-100">
							<Flame
								size={22} // Consistent icon size
								className={`mr-2.5 transition-colors duration-300 ${
									// Consistent margin
									sensorData.flame
										? "text-slate-500 group-hover:text-sky-400"
										: "text-red-400 animate-pulse"
								}`}
							/>
							Flame Sensor Status
						</CardTitle>
						<CardDescription className="text-slate-400 text-sm mt-1">
							Real-time api monitoring untuk keamanan sistem.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-between text-center h-full pt-8 pb-8 px-5 min-h-[300px]">
						<div className="flex flex-col items-center">
							{sensorData.flame ? (
								<ShieldCheck size={64} className="text-emerald-400 mb-5" /> // Changed to ShieldCheck for "Aman"
							) : (
								<AlertTriangle
									size={64}
									className="text-red-400 mb-5 animate-ping once"
								/>
							)}
							<Badge
								className={`mb-5 text-base px-10 py-3 rounded-lg font-extrabold tracking-wider shadow-lg ${
									// rounded-lg
									sensorData.flame
										? "bg-emerald-500/90 text-emerald-50 hover:bg-emerald-500"
										: "bg-red-500/90 text-red-50 hover:bg-red-500"
								}`}
							>
								{sensorData.flame ? "AMAN" : "BAHAYA"}
							</Badge>
						</div>
						<p className="text-md text-slate-300 px-2">
							{" "}
							{/* Added slight horizontal padding */}
							{sensorData.flame
								? "Tidak ada api terdeteksi, sistem aman." // Swapped messages to match icon logic
								: "Sistem mendeteksi adanya api! Segera periksa!"}
						</p>
					</CardContent>
				</Card>

				<Card
					className={`md:col-span-2 rounded-2xl backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden shadow-2xl group
                        ${
													overallSafetyStatus
														? "bg-slate-800/60 border-2 border-emerald-500/50 hover:border-emerald-400/80 hover:shadow-[0_0_40px_-15px_rgba(16,185,129,0.5)]" // Enhanced emerald glow on hover
														: "bg-slate-800/60 border-2 border-red-400 hover:border-red-300/80 hover:shadow-[0_0_40px_-15px_rgba(239,68,68,0.5)]" // More prominent red border and glow
												}`}
				>
					<CardHeader className="border-b border-slate-700/50 py-4 px-6 shadow-sm">
						<CardTitle className="text-xl font-semibold text-center text-slate-100 tracking-wider">
							Status Keamanan Sistem
						</CardTitle>
					</CardHeader>

					<CardContent
						className={`pt-8 pb-8 px-6 flex flex-col items-center justify-center min-h-[240px] relative text-center transition-colors duration-500 ease-in-out
                        ${
													overallSafetyStatus
														? "bg-slate-800/30"
														: "bg-red-900/30"
												}`}
					>
						{/* Icon with background glow effect */}
						<div className="relative mb-6">
							{overallSafetyStatus ? (
								<ShieldCheck
									size={72} // Larger icon
									className="text-emerald-400 relative z-10 drop-shadow-lg" // Icon pops with drop shadow
								/>
							) : (
								<AlertTriangle
									size={72} // Larger icon
									className="text-red-400 relative z-10 animate-ping drop-shadow-lg" // Ping animation for danger
								/>
							)}
							{/* Glow effect div - positioned behind the icon */}
							<div
								className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-3xl rounded-full -z-0 transition-all duration-500 ease-in-out
                                ${
																	overallSafetyStatus
																		? "bg-emerald-500/40 opacity-80 group-hover:opacity-100 group-hover:scale-110" // Emerald glow, enhances on hover
																		: "bg-red-500/40 opacity-80 group-hover:opacity-100 group-hover:scale-110 animate-pulse" // Red glow, pulses and enhances on hover
																}`}
							></div>
						</div>
						{/* Status Text - Larger and Bolder */}
						<span
							className={`text-xl md:text-2xl font-black tracking-tighter uppercase
                                ${
																	overallSafetyStatus
																		? "text-emerald-300" // Bright emerald for AMAN
																		: "text-red-300" // Bright red for BAHAYA
																}`}
						>
							{overallSafetyStatus ? "AMAN" : "BAHAYA"}
						</span>
						{/* Sub-status text for more context */}
						<p
							className={`mt-3 text-base font-semibold
                            ${
															overallSafetyStatus
																? "text-emerald-400/90"
																: "text-red-400/90"
														}`}
						>
							{overallSafetyStatus
								? "Sistem Stabil & Terpantau"
								: "Peringatan Keamanan Aktif"}
						</p>
					</CardContent>

					<CardFooter className="border-t border-slate-700/50 py-5 px-6 text-center bg-slate-900/60">
						<p
							className={`text-sm leading-relaxed
                            ${
															overallSafetyStatus
																? "text-slate-300"
																: "text-red-200 font-semibold"
														}`} // Footer text color reflects status
						>
							{overallSafetyStatus
								? "Semua parameter sistem dalam batas aman. Tidak ada ancaman terdeteksi."
								: "Terdeteksi kondisi kritis! Segera lakukan pemeriksaan dan tindakan yang diperlukan."}
						</p>
					</CardFooter>
				</Card>
			</div>
		</section>
	);
};

export default SensorMonitoring;

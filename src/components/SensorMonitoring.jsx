import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Cpu, Flame, Gauge, AlertTriangle } from "lucide-react";

const SensorMonitoring = ({
	sensorData,
	chartData,
	chartOptions,
	getGasColorClass,
	DANGER_LEVELS,
}) => {
	const gasLegendItems = [
		{
			label: "Aman",
			color: "bg-emerald-400",
			value: `< ${DANGER_LEVELS.LOW} PPM`,
		},
		{
			label: "Sedang",
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
			<h2 className="text-xl font-semibold mb-8 text-sky-400 flex items-center">
				<Cpu className="mr-3 h-6 w-6 text-cyan-400" />
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-300">
					Real-time Sensor Monitoring
				</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card className="bg-slate-800/70 border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-lg hover:border-cyan-500/70 hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out overflow-hidden">
					<CardHeader className="pb-3 pt-5 px-5">
						<CardTitle className="flex items-center text-base text-slate-100">
							<Gauge size={24} className="mr-2 text-cyan-400" /> Gas Sensor
							Status
						</CardTitle>
						<CardDescription className="text-slate-400 text-sm">
							Real-time gas konsentrasi monitoring dalam PPM.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center pt-4 pb-6 px-5">
						<div className="relative mx-auto h-48 w-48 mb-6">
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
						<div className="grid grid-cols-3 items-center gap-1 w-full text-[8px] text-slate-400">
							{gasLegendItems.map((item) => (
								<div
									key={item.label}
									className="flex flex-col items-center justify-between p-2 bg-slate-700/30 rounded-md h-full"
								>
									<div className="flex items-center">
										<span
											className={`w-2 h-2 rounded-full ${item.color} mr-2 shadow-sm`}
										></span>
										<span className="font-medium text-slate-300">
											{item.label}
										</span>
									</div>
									<span className="text-slate-500">{item.value}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
				{/* Flame Sensor Card */}
				<Card
					className={`bg-slate-800/70 border rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden group ${
						// Added group for hover effects
						sensorData.flame
							? "border-red-500/60 hover:border-red-400/80 hover:shadow-red-500/40 animate-pulse-border-red-intense" // Custom animation class
							: "border-slate-700/50 hover:border-sky-500/70 hover:shadow-sky-500/30"
					}`}
				>
					<CardHeader className="pb-3 pt-5 px-5">
						<CardTitle className="flex items-center text-base text-slate-100">
							<Flame // Icon styled directly for pulsing effect
								size={24}
								className={`mr-2 transition-colors duration-300 ${
									sensorData.flame
										? "text-red-400 animate-pulse" // Simple pulse on icon
										: "text-slate-500 group-hover:text-sky-400" // Change color on card hover if no flame
								}`}
							/>
							Flame Sensor Status
						</CardTitle>
						<CardDescription className="text-slate-400 text-sm">
							Real-time api monitoring untuk keamanan sistem.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-between text-center h-full pt-8 pb-8 px-5 min-h-[300px]">
						<div className="flex flex-col items-center">
							{sensorData.flame ? (
								<AlertTriangle
									size={64}
									className="text-red-400 mb-5 animate-ping once" // Ping animation once
								/>
							) : (
								<Flame size={64} className="text-emerald-400 mb-5" /> // Green flame when safe
							)}
							<Badge
								className={`mb-5 text-base px-10 py-3 rounded-md font-extrabold tracking-wider shadow-lg ${
									sensorData.flame
										? "bg-red-600 text-red-50 hover:bg-red-700" // Kelas untuk status "BAHAYA"
										: "bg-emerald-600 text-green-50 hover:bg-green-700" // Kelas untuk status "AMAN"
								}`}
							>
								{sensorData.flame ? "BAHAYA" : "AMAN"}
							</Badge>
						</div>
						<p className="text-md text-slate-300">
							{sensorData.flame
								? "Sistem mendeteksi adanya api! Segera periksa!"
								: "Tidak ada api terdeteksi, sistem aman."}
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default SensorMonitoring;

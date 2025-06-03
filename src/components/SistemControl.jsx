import React, { useCallback } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Database, Wind, Droplets, Shield } from "lucide-react";

const SistemControl = ({
	controlData,
	toggleMode,
	setActuator,
	isConnected,
}) => {
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
	return (
		<section>
			<h2 className="text-xl font-semibold mb-6 text-cyan-400 flex items-center">
				<Settings className="mr-3 h-6 w-6" />
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">
					Kontrol Sistem
				</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				{/* System Status Card */}
				<Card className="bg-slate-800/90 border border-slate-700/50 rounded-xl shadow-lg shadow-slate-950/30 backdrop-blur-sm hover:shadow-purple-500/10 transition-all duration-500">
					<CardHeader>
						<CardTitle className="text-base flex items-center text-slate-300">
							Status Sistem
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-2 mb-2">
							<Database
								className={`h-4 w-4 ${
									isConnected ? "text-emerald-400" : "text-red-400"
								}`}
							/>
							<span className="text-sm text-slate-400">
								Database: {isConnected ? "Connected" : "Disconnected"}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<Shield className="h-4 w-4 text-cyan-400" />
							<span className="text-sm text-slate-400">
								Last update: {generateTimestamp()}
							</span>
						</div>
					</CardContent>
				</Card>

				{/* Mode Control Card */}
				<Card className=" bg-slate-800/90 border border-slate-700/50 rounded-xl shadow-lg shadow-slate-950/30 backdrop-blur-sm hover:shadow-sky-500/10 transition-all duration-500">
					<CardHeader>
						<CardTitle className="text-base text-slate-300">
							Sistem Mode
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Badge
							variant={controlData.mode === "auto" ? "default" : "secondary"}
							className={
								"w-full text-md px-4 py-1.5 rounded-md bg-gradient-to-r from-emerald-600/30 to-green-600/30 text-emerald-300 border border-emerald-500/30"
							}
						>
							{controlData.mode.toUpperCase()}
						</Badge>
					</CardContent>
					<CardFooter>
						<Button
							onClick={toggleMode}
							className="w-full bg-emerald-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold transition-all duration-300"
							variant={controlData.mode === "auto" ? "default" : "outline"}
						>
							Ganti ke {controlData.mode === "auto" ? "MANUAL" : "AUTOMATIS"}
						</Button>
					</CardFooter>
				</Card>
			</div>

			{/* Actuator Controls */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Fan Control Card */}
				<Card className="bg-slate-800/90 border border-slate-700/50 rounded-xl shadow-lg shadow-slate-950/30 backdrop-blur-sm hover:shadow-blue-500/10 transition-all duration-500">
					<CardHeader>
						<CardTitle className="flex items-center text-base text-slate-200">
							<Wind className="mr-2 text-blue-400" />
							Ventilasi Sistem
						</CardTitle>
						<CardDescription className="text-slate-400">
							Kontrol sistem ventilasi untuk sirkulasi udara
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between items-center mb-4">
							<span className="text-sm text-slate-400">Status:</span>
							<Badge
								className={`px-3 py-1 text-sm rounded-md ${
									controlData.fan
										? "bg-blue-600 text-blue-50"
										: "bg-slate-600 text-slate-300"
								}`}
							>
								{controlData.fan ? "AKTIF" : "TIDAK AKTIF"}
							</Badge>
						</div>
						{controlData.mode === "manual" ? (
							<div className="flex space-x-3">
								<Button
									onClick={() => setActuator("fan", true)}
									disabled={controlData.fan}
									className="flex-1 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-700/50 text-blue-300 disabled:opacity-50 transition-all duration-300"
									variant="outline"
								>
									ON
								</Button>
								<Button
									onClick={() => setActuator("fan", false)}
									disabled={!controlData.fan}
									className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 disabled:opacity-50 transition-all duration-300"
									variant="outline"
								>
									OFF
								</Button>
							</div>
						) : (
							<p className="text-sm text-center py-3 text-slate-500">
								Kontrol otomatis aktif
							</p>
						)}
					</CardContent>
				</Card>

				{/* Pump Control Card */}
				<Card className="bg-slate-800/90 border border-slate-700/50 rounded-xl shadow-lg shadow-slate-950/30 backdrop-blur-sm hover:shadow-teal-500/10 transition-all duration-500">
					<CardHeader>
						<CardTitle className="flex items-center text-base text-slate-200">
							<Droplets className="mr-2 text-teal-400" />
							Pompa Air
						</CardTitle>
						<CardDescription className="text-slate-400">
							Kontrol sistem pompa air untuk sirkulasi
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex justify-between items-center mb-4">
							<span className="text-sm text-slate-400">Status:</span>
							<Badge
								className={`px-3 py-1 text-sm rounded-md ${
									controlData.pump
										? "bg-teal-600 text-teal-50"
										: "bg-slate-600 text-slate-300"
								}`}
							>
								{controlData.pump ? "AKTIF" : "TIDAK AKTIF"}
							</Badge>
						</div>
						{controlData.mode === "manual" ? (
							<div className="flex space-x-3">
								<Button
									onClick={() => setActuator("pump", true)}
									disabled={controlData.pump}
									className="flex-1 bg-teal-900/30 hover:bg-teal-800/50 border border-teal-700/50 text-teal-300 disabled:opacity-50 transition-all duration-300"
									variant="outline"
								>
									ON
								</Button>
								<Button
									onClick={() => setActuator("pump", false)}
									disabled={!controlData.pump}
									className="flex-1 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 disabled:opacity-50 transition-all duration-300"
									variant="outline"
								>
									OFF
								</Button>
							</div>
						) : (
							<p className="text-sm text-center py-3 text-slate-500">
								Kontrol otomatis aktif
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default SistemControl;

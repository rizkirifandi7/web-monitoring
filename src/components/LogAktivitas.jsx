import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, TerminalSquare } from "lucide-react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const LogAktivitas = ({ logs }) => {
	const getBadgeStyles = (logType) => {
		let baseClasses =
			"text-xs px-3 py-1 rounded-full font-medium tracking-wider transition-all duration-200 ease-in-out";
		let variantClasses = "";

		if (logType.includes("Error")) {
			variantClasses =
				"bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30 hover:shadow-md hover:shadow-red-500/30";
		} else if (logType.includes("Sensor Api")) {
			variantClasses =
				"bg-orange-500/20 text-orange-300 border border-orange-500/50 hover:bg-orange-500/30 hover:shadow-md hover:shadow-orange-500/30";
		} else if (logType.includes("Sensor Gas")) {
			variantClasses =
				"bg-sky-500/20 text-sky-300 border border-sky-500/50 hover:bg-sky-500/30 hover:shadow-md hover:shadow-sky-500/30";
		} else if (logType.includes("Sistem Auto")) {
			variantClasses =
				"bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30 hover:shadow-md hover:shadow-purple-500/30";
		} else if (logType === "Sistem") {
			variantClasses =
				"bg-slate-600/40 text-slate-300 border border-slate-500/50 hover:bg-slate-600/60 hover:shadow-md hover:shadow-slate-500/30";
		} else {
			variantClasses =
				"bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700/70";
		}
		return `${baseClasses} ${variantClasses}`;
	};

	return (
		<section>
			<h2 className="text-xl font-semibold mb-6 text-sky-400 flex items-center">
				<TerminalSquare className="mr-3 h-6 w-6 text-cyan-400" />{" "}
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-300">
					Log Aktivitas Sistem
				</span>
			</h2>

			<Card className="bg-slate-800/80 border border-slate-700/60 rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-md overflow-hidden">
				<CardContent className="p-0">
					<div className="max-h-[450px] overflow-y-auto rounded-lg custom-scrollbar">
						<Table className="min-w-full">
							<TableHeader className="sticky top-0 bg-slate-900/70 backdrop-blur-xl z-20">
								<TableRow className="border-b border-slate-700/80">
									<TableHead className="w-[220px] px-4 py-3 whitespace-nowrap text-slate-300 font-semibold uppercase tracking-wider text-sm">
										Waktu
									</TableHead>
									<TableHead className="w-[180px] px-4 py-3 text-slate-300 font-semibold uppercase tracking-wider text-sm">
										Tipe Log
									</TableHead>
									<TableHead className="px-4 py-3 text-slate-300 font-semibold uppercase tracking-wider text-sm">
										Deskripsi
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="divide-y divide-slate-700/70">
								{logs.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={3}
											className="text-center h-32 text-slate-500 italic text-lg" /* Enhanced 'no logs' message */
										>
											Tidak ada log aktivitas yang tersedia.
										</TableCell>
									</TableRow>
								) : (
									logs.map((log, index) => (
										<TableRow
											key={index}
											className="hover:bg-slate-700/60 transition-all duration-200 ease-in-out group" /* Enhanced hover and added group for potential group-hover effects */
										>
											<TableCell className="px-4 py-3.5 font-mono text-sm text-slate-400 whitespace-nowrap group-hover:text-sky-300 transition-colors">
												{log.timestamp}
											</TableCell>
											<TableCell className="px-4 py-3.5">
												<Badge className={getBadgeStyles(log.type)}>
													{log.type}
												</Badge>
											</TableCell>
											<TableCell className="px-4 py-3.5 text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
												{log.message}
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</section>
	);
};

export default LogAktivitas;

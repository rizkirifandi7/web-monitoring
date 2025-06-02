import { Satellite } from "lucide-react";
import React from "react";

const HeaderInfo = () => {
	return (
		<header className="mb-12 text-center relative">
			<div className="absolute -inset-4 bg-sky-500/10 rounded-xl blur-2xl opacity-50"></div>
			<h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500 tracking-tight py-2 relative z-10">
				SMART HOME SAFETY
			</h1>
			<p className="text-base text-slate-400 mt-3 relative z-10">
				<Satellite className="inline mr-2 h-4 w-4" />
				Real-time Gas & Flame Monitoring System
			</p>
		</header>
	);
};

export default HeaderInfo;

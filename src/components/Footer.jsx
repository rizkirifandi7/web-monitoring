import { Activity } from "lucide-react";
import React from "react";

const Footer = () => {
	return (
		<footer className="text-center mt-12 py-8 text-sm text-slate-500 border-t border-slate-700/50">
			<p className="flex items-center justify-center">
				<Activity className="h-4 w-4 mr-2 text-cyan-400" />
				&copy; {new Date().getFullYear()} SMART HOME SAFETY PROTOTYPE
			</p>
		</footer>
	);
};

export default Footer;

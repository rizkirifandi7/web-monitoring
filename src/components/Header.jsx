import { Satellite } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase"; // Pastikan path ini benar ke file konfigurasi Firebase Anda
import { toast } from "sonner";

const HeaderInfo = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			toast.success("Logout berhasil!");
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Logout gagal. Silakan coba lagi.");
		}
	};

	const navItems = [
		{ name: "SENSOR", href: "/dashboard" },
		{ name: "KONTROL", href: "/kontrol" },
		{ name: "LOG", href: "/log" },
		{ name: "LOGOUT", onClick: handleLogout }, // Menggunakan onClick untuk logout
	];

	return (
		<div className="flex flex-col items-center justify-center w-full">
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

			<nav className="mb-8 p-4 bg-slate-800/50 rounded-lg shadow-xl backdrop-blur-md w-full">
				<ul className="flex justify-around items-center text-slate-300">
					{navItems.map((item) => (
						<li key={item.name}>
							{item.href ? (
								<Link
									to={item.href}
									className="hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
								>
									{item.name}
								</Link>
							) : (
								<button
									onClick={item.onClick}
									className="hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium bg-transparent border-none cursor-pointer"
								>
									{item.name}
								</button>
							)}
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default HeaderInfo;

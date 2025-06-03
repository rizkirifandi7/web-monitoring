import React from "react";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";

export function LoginForm({ className, ...props }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		if (!email || !password) {
			toast.error("Email dan password tidak boleh kosong.");
			setLoading(false);
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success("Login berhasil!");
			navigate("/");
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Login gagal. Periksa email dan password Anda.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card
			className={cn(
				"bg-slate-800/70 border border-slate-700/50 rounded-xl shadow-2xl shadow-slate-950/60 backdrop-blur-lg hover:border-cyan-500/70 hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out flex flex-col gap-6 p-6",
				className
			)}
			{...props}
		>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<a
							href="#"
							className="flex flex-col items-center gap-2 font-medium text-slate-100 hover:text-cyan-400 transition-colors"
						>
							<div className="flex size-10 items-center justify-center rounded-lg bg-slate-700/50 group-hover:bg-cyan-500/20 transition-colors">
								<Shield className="size-7 text-cyan-400" />
							</div>
						</a>
						<h1 className="text-2xl font-bold text-slate-50 bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">
							Smart Home Safety
						</h1>
						<p className="text-center text-sm text-slate-400">
							Login untuk mengakses dashboard deteksi.
						</p>
					</div>
					<div className="flex flex-col gap-6">
						<div className="grid gap-3">
							<Label htmlFor="email" className="text-slate-300">
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={
									"py-5 bg-slate-700/40 border-slate-600/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
								}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="password" className="text-slate-300">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={
									"py-5 bg-slate-700/40 border-slate-600/80 text-slate-100 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
								}
							/>
						</div>
						<Button
							type="submit"
							className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-slate-50 font-semibold text-base transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
							disabled={loading}
						>
							{loading ? "Loading..." : "Login"}
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
}

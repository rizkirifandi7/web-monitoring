import React from "react";
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase";

import { GalleryVerticalEnd } from "lucide-react";
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
		<Card className={cn("flex flex-col gap-6 p-6", className)} {...props}>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<a
							href="#"
							className="flex flex-col items-center gap-2 font-medium"
						>
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
						</a>
						<h1 className="text-xl font-bold">Smart Home Safety</h1>
						<p className="text-center text-sm">
							Login untuk mengakses dashboard deteksi.
						</p>
					</div>
					<div className="flex flex-col gap-6">
						<div className="grid gap-3">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => setEmail(e.target.value)}
								className={"py-5"}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="********"
								required
								onChange={(e) => setPassword(e.target.value)}
								className={"py-5"}
							/>
						</div>
						<Button type="submit" className="w-full py-5" disabled={loading}>
							{loading ? "Loading..." : "Login"}
						</Button>
					</div>
				</div>
			</form>
		</Card>
	);
}

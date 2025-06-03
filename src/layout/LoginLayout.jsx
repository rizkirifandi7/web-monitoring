import React from "react";
import { LoginForm } from "../components/LoginForm";

const LoginLayout = () => {
	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-4 sm:p-8 font-sans flex justify-center items-center">
			<div className="container mx-auto w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginLayout;

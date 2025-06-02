import React from "react";
import { Toaster } from "sonner";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLayout from "./layout/LoginLayout";
import ProfileLayout from "./layout/ProfileLayout";
import FireDetectionDashboard from "./components/DashboardSmartHome";
import { auth } from "./components/Firebase";

const App = () => {
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<div>
			<Toaster />
			<Routes>
				<Route
					path="/"
					element={user ? <Navigate to="/dashboard" /> : <LoginLayout />}
				/>
				<Route path="/login" element={<LoginLayout />} />
				<Route path="/profile" element={<ProfileLayout />} />
				<Route path="/dashboard" element={<FireDetectionDashboard />} />
			</Routes>
		</div>
	);
};

export default App;


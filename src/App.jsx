import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginLayout from "./layout/LoginLayout";
import ProfileLayout from "./layout/ProfileLayout";
import { auth } from "./components/Firebase";
import LogLayout from "./layout/LogLayout";
import KontrolLayout from "./layout/KontrolLayout";
import { Toaster } from "sonner";
import DashboardLayout from "./layout/SensorLayout";
import { DashboardProvider } from "./lib/useDashboard";
import Loading from "./components/Loading";

const ProtectedRoute = ({ user, children }) => {
	if (!user) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

const App = () => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true); // Tambahkan state loading

	React.useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false); // Set loading ke false setelah status auth selesai dicek
		});
		return () => unsubscribe(); // Cleanup listener saat komponen unmount
	}, []);

	if (loading) {
		return <Loading />; // Tampilkan loading indicator
	}

	return (
		<div>
			<DashboardProvider>
				<Toaster />
				<Routes>
					<Route path="/login" element={<LoginLayout />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute user={user}>
								<ProfileLayout />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/log"
						element={
							<ProtectedRoute user={user}>
								<LogLayout />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/kontrol"
						element={
							<ProtectedRoute user={user}>
								<KontrolLayout />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute user={user}>
								<DashboardLayout />
							</ProtectedRoute>
						}
					/>
					{/* Tambahkan rute default atau redirect jika user sudah login */}
					<Route
						path="/"
						element={
							user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
						}
					/>
				</Routes>
			</DashboardProvider>
		</div>
	);
};

export default App;


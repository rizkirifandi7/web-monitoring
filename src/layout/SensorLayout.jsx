import { useDashboard } from "@/lib/useDashboard";
import SensorMonitoring from "@/components/SensorMonitoring";
import HeaderInfo from "@/components/Header";
import Footer from "@/components/Footer";

const SensorMonitoringPage = () => {
	const { sensorData, isConnected, overallSafetyStatus, DANGER_LEVELS } =
		useDashboard();

	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-4 sm:p-8 font-sans">
			<div className="container mx-auto w-full max-w-xl">
				<HeaderInfo />
				<SensorMonitoring
					sensorData={sensorData}
					isConnected={isConnected}
					overallSafetyStatus={overallSafetyStatus}
					DANGER_LEVELS={DANGER_LEVELS}
				/>
				<Footer />
			</div>
		</div>
	);
};

export default SensorMonitoringPage;

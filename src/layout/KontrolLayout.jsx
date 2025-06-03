import SistemControl from "@/components/SistemControl";
import HeaderInfo from "@/components/Header";
import Footer from "@/components/Footer";
import { useDashboard } from "@/lib/useDashboard";

const SistemControlPage = () => {
	const { controlData, isConnected, toggleMode, setActuator } = useDashboard();

	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-4 sm:p-8 font-sans">
			<div className="container mx-auto w-full max-w-xl">
				<HeaderInfo />
				<SistemControl
					controlData={controlData}
					toggleMode={toggleMode}
					setActuator={setActuator}
					isConnected={isConnected}
				/>
				<Footer />
			</div>
		</div>
	);
};

export default SistemControlPage;

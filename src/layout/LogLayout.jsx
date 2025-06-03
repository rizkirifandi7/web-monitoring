import Footer from "@/components/Footer";
import HeaderInfo from "@/components/Header";
import LogAktivitas from "@/components/LogAktivitas";
import { useDashboard } from "@/lib/useDashboard";

const LogAktivitasPage = () => {
	const { logs } = useDashboard();

	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen p-4 sm:p-8 font-sans">
			<div className="container mx-auto w-full max-w-xl">
				<HeaderInfo />
				<LogAktivitas logs={logs} />
				<Footer />
			</div>
		</div>
	);
};

export default LogAktivitasPage;

import HeaderInfo from "@/components/Header";

const ProfileLayout = () => {
	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
			<div className="container mx-auto w-full max-w-xl">
				<HeaderInfo />
			</div>
		</div>
	);
};

export default ProfileLayout;

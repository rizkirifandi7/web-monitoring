import React from "react";

const Loading = () => {
	return (
		<div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
			<div className="flex justify-center items-center h-dvh text-white">
				<div class="loader"></div>
			</div>
		</div>
	);
};

export default Loading;

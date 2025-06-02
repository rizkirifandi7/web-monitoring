const ProfileLayout = () => {
	return (
		<div className="bg-slate-900 text-slate-300 min-h-screen flex flex-col items-center justify-center font-sans p-4">
			<div className="container mx-auto max-w-xl w-full">
				<header className="mb-8 text-center">
					<h1 className="text-3xl sm:text-4xl font-bold text-cyan-400 tracking-tight">
						Profil Pengguna
					</h1>
					<p className="text-sm text-slate-400 mt-2">
						Informasi detail mengenai pengguna sistem.
					</p>
				</header>

				<main className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
					{/* Tombol Aksi */}
					<section className="mt-10 pt-6 border-t border-slate-700">
						<button className="flex items-center justify-center w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-slate-200 font-bold py-2.5 px-6 rounded-lg transition-all duration-150 text-sm uppercase tracking-wider shadow-md hover:shadow-lg">
							Edit Profil
						</button>
					</section>
				</main>

				<footer className="text-center mt-10 py-6 text-sm text-slate-500 border-t border-slate-700">
					<p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
				</footer>
			</div>
		</div>
	);
};

export default ProfileLayout;

export default function HungerStats() {
	return (
		<section className="bg-gray-200 py-8 px-2 sm:py-12 sm:px-4">
			<div className="max-w-6xl mx-auto text-center">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-10">
					Hunger Stats
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 text-center">
					{/* Stat 1 */}
					<div>
						<h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600">
							319 <span className="font-black">MILLION</span>
						</h3>
						<p className="text-base sm:text-lg text-red-600 font-bold mt-2">
							PEOPLE
						</p>
						<p className="text-xs sm:text-sm text-red-600">
							in acute hunger
						</p>
					</div>

					{/* Stat 2 */}
					<div>
						<h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-600">
							67
						</h3>
						<p className="text-base sm:text-lg text-blue-600 font-bold mt-2">
							COUNTRIES
						</p>
						<p className="text-xs sm:text-sm text-blue-600">
							where these people live
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

import React from "react";
import Image from "next/image";

function Whoweeare() {
	return (
		<div className="bg-[url('/background.webp')] bg-cover bg-center pt-6 pb-6">
			<section className="max-w-7xl mx-20 flex flex-col lg:flex-row items-center gap-y-10 gap-10 lg:gap-x-12 px-4">
				<div className="w-full lg:w-1/2 flex flex-col justify-center">
					<h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
						Who Are We
					</h2>
					<p className="text-base sm:text-lg leading-relaxed text-gray-800">
						<strong className="font-semibold">
							Aid Global Foundation
						</strong>{" "}
						is a not-for-profit organization registered in 2025,
						dedicated to bringing dignity, hope, and sustainable
						change to vulnerable communities across India and
						beyond. We focus on providing practical, compassionate
						solutions to life&apos;s most essential needs —{" "}
						<span className="font-medium text-blue-400">
							Education, Health, Food, and Shelter
						</span>
						.
					</p>
				</div>
				<div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
					<div className="w-full max-w-xs">
						<Image

							src="/whoweare/whoweare.jpg"
							alt="who we are"
							width={240}
							height={240}
							className="w-full h-auto object-contain rounded-lg shadow-lg"
						/>
					</div>
				</div>

				<Image
					src="/who_are_we.webp"
					alt="who we are"
					width={500}
					height={400}
					className=" block sm:block pr-8 w-full max-w-sm h-auto"
				/>
			</section>
		</div>
	);
}

export default Whoweeare;

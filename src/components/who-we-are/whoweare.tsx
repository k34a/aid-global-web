import React from "react";
import Image from "next/image";
function Whoweeare() {
	return (
		<div>
			<section className=" text-base sm:text-lg bg-[url('/background.webp')] bg-cover bg-center h-96 w-full flex justify-between">
				<div className="p-8 sm:p-10 lg:p-16 xl:p-24">
					<h2 className="text-4xl font-bold text-blue-500 mb-6">
						Who Are We
					</h2>
					<p>
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

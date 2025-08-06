import React from "react";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";

function Corevalues() {
	return (
		<div>
			<section
				id="core"
				className="px-6 sm:px-4 py-6 sm:py-12 mx-4 sm:mx-20 gap-8 sm:gap-10 bg-no-repeat bg-cover bg-center rounded-xl"
				style={{
					backgroundImage: `url(${STATIC_IMAGE_HOST}whoweare/background.webp)`,
				}}
			>
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl sm:text-4xl font-bold text-sky-800 mb-4 sm:mb-6">
						Core Values
					</h2>

					<div className="flex flex-col lg:flex-row items-center gap-y-6 sm:gap-y-10 lg:gap-x-12">
						<div className="w-full lg:w-1/2">
							<ul className="space-y-4 sm:space-y-6 text-sm sm:text-lg text-gray-800">
								<li>
									<h3 className="text-base sm:text-lg font-bold text-sky-600">
										GODLIKE
									</h3>
									<p>
										We serve with divine compassion,
										honoring the worth of every person.
									</p>
								</li>
								<li>
									<h3 className="text-base sm:text-lg font-bold text-sky-600">
										CHILDLIKE
									</h3>
									<p>
										We live with wonder, humility, and a
										deep dependence on values greater than
										ourselves.
									</p>
								</li>
								<li>
									<h3 className="text-base sm:text-lg font-bold text-sky-600">
										INTEGRITY
									</h3>
									<p>
										We uphold honesty and accountability in
										all that we do.
									</p>
								</li>
								<li>
									<h3 className="text-base sm:text-lg font-bold text-sky-600">
										RESTORING THE BROKEN
									</h3>
									<p>
										We address the physical, emotional, and
										spiritual needs of those who are
										overlooked or suffering.
									</p>
								</li>
								<li>
									<h3 className="text-base sm:text-lg font-bold text-sky-600">
										INTENTIONAL RELATIONSHIPS
									</h3>
									<p>
										We build authentic, trust-based
										partnerships to amplify our collective
										impact.
									</p>
								</li>
							</ul>
						</div>

						<div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
							<div className="w-56 sm:w-72 md:w-96">
								<Image
									src={`${STATIC_IMAGE_HOST}whoweare/coreval.webp`}
									alt="core values"
									width={400}
									height={400}
									className="w-full h-auto object-contain rounded-lg shadow-lg"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Corevalues;

import React from "react";

function Aboutus() {
	return (
		<section
			id="aboutus"
			className="pl-2 pr-2 mt-8 sm:pl-6 sm:pr-4 sm:mt-16 mx-4 lg:mx-14"
		>
			<h2 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4 sm:mb-6">
				About Us
			</h2>

			<div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 lg:gap-32">
				<p className="text-sm sm:text-base">
					Aid Global Foundation is dedicated to creating meaningful,
					lasting change in communities that need it most. We partner
					directly with local communities to deliver essential support
					across education, nutrition, healthcare, disability
					inclusion, shelter, and women &apos; s empowerment. Driven
					by compassion, integrity, and respect for human dignity, our
					mission is to design sustainable solutions that transform
					lives and build stronger, more resilient communities for the
					future
				</p>
			</div>
			<h2 className="pt-2 text-2xl sm:text-3xl text-blue-800">
				Our Programmes
			</h2>
			<div className="flex flex-col lg:flex-row">
				<ul className="flex flex-col gap-y-3 sm:mt-6 pl-4 sm:pl-6 list-disc text-sm sm:text-base">
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							ShikshaAid
						</h2>{" "}
						<strong>Education for Every Child.</strong>
						<br></br>
						We deliver accessible learning opportunities for
						street-connected, migrant, and underserved children
						through community-based centres that build literacy,
						life skills, and hope for the future.
					</li>
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl ">
							VisionAid
						</h2>
						<strong>Restoring Sight, Renewing Lives.</strong>
						<br></br>
						Bringing vision care to vulnerable populations through
						free eye screenings, prescription glasses, cataract
						surgeries, and outreach programs that ensure no one is
						left in the dark.
					</li>
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							EnableAid
						</h2>{" "}
						<strong>Empowering Every Ability.</strong>
						<br></br>
						Providing free early diagnosis, treatment, and assistive
						devices, along with lifelong inclusion support for
						children and adults with disabilities to help them
						thrive with independence and dignity.
					</li>
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							GharAid
						</h2>
						<strong>Rescue. Rebuild. Restore.</strong>
						<br></br>
						Rescuing and rehabilitating homeless individuals and
						orphaned children with safe shelter, medical care,
						education, emotional healing, and pathways to
						reintegration and dignity.
					</li>
				</ul>
				<ul className="flex flex-col gap-y-3 lg:gap-y-19 mt-4 sm:mt-6 pl-4 sm:pl-6 list-disc text-sm sm:text-base">
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							CureAid
						</h2>
						<strong>Healthcare Where Its Needed Most.</strong>
						<br></br>
						Delivering primary healthcare through mobile clinics,
						health camps, maternal and child care services, TB and
						HIV prevention, and essential treatments in underserved
						and remote communities.
					</li>
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							SakhiAid
						</h2>
						<strong>Empowering Women. Enabling Futures.</strong>
						<br></br>
						Promoting health awareness, menstrual hygiene, skill
						training, economic independence, and leadership
						development for marginalized women and adolescent girls
						to build stronger, more equitable communities.
					</li>
					<li>
						<h2 className="font-bold text-base sm:text-lg md:text-lg lg:text-xl">
							HungerAid
						</h2>
						<strong>Because No One Should Go Hungry.</strong>
						<br></br>
						Combating hunger with dignity by serving hot nutritious
						meals, home-delivered food for the elderly and disabled,
						school feeding programs, and emergency grocery kits for
						families in crisis.
					</li>
				</ul>
			</div>
		</section>
	);
}

export default Aboutus;

"use client";
import React, { useRef, useState } from "react";
import TeamCard from "../../../components/teamcard";
import Image from "next/image";
import Link from "next/link";
import { teamembers } from "../../../config/team";
import { partners } from "../../../config/partners";

function WhoWeAre() {
	return (
		<div>
			<section className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-7 text-base sm:text-lg bg-[url('/background.webp')] bg-cover bg-center h-96 w-full flex justify-between">
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

			<section id="aboutus" className="pl-6 pr-4 mt-16">
				<h2 className="text-4xl font-bold text-blue-800 mb-6">
					About Us
				</h2>
				<div className="flex flex-col lg:flex-row justify-between gap-6">
					<p>
						Our grassroots work is powered by purpose and designed
						for long-term impact. We operate directly within
						communities through a range of focused,
						life-transforming initiatives:
					</p>
					<p>
						We are driven by compassion, accountability, and a deep
						respect for human dignity. Every program, clinic, and
						partnership is a step forward in our mission to create a
						world where aid is delivered with heart and impact is
						made with purpose.
					</p>
				</div>
				<ul className="list-disc mt-6 pl-10 space-y-2">
					<li>
						<strong>ShikshaAid</strong> – Education for
						underprivileged children
					</li>
					<li>
						<strong>EnableAid</strong> – Empowering
						differently-abled individuals
					</li>
					<li>
						<strong>CureAid</strong> – Primary healthcare services
					</li>
					<li>
						<strong>VisionAid</strong> – Eye care and vision
						restoration
					</li>
					<li>
						<strong>GharAid</strong> – Shelter for homeless/orphaned
						people
					</li>
					<li>
						<strong>SakhiAid</strong> – Women&rsquo;s empowerment
						initiatives
					</li>
				</ul>
			</section>

			<section
				id="vision"
				className="flex flex-row flex-wrap   gap-8 px-6 py-12 text-sm md:text-base lg:text-lg xl:text-xl"
			>
				<div className="relative flex-1  bg-[url('/vision.webp')] bg-no-repeat sm:bg-[url('/visionmob.webp')]   h-64 sm:h-80 md:h-96 lg:h-[30rem] bg-cover bg-center rounded-2xl shadow-md">
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-6 text-white">
						<h2 className="text-2xl font-bold mb-2">Vision</h2>
						<p className="font-semibold">
							Aid with Heart. Impact with Purpose.
						</p>
					</div>
				</div>

				<div className="relative bg-[url('/mission.webp')] bg-no-repeat  flex-1 h-64 sm:h-80 md:h-96 lg:h-[30rem] bg-cover bg-center rounded-2xl shadow-md">
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-6 text-white">
						<h2 className="text-2xl font-bold mb-2">Mission</h2>
						<p className="font-semibold">
							We deliver compassionate aid with heart and create
							lasting impact with clear purpose. Our commitment is
							to empower vulnerable communities by fostering hope,
							dignity, and sustainable change worldwide.
						</p>
					</div>
				</div>
			</section>

			<section
				id="core"
				className="px-6 py-12 bg-[url('/background.webp')]  sm:bg-[url('/background.webp')] bg-no-repeat    bg-cover bg-center"
			>
				<h2 className="text-3xl font-bold text-blue-500 mb-6">
					Core Values
				</h2>
				<div className="flex flex-row justify-between">
					<ul className="space-y-6">
						<li>
							<h3 className="text-lg font-bold ">GODLIKE</h3>
							<p>
								We serve with divine compassion, honoring the
								worth of every person.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold ">CHILDLIKE</h3>
							<p>
								We live with wonder, humility, and a deep
								dependence on values greater than ourselves.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold">INTEGRITY</h3>
							<p>
								We uphold honesty and accountability in all that
								we do.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold">
								RESTORING THE BROKEN
							</h3>
							<p>
								We address the physical, emotional, and
								spiritual needs of those who are overlooked or
								suffering.
							</p>
						</li>
						<li>
							<h3 className="text-lg font-bold ">
								INTENTIONAL RELATIONSHIPS
							</h3>
							<p>
								We build authentic, trust-based partnerships to
								amplify our collective impact.
							</p>
						</li>
					</ul>
					<Image
						src="/coreval.webp"
						alt="core values"
						width={500}
						height={400}
						className=" block sm:block pr-8 w-full max-w-sm h-auto"
					/>
				</div>
			</section>

			<section id="team" className="py-12 bg-gray-50">
				<h2 className="text-center text-4xl font-bold text-blue-800 mb-10">
					Our Team
				</h2>
				<ul className="flex flex-wrap justify-center gap-8 px-4">
					{teamembers.map((member, index) => (
						<TeamCard
							key={index}
							name={member.name}
							role={member.role}
							imageSrc={member.imageSrc}
							linkedinUrl={member.linkedinUrl}
						/>
					))}
				</ul>
			</section>

			<section id="partners" className="px-6 py-12">
				<h2 className="text-center text-4xl font-bold text-blue-800 mb-10">
					Our Partners
				</h2>
				<div className="bg-amber-50 p-6 rounded-xl shadow-lg flex flex-wrap justify-center gap-6">
					{partners.map((partner, index) => (
						<div
							key={index}
							className="p-3 bg-white rounded-lg shadow-md hover:shadow-xl"
						>
							<Image
								src={partner.imageSrc}
								alt={partner.name}
								width={100}
								height={100}
								className="object-contain h-24 w-24 sm:h-32 sm:w-32"
							/>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
export default WhoWeAre;

"use client";
import React, { useRef, useState } from "react";
import TeamCard from "../../components/teamcard";
import Image from "next/image";
import Link from "next/link";

const teamembers = [
	{
		name: "Mr. Shivam Pathak",
		role: "Director",
		imageSrc: "/man.png",
		linkedinUrl: "https://www.linkedin.com/in/ShivamPathak",
	},
	{
		name: "Mrs. Pooja Pathakk",
		role: "Director",
		imageSrc: "/woman.png",
		linkedinUrl: "https://www.linkedin.com/in/PoojaPathak",
	},
	{
		name: "Mr. Nilesh Pal",
		role: "Director",
		imageSrc: "/man.png",
		linkedinUrl: "https://www.linkedin.com/in/NileshPathak",
	},
	{
		name: "Mr. Zeel Mangukiya",
		role: "COO",
		imageSrc: "/man.png",
		linkedinUrl: "https://www.linkedin.com/in/ZeelMangukiya",
	},
];

const partners = [
	{ name: "Adobe", imageSrc: "/Adobe.webp" },
	{ name: "Goldman-sachs", imageSrc: "/Goldman-Sachs.webp" },
	{
		name: "Government-of-Madhya-Pradesh",
		imageSrc: "/Government-of-Madhya-Pradesh.webp",
	},
	{ name: "MalalaFund", imageSrc: "/MalalaFund.webp" },
	{ name: "NSIF-Nasscom-Awards", imageSrc: "/NSIF-Nasscom-Awards.webp" },
	{ name: "Skoll-Foundation", imageSrc: "/Skoll-Foundation.webp" },
	{ name: "Stir-Education", imageSrc: "/Stir-Education.webp" },
	{
		name: "UBS-Opitmus-Foundation",
		imageSrc: "/UBS-Opitmus-Foundation.webp",
	},
	{
		name: "Ray-and-Tye-Noorda-Foundation",
		imageSrc: "/Ray-and-Tye-Noorda-Foundation.webp",
	},
	{
		name: "MIT_Solves_Learning_for_Girls_Women_Challenge_2020",
		imageSrc: "/MIT_Solves_Learning_for_Girls_Women_Challenge_2020.webp",
	},
	{ name: "milton", imageSrc: "/milton.webp" },
	{ name: "Marico", imageSrc: "/Marico.webp" },
	{
		name: "LOreal-Paris-Women-of-Worth",
		imageSrc: "/LOreal-Paris-Women-of-Worth.webp",
	},
	{ name: "LGT", imageSrc: "/LGT.webp" },
	{ name: "Jester-Foundation", imageSrc: "/ester-Foundation.webp" },
	{ name: "jasmine-1", imageSrc: "/jasmine-1.webp" },
	{ name: "ITC-BLUE", imageSrc: "/ITC-BLUE.webp" },
	{ name: "iPartner-Indian", imageSrc: "/iPartner-India.webp" },
	{ name: "icon-330", imageSrc: "/icon-330.webp" },
	{
		name: "HundrED_Sticker-pink-1",
		imageSrc: "/HundrED_Sticker-pink-1.webp",
	},
	{
		name: "Government-of-Uttar-Pradesh",
		imageSrc: "/Government-of-Uttar-Pradesh.webp",
	},
];
function WhoAreWe() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	const showDropdown = () => {
		if (timeout.current) clearTimeout(timeout.current);
		setIsDropdownOpen(true);
	};

	const hideDropdown = () => {
		timeout.current = setTimeout(() => setIsDropdownOpen(false), 300);
	};

	return (
		<div>
			{/* Navbar */}
			<nav className="bg-white shadow-md fixed top-0 left-0 right-0 font-sans z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
					<div className="flex items-center space-x-4">
						<Image
							src="/globe.webp"
							alt="logo"
							width={50}
							height={50}
						/>
						<h1 className="text-xl font-bold text-blue-800">
							Aid Global
						</h1>
					</div>

					<ul className="flex space-x-8 items-center text-gray-700 relative">
						<li
							className="relative group cursor-pointer"
							onMouseEnter={showDropdown}
							onMouseLeave={hideDropdown}
						>
							<span className="hover:text-blue-600 transition">
								Who we are
							</span>
							{isDropdownOpen && (
								<ul
									className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg z-10 rounded-lg py-2"
									onMouseEnter={showDropdown}
									onMouseLeave={hideDropdown}
								>
									{[
										{ name: "About Us", href: "#aboutus" },
										{
											name: "Vision, Mission",
											href: "#vision",
										},
										{ name: "Our Team", href: "#team" },
										{ name: "Partners", href: "#partners" },
									].map((item) => (
										<li key={item.name}>
											<Link
												href={item.href}
												className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition"
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>

						<li>
							<Link
								href="#core"
								className="hover:text-blue-600 transition"
							>
								Core values
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="hover:text-blue-600 transition"
							>
								Back to Top
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			<section className="mt-28 text-base sm:text-lg bg-[url('/background.webp')] bg-cover bg-center h-96 w-full flex justify-between">
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
					className="hidden sm:block pr-8"
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
				className="flex flex-col md:flex-row gap-8 px-6 py-12"
			>
				<div
					className="relative flex-1 h-96 bg-cover bg-center rounded-2xl shadow-md"
					style={{ backgroundImage: "url('/vision.webp')" }}
				>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
					<div className="absolute bottom-0 p-6 text-white">
						<h2 className="text-2xl font-bold mb-2">Vision</h2>
						<p className="font-semibold">
							Aid with Heart. Impact with Purpose.
						</p>
					</div>
				</div>
				<div
					className="relative flex-1 h-96 bg-cover bg-center rounded-2xl shadow-md"
					style={{ backgroundImage: "url('/mission.webp')" }}
				>
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

			<section id="core" className="px-6 py-12">
				<h2 className="text-3xl font-bold text-blue-500 mb-6">
					Core Values
				</h2>
				<ul className="space-y-6">
					<li>
						<h3 className="text-lg font-bold text-green-400">
							GODLIKE
						</h3>
						<p>
							We serve with divine compassion, honoring the worth
							of every person.
						</p>
					</li>
					<li>
						<h3 className="text-lg font-bold text-green-400">
							CHILDLIKE
						</h3>
						<p>
							We live with wonder, humility, and a deep dependence
							on values greater than ourselves.
						</p>
					</li>
					<li>
						<h3 className="text-lg font-bold text-green-400">
							INTEGRITY
						</h3>
						<p>
							We uphold honesty and accountability in all that we
							do.
						</p>
					</li>
					<li>
						<h3 className="text-lg font-bold text-green-400">
							RESTORING THE BROKEN
						</h3>
						<p>
							We address the physical, emotional, and spiritual
							needs of those who are overlooked or suffering.
						</p>
					</li>
					<li>
						<h3 className="text-lg font-bold text-green-400">
							INTENTIONAL RELATIONSHIPS
						</h3>
						<p>
							We build authentic, trust-based partnerships to
							amplify our collective impact.
						</p>
					</li>
				</ul>
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
export default WhoAreWe;

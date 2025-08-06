import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";
import Link from "next/link";

const AboutContent = () => (
	<>
		<h2 className="relative inline-block text-xl md:text-2xl font-bold text-[#1A1A1D] mb-3">
			About CureAid
			<span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#118B50] rounded-tr-full rounded-bl-full"></span>
		</h2>
		<p className="text-[#333] text-sm md:text-lg leading-relaxed">
			<span className="font-bold text-teal-900">CureAid</span> is the
			flagship health initiative of Aid Global Foundation, delivering{" "}
			<span className="text-[#3B1C32] font-medium">
				equitable, impactful healthcare
			</span>{" "}
			across India&apos;s most underserved communities. From remote
			villages to densely populated urban slums, CureAid bridges the
			healthcare gap through{" "}
			<span className="italic text-[#5DB996]">early intervention</span>,{" "}
			<span className="italic text-[#5DB996]">preventive care</span>, and{" "}
			<span className="italic text-[#5DB996]">
				grassroots empowerment
			</span>{" "}
			- with a strong focus on{" "}
			<span className="text-[#E3B505]">
				women, children, and adolescents
			</span>
			.
		</p>
	</>
);

const HeroSection = () => {
	return (
		<>
			<section className="relative w-full overflow-visible bg-[radial-gradient(120%_100%_at_20%_20%,_#E3F0AF,_#F0F9FF,_#C0EDD9)] pt-10 pb-10 md:pb-48 px-6 sm:px-10 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
				<div className="z-10 flex-1 text-center md:text-left">
					<p className="text-[#118B50] text-lg font-semibold italic mb-2">
						Make Impact
					</p>
					<h1 className="text-4xl font-extrabold text-[#1A1A1D] leading-tight mb-3">
						<span className="relative inline-block">
							CureAid
							<span className="absolute bottom-0 left-0 w-[80%] h-[4px] bg-[#E3B505] rounded-tr-xl rounded-bl-xl"></span>
						</span>
						<br />
						<span className="text-[#3B1C32] text-3xl font-semibold">
							<span className="text-[#118B50] font-bold">
								Transforming
							</span>{" "}
							Health.{" "}
							<span className="text-[#E3B505] font-bold">
								Empowering
							</span>{" "}
							Lives
						</span>
					</h1>
					<p className="inline-block px-4 py-1 text-black font-semibold text-base mb-5 rounded-md bg-gray-300/30">
						An initiative by Aid Global Foundation
					</p>
					<div className="flex justify-center md:justify-start">
						<Link
							href="/donate?program=cure-aid"
							className="bg-[#5DB996] hover:bg-[#118B50] text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-300"
						>
							Contribute now
						</Link>
					</div>
				</div>
				<div className="z-10 flex-1 flex justify-center items-center relative w-full sm:w-[500px] h-[300px] sm:h-[400px] min-h-[300px]">
					<div className="absolute top-[6px] left-[6px] w-full h-full rounded-[2rem] bg-[#E3B505] shadow-md z-0" />
					<div className="absolute -top-[6px] -left-[6px] w-full h-full rounded-[2rem] bg-[#5DB996] shadow-md z-0" />
					<div className="relative w-full h-[300px] sm:w-full sm:h-full rounded-[2rem] overflow-hidden bg-white/30 backdrop-blur-lg shadow-xl z-10 group">
						<Image
							src={`${STATIC_IMAGE_HOST}cure-aid/women-health.webp`}
							alt="CureAid On Ground"
							fill
							sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw"
							quality={100}
							className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-in-out"
							priority
						/>
					</div>
				</div>
				<div className="hidden md:block absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg z-20">
					<AboutContent />
				</div>
			</section>
			<section className="block md:hidden w-full px-6 py-3 bg-white/40 backdrop-blur-sm">
				<div className="max-w-3xl mx-auto text-center">
					<AboutContent />
				</div>
			</section>
		</>
	);
};

export default HeroSection;

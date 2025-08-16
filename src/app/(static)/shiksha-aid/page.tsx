import CalltoActionSection from "@/components/aids/shiksha-aid/calltoactionsection";
import Challengessection from "@/components/aids/shiksha-aid/challengessection";
import Donationsection from "@/components/aids/shiksha-aid/donationplans";
import Introsection from "@/components/aids/shiksha-aid/introsection";
import Pillarssection from "@/components/aids/shiksha-aid/pillarsofprogram";
import Campaignsection from "@/components/aids/shiksha-aid/recyclecampaign";
import HeroImage from "@/components/aids/shiksha-aid/hero-image";
import Visionsection from "@/components/aids/shiksha-aid/visionsection";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ShikshaAid",
};

export default function ShikshaAid() {
	return (
		<main className="bg-[#fefefe] text-[#1a1a1d]">
			<HeroImage />
			<Introsection />
			<Pillarssection />
			<Donationsection />
			<Challengessection />
			<Campaignsection />
			<Visionsection />
			<CalltoActionSection />
		</main>
	);
}

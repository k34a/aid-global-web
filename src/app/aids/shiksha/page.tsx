import CalltoActionSection from "@/components/aids/shiksha-aid/calltoactionsection";
import Challengessection from "@/components/aids/shiksha-aid/challengessection";
import Donationsection from "@/components/aids/shiksha-aid/donationplans";
import Introsection from "@/components/aids/shiksha-aid/introsection";
import Pillarssection from "@/components/aids/shiksha-aid/pillars_of_program";
import Campaignsection from "@/components/aids/shiksha-aid/recyclecampaign";
import ShikshaAidPage from "@/components/aids/shiksha-aid/shikapage";
import Visionsection from "@/components/aids/shiksha-aid/visionsection";
export default function ShikshaAid() {
	return (
		<main className="bg-[#fefefe] text-[#1a1a1d]">
			<ShikshaAidPage />
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

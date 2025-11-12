import HeroSection from "@/components/partners/hero-section";
import FlagshipPrograms from "@/components/partners/flagship-programs";
import EngagementOpportunities from "@/components/partners/engagement-opportunities";
import ImpactSection from "@/components/partners/impact-section";
import WhyChooseUs from "@/components/partners/why-choose-us";
import Partners from "@/components/partners/partners";
import { FormFillingService } from "@k34a/forms";
import { supabaseAdmin } from "@/lib/db/supabase";
import { notFound } from "next/navigation";
import { adminPanelLink, ORG_ID } from "@/config/config";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
	let schema;
	const formType = "csr_partnership_inquiry";
	try {
		schema = await new FormFillingService(
			adminPanelLink,
			ORG_ID,
			supabaseAdmin,
		).getFormSchema(formType);
	} catch (err) {
		console.error(err);
		notFound();
	}
	return (
		<>
			<main>
				<HeroSection />
				<FlagshipPrograms />
				<EngagementOpportunities />
				<ImpactSection />
				<WhyChooseUs />
				<Partners schema={schema} formType={formType} />
			</main>
		</>
	);
}

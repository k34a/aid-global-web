import React from "react";
import Head from "@/components/recurring-donations/faq/head";
import { questionqa100 } from "@/config/faqquestions";
import Faq from "@/components/recurring-donations/faq/faq";
function Hundredrupeefaq() {
	return (
		<div className="bg-amber-50">
			<Head />
			<Faq
				subtitle="Learn more about the 100 Rupee Project"
				description="100RupeeProject is a platform built to turn small daily contributions into meaningful impact. We will launch as soon as we reach 1 million registrations. Until then, these FAQs will help you understand how the platform will work once it goes live."
				faqTitle="FAQ The 100 ruppes Club"
				faqItems={questionqa100}
				contactUrl="https://www.aidglobal.ngo/100rupee"
				showContactCard
			/>
		</div>
	);
}

export default Hundredrupeefaq;

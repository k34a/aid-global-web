import React from "react";
import Head from "@/components/recurring-donations/faq/head";
import Faq from "@/components/recurring-donations/faq/faq";
import { questionqa } from "@/config/faqquestions.tsx"; // now faqquestions.tsx, but import stays the same

function Onerupeefaq() {
	return (
		<div className="bg-amber-50">
			<Head />
			<Faq
				subtitle="Learn more about the 1 Rupee Project"
				description="1RupeeProject is a platform built to turn small daily contributions into meaningful impact. We will launch as soon as we reach 1 million registrations. Until then, these FAQs will help you understand how the platform will work once it goes live."
				faqTitle="1 Warrior FAQ"
				faqItems={questionqa}
				contactUrl="https://www.aidglobal.ngo/1rupee"
			/>
		</div>
	);
}

export default Onerupeefaq;

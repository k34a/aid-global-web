import React from "react";
import Faq from "@/components/recurring-donations/faq/faq";
import { questionqa } from "@/config/faqquestions.tsx";

function Onerupeefaq() {
	return (
		<div className="bg-amber-50">
			<Faq faqItems={questionqa} />
		</div>
	);
}

export default Onerupeefaq;

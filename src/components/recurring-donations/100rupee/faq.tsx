import React from "react";
import { questionqa100 } from "@/config/faqquestions.tsx";
import Faq from "@/components/recurring-donations/faq/faq";
function Hundredrupeefaq() {
	return (
		<div className="bg-amber-50">
			<Faq faqItems={questionqa100} showContactCard />
		</div>
	);
}

export default Hundredrupeefaq;

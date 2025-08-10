import React from "react";
import Head from "@/components/recurring-donations/faq/head";
import Questions from "@/components/recurring-donations/faq/questions";
import Question100 from "@/components/recurring-donations/faq/coins";

function Onerupeefaq() {
	return (
		<div className="bg-amber-50">
			<Head />
			<Questions />
			<Question100 />
		</div>
	);
}

export default Onerupeefaq;

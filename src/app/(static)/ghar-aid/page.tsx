import React from "react";
import Gharintro from "@/components/aids/gharaid/gharintro";
import Rescueinfo from "@/components/aids/gharaid/rescueinfo";
import Bhiwandi from "@/components/aids/gharaid/bhiwandi";
import Medical from "@/components/aids/gharaid/medical";
import Childsupport from "@/components/aids/gharaid/childsupport";
import Live from "@/components/aids/gharaid/live";
import Yourhelp from "@/components/aids/gharaid/yourhelp";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Ghar Aid",
};

function GharId() {
	return (
		<div>
			<Gharintro />
			<Rescueinfo />
			<Bhiwandi />
			<Medical />
			<Childsupport />
			<Live />
			<Yourhelp />
		</div>
	);
}

export default GharId;

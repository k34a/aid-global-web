import React from "react";
import Whoweeare from "@/components/who-we-are/whoweare";
import Aboutus from "@/components/who-we-are/aboutus";
import Visionmission from "@/components/who-we-are/visionmission";
import Corevalues from "@/components/who-we-are/corevalues";
import Seniormanagement from "@/components/who-we-are/seniormanagement";
import Parteners from "@/components/who-we-are/parteners";
import LegalDocuments from "@/components/legal/grid";

function WhoWeAre() {
	return (
		<div>
			<Whoweeare />
			<Aboutus />
			<Visionmission />
			<Corevalues />
			<Seniormanagement />
			<Parteners />
			<LegalDocuments />
		</div>
	);
}
export default WhoWeAre;

"use client";
import React, { useRef, useState } from "react";
import Whoweeare from "@/components/who-we-are/whoweare";
import Aboutus from "@/components/who-we-are/aboutus";
import Visionmission from "@/components/who-we-are/visionmission";
import Corevalues from "@/components/who-we-are/corevalues";
import Seniormanagement from "@/components/who-we-are/seniormanagement";
import Parteners from "@/components/who-we-are/parteners";
function WhoWeAre() {
	return (
		<div>
			<Whoweeare />
			<Aboutus />
			<Visionmission />
			<Corevalues />
			<Seniormanagement />
			<Parteners />
		</div>
	);
}
export default WhoWeAre;

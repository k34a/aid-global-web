"use client";
import React, { useState, useEffect } from "react";
import TeamCard from "../teamcard";
import TeamCardDesc from "../teamcarddesc";
import { teamembers } from "@/config/team";
import { teamembersdata } from "@/config/teamdesc";

function Seniormanagement() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	function handleCardClick(index: number) {
		setSelectedIndex(index === selectedIndex ? null : index); // toggle on click
	}

	function handleBackClick() {
		setSelectedIndex(null);
	}

	// Prevent scroll when modal is open
	useEffect(() => {
		if (selectedIndex !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [selectedIndex]);

	return (
		<div>
			<section id="team" className="py-12 bg-gray-50">
				<h2 className="text-center text-4xl font-bold text-blue-800 mb-10">
					Senior Management
				</h2>
				<ul className="flex flex-wrap justify-center gap-8 px-4">
					{teamembers.map((member, index) => (
						<div
							key={index}
							className="relative w-[90%] max-w-xs sm:w-60"
						>
							<div
								onClick={() => handleCardClick(index)}
								className="cursor-pointer z-10 relative"
							>
								<TeamCard
									name={member.name}
									role={member.role}
									imageSrc={member.imageSrc}
									linkedinUrl={member.linkedinUrl}
								/>
							</div>
						</div>
					))}
				</ul>
			</section>

			{selectedIndex !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
					<div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative animate-zoomIn border border-gray-300">
						<button
							onClick={handleBackClick}
							className="absolute top-3 right-3 text-white bg-blue-600 px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-700 transition"
						>
							← Back
						</button>

						<TeamCardDesc
							name={teamembersdata[selectedIndex].name}
							role={teamembersdata[selectedIndex].role}
							desc={teamembersdata[selectedIndex].desc}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Seniormanagement;

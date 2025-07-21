"use client";
import React, { useState, useEffect } from "react";
import TeamCard from "@/components/who-we-are/teamcard";
import TeamCardDesc from "@/components/who-we-are/teamcarddesc";
import { teamembers } from "@/config/team";
import { teamembersdata } from "@/config/teamdesc";

function Seniormanagement() {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	function handleCardClick(index: number) {
		setSelectedIndex(index === selectedIndex ? null : index);
	}

	function handleBackClick() {
		setSelectedIndex(null);
	}

	useEffect(() => {
		document.body.style.overflow =
			selectedIndex !== null ? "hidden" : "auto";
	}, [selectedIndex]);

	return (
		<div>
			<section id="team" className="py-6 sm:py-12 bg-gray-50">
				<h2 className="text-center text-3xl sm:text-4xl font-bold text-sky-800 mb-6 sm:mb-10">
					Senior Management
				</h2>
				<ul className="flex flex-wrap justify-center gap-6 sm:gap-8 px-2 sm:px-4">
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
					<div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto relative animate-zoomIn border border-gray-300">
						<button
							onClick={handleBackClick}
							className="absolute top-3 right-3 text-white bg-sky-600 px-3 sm:px-4 py-1 rounded-md text-sm font-medium hover:bg-sky-700 transition"
						>
							&larr; Back
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

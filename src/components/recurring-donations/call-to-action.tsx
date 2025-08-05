"use client";

import React from "react";
import { DonationDetails } from "@/config/donation";

const CallToAction = () => {
	return (
		<div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#2563eb] via-[#4ECDC4] to-blue-400 text-white rounded-xl p-6 lg:p-10 gap-6 lg:gap-10 max-w-6xl mx-auto my-10 md:my-16 lg:my-24">
			{/* Left Section */}
			<div className="flex-1">
				<h2 className="text-2xl md:text-3xl font-extrabold mb-4">
					Who Can Be a &#8377;1 Warrior?
				</h2>
				<p className="text-sm md:text-base mb-2 font-semibold">
					Everyone.
				</p>
				<p className="text-sm md:text-base font-bold">
					From students to senior citizens, homemakers to
					professionals
					<br />
					if you can spare &#8377;1 a day, you can be part of this
					mission.
					<br />
					<span className="font-medium text-white/90">
						Small pocket. Big purpose.
					</span>
				</p>
			</div>

			{/* Right Section */}
			<div className="flex-1 bg-[#FDCB2E] text-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-md">
				<h3 className="text-xl font-extrabold text-center mb-3 text-white">
					Share the Movement
				</h3>
				<p className="text-sm md:text-base text-center text-[#A56700] font-semibold mb-4">
					Multiply your impact by inspiring others.
					<br />
					Tell your friends, family, and colleagues to join this
					powerful mission.
					<br />
					Together, we create ripples of hope and change.
				</p>
				<p className="text-sm md:text-base font-semibold text-gray-700 text-center">
					Contribute &#8377;1/day (&#8377;30/month)
					<br />
					<span className="text-sm font-medium">
						UPI ID:{" "}
						<span className="italic">{DonationDetails.upiID}</span>
					</span>
					<br />
					Be a &#8377;1 Warrior and help someone every single day.
				</p>
			</div>
		</div>
	);
};

export default CallToAction;

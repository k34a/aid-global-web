"use client";

import { Users, CalendarDays, Link2, CheckCircle, Target } from "lucide-react";

import Facebook from "@/components/icons/facebook";
import Twitter from "@/components/icons/twitter";
import Whatsapp from "@/components/icons/whatsapp";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/lib/client-utils/copytoclipboard";
import { getCampaignMilestones, Milestone } from "@/data/campaignmilestones";
import { RingProgress, Text, Center } from "@mantine/core";

interface CampaignSidebarProps {
	backers: number;
	goal: number;
	currentAmount: number;
}

export default function CampaignSidebar({
	backers,
	goal,
	currentAmount,
}: CampaignSidebarProps) {
	// Get milestones from external data file
	const milestones = getCampaignMilestones(goal);

	const isMilestoneAchieved = (milestone: Milestone) => {
		return milestone.condition({ backers, currentAmount, goal });
	};

	const achievedCount = milestones.filter(isMilestoneAchieved).length;
	const progressPercentage = (achievedCount / milestones.length) * 100;

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-xl shadow-lg p-6">
				<h3 className="text-lg font-bold text-gray-800 mb-4">
					Aid Campaign Progress
				</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Users className="text-sky-600 h-5 w-5" />
							<span className="text-gray-700">Donors</span>
						</div>
						<span className="font-bold text-gray-800">
							{backers}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<CalendarDays className="text-sky-600 h-5 w-5" />
							<span className="text-gray-700">Days Left</span>
						</div>
						<span className="font-bold text-gray-800">30</span>
					</div>
					{goal && (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Target className="text-sky-600 h-5 w-5" />
								<span className="text-gray-700">
									Funds Raised
								</span>
							</div>
							<span className="font-bold text-gray-800">
								&#8377;{currentAmount} / &#8377;{goal}
							</span>
						</div>
					)}
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-lg p-6">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold text-black">
						Impact Milestones
					</h3>
					<div className="flex flex-col items-center">
						<RingProgress
							size={60}
							thickness={8}
							label={
								<Center>
									<Text size="xs">
										{achievedCount}/{milestones.length}
									</Text>
								</Center>
							}
							sections={[
								{ value: progressPercentage, color: "blue" },
							]}
						/>
						<span className="text-xs text-gray-500 ">Achieved</span>
					</div>
				</div>

				<ul className="space-y-3">
					{milestones.map((milestone) => {
						const isAchieved = isMilestoneAchieved(milestone);
						return (
							<li
								key={milestone.id}
								className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
									isAchieved
										? "bg-sky-50 border border-sky-200"
										: "bg-gray-50 border border-gray-200"
								}`}
							>
								<div
									className={`flex-shrink-0 ${
										isAchieved
											? "text-sky-500"
											: "text-gray-400"
									}`}
								>
									{milestone.icon}
								</div>
								<div className="flex-1">
									<div
										className={`font-medium text-sm ${isAchieved ? "text-sky-600" : "text-gray-800"}
										}`}
									>
										{milestone.title}
									</div>
									<div
										className={`text-xs ${
											isAchieved
												? "text-sky-600"
												: "text-gray-500"
										}`}
									>
										{milestone.description}
									</div>
								</div>
								{isAchieved && (
									<CheckCircle className="text-sky-500 w-4 h-4 flex-shrink-0" />
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

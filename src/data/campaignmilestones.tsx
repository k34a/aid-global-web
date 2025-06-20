import React from "react";
import { CheckCircle, Target } from "lucide-react";

export interface Milestone {
	id: string;
	title: string;
	description: string;
	condition: (props: {
		backers: number;
		currentAmount?: number;
		goal?: number;
	}) => boolean;
	icon: React.ReactNode;
}

export const getCampaignMilestones = (goal: number = 10000): Milestone[] => [
	{
		id: "launched",
		title: "Campaign Launched",
		description: "Humanitarian aid campaign is now live",
		condition: () => true,
		icon: <CheckCircle className="w-4 h-4" />,
	},
	{
		id: "emergency_response",
		title: "Emergency Response Fund",
		description: `Raised ₹${goal ? (goal * 0.25).toLocaleString() : "2,500"} for immediate aid`,
		condition: ({ currentAmount, goal }) =>
			goal && currentAmount ? currentAmount / goal >= 0.25 : false,
		icon: <Target className="w-4 h-4" />,
	},
	{
		id: "sustained_aid",
		title: "Sustained Aid Program",
		description: `Reached 50% funding for long-term relief efforts`,
		condition: ({ currentAmount, goal }) =>
			goal && currentAmount ? currentAmount / goal >= 0.5 : false,
		icon: <Target className="w-4 h-4" />,
	},
	{
		id: "global_impact",
		title: "Global Impact Achieved",
		description: `Full funding secured for comprehensive aid program`,
		condition: ({ currentAmount, goal }) =>
			goal && currentAmount ? currentAmount >= goal : false,
		icon: <CheckCircle className="w-4 h-4" />,
	},
];

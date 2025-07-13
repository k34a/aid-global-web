import { STATIC_IMAGE_HOST } from "@/config/config";

export const emergencies = [
	{
		id: 1,
		image: `${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-1.webp`,
		title: "Urgent Help Needed for a Child with Heart Disease",
		author: "Krishna Prasad",
		raised: 22000,
		required: 3000,
		backers: 114,
		taxBenefit: true,
	},
	{
		id: 2,
		image: `${STATIC_IMAGE_HOST}home-page/emergencies/Heart-Disease-2.webp`,
		title: "Urgent Help Needed for a Child with Heart Disease",
		author: "Anjali Verma",
		raised: 5000,
		required: 5000,
		backers: 220,
		taxBenefit: true,
	},
	{
		id: 3,
		image: `${STATIC_IMAGE_HOST}home-page//emergencies/homeless.webp`,
		title: "Help This Family Recover from a Fire Disaster",
		author: "Rohit Sharma",
		raised: 3000,
		required: 5000,
		backers: 150,
		taxBenefit: true,
	},
];

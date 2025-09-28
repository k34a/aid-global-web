import type { NGODetails } from "./types";

export const APP_ENV = process.env.NODE_ENV;
export const STATIC_IMAGE_HOST = "https://website-content.aidglobal.ngo/";
export const ngoDetails: NGODetails = {
	name: "Aid Global Foundation",
	tagline: "Aid with heart. Impact with purpose",
	description:
		"Aid Global Foundation is dedicated to creating sustainable change in communities worldwide through education, healthcare, and humanitarian support.",
	keywords: [
		"NGO",
		"non-profit",
		"charity",
		"humanitarian",
		"aid",
		"global foundation",
		"donations",
		"volunteer",
	],
	registrationNumber: "E-0014172(THN)",
	logo: `${STATIC_IMAGE_HOST}logo1.png`,
	contact: {
		addresses: [
			{
				type: "registration",
				label: "Registration Address",
				description: "For Official / Legal Purposes",
				address:
					"H.No. 4453, Sathe Nagar, near Manoj Kirana Store, Narpoli, Bhiwandi, Thane, Maharashtra - 421305",
			},
			{
				type: "communication",
				label: "Communication Address",
				description:
					"For Day-to-Day Correspondence, Donations, & Volunteers",
				address:
					"H.No. 1384, Gala No. 52, Ground Floor, Shubh Shanti Complex, Anjurphata, Bhiwandi, Maharashtra - 421305",
			},
		],
		email: "info@aidglobal.ngo",
		phone: "+91-93734-69754",
		nationalHelpline: "+91-22-6971-9935",
		whatsapp: "+912269719935",
		website: "https://www.aidglobal.ngo",
		workingHours: {
			days: "Monday - Saturday",
			hours: "10:00 AM - 6:00 PM",
		},
	},
	twitterHandle: "@aidglobal",
	twitterCardType: "summary_large_image",
};

export const DEFAULT_CAMPAIGN = "935203bf-247a-4939-b652-c0a95277fa41";

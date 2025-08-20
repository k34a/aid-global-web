import type { NGODetails } from "@/config/types";

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
		address:
			"H.no. 4453, Sathe Nagar near Manoj Kirana Store, Narpoli, Bhiwandi, Thane, Maharashtra-421305",
		email: "info@aidglobal.ngo",
		phone: "+91 96077-53148",
		website: "https://www.aidglobal.ngo",
	},
	twitterHandle: "@aidglobal",
	twitterCardType: "summary_large_image",
};

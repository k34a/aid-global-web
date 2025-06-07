import type { NGODetails } from "@/config/types";

export const APP_ENV = process.env.NODE_ENV;

export const ngoDetails: NGODetails = {
	name: "Aid Global Foundation",
	tagline: "Empowering Communities, Transforming Lives",
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
	logo: "/logo.png",

	contact: {
		address:
			"123 Main Street, Suite 456, New York, NY 10001, United States",
		email: "info@aidglobalfoundation.org",
		phone: "+1 (555) 123-4567",
		website: "https://aid-global-web.vercel.app",
	},
	twitterHandle: "@aidglobal",
	twitterCardType: "summary_large_image",
};

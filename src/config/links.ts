import type { Links, NavigationLink } from "@/config/types";

export const programLinks: NavigationLink[] = [
	{ name: "Cure Aid", href: "/cure-aid" },
	{ name: "Enable Aid", href: "/enable-aid" },
	{ name: "Ghar Aid", href: "/ghar-aid" },
	{ name: "Hunger Aid", href: "/hunger-aid" },
	{ name: "Sakhi Aid", href: "/sakhi-aid" },
	{ name: "Shiksha Aid", href: "/shiksha-aid" },
	{ name: "Vision Aid", href: "/vision-aid" },
];

export const links: Links = {
	primaryLinks: [
		{ name: "Home", href: "/" },

		{
			name: "Who We Are",
			href: "/who-we-are",
			sublinks: [
				{ name: "About Us", href: "/who-we-are#about" },
				{ name: "Vision & Mission", href: "/who-we-are#vision" },
				{ name: "Core", href: "/who-we-are#core" },
				{ name: "Our Team", href: "/who-we-are#team" },
				{ name: "Partners", href: "/who-we-are#partners" },
			],
		},
		{ name: "Programs", sublinks: programLinks },
		{
			name: "Get Involved",
			sublinks: [
				{ name: "Volunteer", href: "/volunteer" },
				{ name: "Careers", href: "/careers" },
				{
					name: "Corporate Partnerships",
					href: "/corporate-partnerships",
				},
				{
					name: "Donate Rs.1/day",
					href: "/1rupee",
				},
				{
					name: "Donate Rs.100/month",
					href: "/100rupee",
				},
			],
		},
		{ name: "Contact", href: "/contact" },
	],

	donateLink: {
		name: "Donate",
		href: "/donate",
	},

	secondaryLinks: [
		{ name: "Partners", href: "/partners" },
		{ name: "Volunteer", href: "/volunteer" },
		{ name: "Careers", href: "/careers" },
		{ name: "Corporate Partnerships", href: "/corporate-partnerships" },
	],

	tertiaryLinks: [
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms & Conditions", href: "/terms" },
		{ name: "Refund Policy", href: "/refund-policy" },
	],
	socialLinks: [
		{
			name: "Facebook",
			href: "https://facebook.com/aidglobal",
			icon: "facebook",
		},
		{
			name: "Twitter",
			href: "https://twitter.com/aidglobal",
			icon: "twitter",
		},
		{
			name: "Instagram",
			href: "https://instagram.com/aidglobal",
			icon: "instagram",
		},
		{
			name: "LinkedIn",
			href: "https://linkedin.com/company/aidglobal",
			icon: "linkedin",
		},
		{
			name: "YouTube",
			href: "https://youtube.com/@aidglobal",
			icon: "youtube",
		},
	],
};

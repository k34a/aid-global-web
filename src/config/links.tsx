import type { Links, NavigationLink } from "@/config/types";

export const programLinks: NavigationLink[] = [
	{ name: "ShikshaAid", href: "/shiksha-aid" },
	{ name: "HungerAid", href: "/hunger-aid" },
	{ name: "EnableAid", href: "/enable-aid" },
	{ name: "CureAid", href: "/cure-aid" },
	{ name: "VisionAid", href: "/vision-aid" },
	{ name: "GharAid", href: "/ghar-aid" },
	{ name: "SakhiAid", href: "/sakhi-aid" },
];

export const links: Links = {
	primaryLinks: [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Who We Are",
			href: "/who-we-are",
			sublinks: [
				{ name: "About Us", href: "/who-we-are#about" },
				{ name: "Vision & Mission", href: "/who-we-are#vision" },
				{ name: "Core Values", href: "/who-we-are#core" },
				{ name: "Our Team", href: "/who-we-are#team" },
				{ name: "Partners", href: "/who-we-are#partners" },
				{ name: "Our Clinics", href: "our-clinics" },
				{ name: "Contact Us", href: "/contact" },
			],
		},
		{ name: "Programs", sublinks: programLinks },
		{
			name: "Get Involved",
			sublinks: [
				{ name: "Volunteer", href: "/fill-me/volunteer_application" },
				{ name: "Careers", href: "/fill-me/career_application" },
				{
					name: "Corporate Partnerships",
					href: "/corporate-partnerships",
				},
				{
					name: <>&#8377;1 Rupee Warrier</>,
					href: "/1rupee",
				},
				{
					name: <>The &#8377;100 Club</>,
					href: "/100rupee",
				},
			],
		},
		{ name: "Blog", href: "/articles" },
		{ name: "Campaigns", href: "/campaigns" },
	],

	donateLink: {
		name: "Donate",
		href: "/donate",
	},

	secondaryLinks: [
		{ name: "Partners", href: "/partners" },
		{ name: "Volunteer", href: "/fill-me/volunteer_application" },
		{ name: "Careers", href: "/fill-me/career_application" },
		{ name: "Corporate Partnerships", href: "/corporate-partnerships" },
	],

	tertiaryLinks: [
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms & Conditions", href: "/terms" },
		{ name: "Refund Policy", href: "/refund-policy" },
		{ name: "Developers & Contributers", href: "/developers" },
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

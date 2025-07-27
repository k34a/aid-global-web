export interface ContactInfo {
	address: string;
	email: string;
	phone: string;
	website?: string;
}

export interface NGODetails {
	name: string;
	tagline: string;
	description: string;
	keywords: string[];
	logo: string;
	contact: ContactInfo;
	//twitter metadata
	twitterHandle: string;
	twitterCardType: "summary" | "summary_large_image" | "player" | "app";
}

export interface NavigationLink {
	name: string;
	href: string;
	icon?: string;
}

interface NavigationLinkWithSubLinks extends Omit<NavigationLink, "href"> {
	sublinks: { name: string; href: string }[];
	href?: string;
}

export interface SocialLink {
	name: string;
	href: string;
	icon: string;
}

export interface Links {
	primaryLinks: Array<NavigationLinkWithSubLinks | NavigationLink>;
	donateLink: NavigationLink;
	secondaryLinks: NavigationLink[];
	tertiaryLinks: NavigationLink[];
	socialLinks: SocialLink[];
}

import React from "react";
export interface ContactInfo {
	addresses: {
		type: "registration" | "communication";
		label: string;
		description: string;
		address: string;
	}[];
	email: string;
	phone: string;
	nationalHelpline: string;
	whatsapp: string;
	website?: string;
	workingHours: {
		days: string;
		hours: string;
	};
}

export interface NGODetails {
	name: string;
	tagline: string;
	description: string;
	keywords: string[];
	logo: string;
	registrationNumber: string;
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
	sublinks: { name: string | React.JSX.Element; href: string }[];
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

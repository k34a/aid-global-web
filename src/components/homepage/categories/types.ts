// types.ts
import { LucideIcon } from "lucide-react";
export interface DonationCardType {
	title: string;
	org: string;
	raised: number;
	required: number;
	backers: number;
	image: string;
	tag?: string;
}

export interface CategoryType {
	key: string;
	label: string;
	icon: LucideIcon;
	cards: DonationCardType[];
}

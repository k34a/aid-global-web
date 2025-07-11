import {
	Stethoscope,
	Footprints,
	Smile,
	Accessibility,
	Megaphone,
	Hospital,
	type LucideIcon,
} from "lucide-react";

export interface EnableAidItem {
	id: number;
	image: string;
	icon: LucideIcon;
	title: string;
	tagline: string;
	bullets: (string | { text: string; subpoints: string[] })[];
}

export const enableAidData: EnableAidItem[] = [
	{
		id: 1,
		icon: Stethoscope,
		image: "https://website-content.aidglobal.ngo/enable-aid/onee.jpg",
		title: "Early Detection & Timely Intervention",
		tagline: "Spotting the signs. Starting support early.",
		bullets: [
			{
				text: "Active collaboration with ASHA workers, RBSK teams, and Anganwadi teachers to identify early signs of:",
				subpoints: [
					"Cerebral Palsy, Clubfoot, Developmental Delays",
					"Hearing & Visual Impairments",
					"Autism Spectrum Disorder",
					"Down Syndrome, DDH and other birth-related deformities",
				],
			},
			"Screening programs and home visits ensure no child is left behind during the crucial early development window.",
			"Referral and tracking systems are established to initiate timely support and care pathways.",
		],
	},
	{
		id: 2,
		image: "https://website-content.aidglobal.ngo/enable-aid/two.jpg",
		icon: Footprints,
		title: "Clubfoot Program – Early Steps Toward a Better Future",
		tagline: "Correcting with compassion. Restoring mobility.",
		bullets: [
			{
				text: "Comprehensive treatment through the Ponseti Method, including:",
				subpoints: [
					"Casting, tenotomy (if needed), and bracing",
					"Customized corrective shoes provided free of cost",
				],
			},
			"Family counseling and follow-up support to ensure full recovery.",
			"Awareness campaigns to ensure early enrollment of newborns and infants.",
		],
	},
	{
		id: 3,
		image: "https://website-content.aidglobal.ngo/enable-aid/three.jpg",
		icon: Smile,
		title: "Mission Smile Program",
		tagline: "Healing smiles. Building futures.",
		bullets: [
			"Free cleft lip and palate surgeries for children in need.",
			{
				text: "Comprehensive cleft care includes:",
				subpoints: [
					"Speech therapy, nutrition support, and orthodontics",
					"Training of local medical professionals for long-term sustainability",
				],
			},
			"One surgery can be completed in just 45 minutes — changing a child’s life forever.",
			"Donation of ₹25,000 sponsors a complete cleft care cycle.",
			{
				text: "Support for other developmental disabilities includes:",
				subpoints: [
					"Therapies (physical, occupational, behavioral)",
					"Cognitive development interventions",
					"Referrals for specialist surgeries or consultations",
				],
			},
		],
	},
	{
		id: 4,
		image: "https://website-content.aidglobal.ngo/enable-aid/four.webp",
		icon: Accessibility,
		title: "Assistive Devices & Accessibility Support",
		tagline: "Tools for independence. Resources for dignity.",
		bullets: [
			{
				text: "EnableAid provides free assistive tools such as:",
				subpoints: [
					"Wheelchairs, walkers, and crutches",
					"White canes and braille reading kits for the visually impaired",
					"Hearing aids and communication devices",
					"Modified learning materials for sensory-impaired children",
				],
			},
			"All support is need-based, covering children, adults, and elderly persons with disabilities.",
		],
	},
	{
		id: 5,
		image: "https://website-content.aidglobal.ngo/enable-aid/five.jpeg",
		icon: Megaphone,
		title: "Awareness, Advocacy & Inclusion",
		tagline: "Changing minds. Creating opportunity.",
		bullets: [
			"Regular awareness and sensitization drives in schools and communities.",
			"Counseling for families to help them embrace disability support with hope.",
			"Strong advocacy for inclusive education — promoting enrollment of children with disabilities in mainstream schools (not segregated special education).",
			"Support for life-skills, vocational training, and employment readiness as children transition into adulthood.",
		],
	},
	{
		id: 6,
		image: "https://website-content.aidglobal.ngo/enable-aid/six.jpg",
		icon: Hospital,
		title: "EnableAid Clinics at Hospitals & Medical Colleges",
		tagline: "One-stop care. Community-rooted impact.",
		bullets: [
			{
				text: "Setting up EnableAid Clinics in:",
				subpoints: [
					"Government hospitals",
					"Private healthcare centers",
					"Medical colleges across India",
				],
			},
			{
				text: "Clinics provide:",
				subpoints: [
					"Free screening, diagnosis, therapy, surgery referrals",
					"Access to assistive devices",
					"Parent counseling and long-term rehabilitation",
				],
			},
			"Clinics are integrated with District Early Intervention Centres (DEICs) and aim to become local hubs of disability care and inclusion.",
		],
	},
];

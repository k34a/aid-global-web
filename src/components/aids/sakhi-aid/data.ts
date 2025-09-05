import { STATIC_IMAGE_HOST } from "@/config/config";

export interface InitiativeItem {
	color: string;
	title: string;
	description: string;
}

export interface AwarenessContent {
	image: string;
	title: string;
	desc1: string;
	desc2: string;
}

export const menstrualAwarenessData: AwarenessContent = {
	image: `${STATIC_IMAGE_HOST}sakhi-aid/menstrual.webp`,
	title: "Menstrual Health & Hygiene Awareness",
	desc1: "In many parts of India, menstruation is not just misunderstood-it is feared and shamed. SakhiAid takes bold steps to challenge this silence and bring dignity to every girl and woman.",
	desc2: "We believe that periods should never stop progress. Every girl deserves to attend school, dream big, and feel proud of her body.",
};

export const shgAwarenessData: AwarenessContent = {
	image: `${STATIC_IMAGE_HOST}sakhi-aid/shg.webp`,
	title: "Self-Help Groups (SHGs) for Economic & Social Upliftment",
	desc1: "We organize and support Self-Help Groups of women as the building blocks of change in their communities. SHGs are more than savings groups-they are spaces of trust, learning, creativity, and leadership.",
	desc2: "SHGs help women earn, learn, and lead together.",
};
export const livelihoodAwarenessData: AwarenessContent = {
	image: `${STATIC_IMAGE_HOST}sakhi-aid/livelihood2.webp`,
	title: "Livelihood & Skill Development for Self-Reliance",
	desc1: "SakhiAid believes that economic freedom leads to personal freedom. We offer structured training to young girls, homemakers, and survivors of abuse to help them build their future with courage and skill.",
	desc2: "With each training, we help a woman stand on her own feet, support her children, and inspire her neighbors.",
};
export const emotionalAwarenessData: AwarenessContent = {
	image: `${STATIC_IMAGE_HOST}sakhi-aid/emotional.webp`,
	title: "Emotional Support & Counseling",
	desc1: "Empowerment is not complete without healing. Many of the women and girls we support have experienced Domestic abuse Early marriage Abandonment Emotional trauma",
	desc2: "Healing the heart is the first step toward rebuilding life.",
};

export const initiativesone: InitiativeItem[] = [
	{
		color: "red.6",
		title: "Health Awareness Sessions",
		description:
			"in schools, anganwadis, and communities about the menstrual cycle, safe practices, and breaking myths.",
	},
	{
		color: "blue.5",
		title: "Sanitary Pad Distribution Drives",
		description:
			"to ensure every girl, especially in government schools and remote villages, has access to safe menstrual hygiene.",
	},
	{
		color: "orange.5",
		title: "Reusable Pad Making Workshop",
		description:
			"Training women to make and sell eco-friendly cloth pads, creating both awareness and livelihood.",
	},
	{
		color: "green.6",
		title: "Pad Banks",
		description:
			"set up in schools, community centers, and villages for free or low-cost access during emergencies.",
	},
	{
		color: "indigo.6",
		title: "School Hygiene Campaigns",
		description:
			"Promoting better sanitation facilities in schools including waste bins, clean toilets, and privacy.",
	},
	{
		color: "pink.7",
		title: "Mother-Daughter Menstrual Dialogues",
		description: "to encourage open family conversations and reduce shame.",
	},
];

export const initiativestwo: InitiativeItem[] = [
	{
		color: "red.6",
		title: "Formation & Mobilization",
		description:
			"Creating women's groups based on mutual trust and community connection.",
	},
	{
		color: "blue.5",
		title: "Tailored Training Programs",
		description:
			"Based on individual interest and local need-such as stitching, cooking, organic farming, handicrafts, etc.",
	},
	{
		color: "orange.5",
		title: "Product Making & Branding",
		description:
			"Women learn to make market-ready items like pickles, snacks, hand-sewn cloth items, soaps, candles, chocolates, herbal products, and eco-kits.",
	},
	{
		color: "green.6",
		title: "Participation in Exhibitions & Fairs",
		description:
			"SHG women are trained to set up stalls at local markets, city expos, and NGO fairs to sell their goods and gain visibility.",
	},
	{
		color: "indigo.6",
		title: "Financial Literacy & Bank Linkages",
		description:
			"Basic knowledge of savings, loans, budgeting, and opening SHG bank accounts.",
	},
	{
		color: "pink.7",
		title: "Leadership & Digital Skills",
		description:
			"Training women to manage meetings, maintain records, and operate smartphones for online selling.",
	},
	{
		color: "yellow.6",
		title: "Skill Showcasing & Awards",
		description:
			"Organizing SHG performance competitions to boost confidence and honor their growth.",
	},
];

export const initiativesthree: InitiativeItem[] = [
	{
		color: "pink.6",
		title: "Tailoring & Fashion Design",
		description:
			"Skill development in stitching, embroidery, and designing garments for home use or boutique sales.",
	},
	{
		color: "red.6",
		title: "Beautician & Salon Training",
		description:
			"Hands-on learning of beauty treatments, skincare, and grooming services for home parlours or salons.",
	},
	{
		color: "blue.6",
		title: "Computer Basics & Office Management",
		description:
			"Training in digital skills, MS Office, and workplace readiness for admin or desk-based jobs.",
	},
	{
		color: "orange.5",
		title: "Handmade Products",
		description:
			"Creating and designing bags, jewellery, gift items, and crafts for self-employment and exhibitions.",
	},
	{
		color: "green.6",
		title: "Paramedical & First Aid Training",
		description:
			"Building healthcare skills in first response, basic care, and support roles in rural clinics.",
	},
	{
		color: "violet.6",
		title: "Retail Management & Spoken English",
		description:
			"Training in customer service, shopkeeping, billing, and spoken English for retail or service jobs.",
	},
	{
		color: "yellow.6",
		title: "Dairy Farming",
		description: "Cattle care, feeding, vaccination, and milk marketing.",
	},
	{
		color: "amber.6",
		title: "Goat Farming",
		description: "Low-cost models for village-based income.",
	},
	{
		color: "green.6",
		title: "Poultry Farming",
		description: "Coop setup, feeding, hygiene, and poultry sales.",
	},
	{
		color: "lime.6",
		title: "Organic Farming & Kitchen Gardens",
		description: "Training in natural methods and seasonal planting",
	},
	{
		color: "indigo.6",
		title: "Entrepreneurship Bootcamps",
		description:
			"Workshops for women-led business ideas, planning, and pitching to mentors or investors.",
	},
	{
		color: "teal.6",
		title: "Seed Kit & Tool Distribution",
		description:
			"Providing necessary startup tools and seed material after completion of relevant training.",
	},
	{
		color: "red.6",
		title: "Micro-Loan Facilitation",
		description:
			"Helping women access loans through SHG federations and banks to launch or expand small businesses.",
	},
	{
		color: "cyan.6",
		title: "Market & Buyer Linkages",
		description:
			"Connecting SHGs and entrepreneurs to shops, buyers, and e-commerce platforms to sell products.",
	},
];

export const initiativesfour: InitiativeItem[] = [
	{
		color: "pink.6",
		title: "Basic Mental Health Counseling",
		description:
			"One-on-one emotional support sessions provided by trained volunteers to address distress and trauma.",
	},
	{
		color: "blue.5",
		title: "Group Therapy & Sharing Circles",
		description:
			"Safe spaces for women to share experiences, build emotional strength, and support each other collectively.",
	},
	{
		color: "orange.5",
		title: "Legal Referral Assistance",
		description:
			"Connecting women facing violence with legal aid services and helping them navigate justice systems.",
	},
	{
		color: "green.6",
		title: "Peer Mentorship Programs",
		description:
			"Empowering survivors to mentor and support other women through recovery and confidence-building.",
	},
];

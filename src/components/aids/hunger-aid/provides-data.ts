import { STATIC_IMAGE_HOST } from "@/config/config";

export const cards = [
	{
		id: 1,
		image: `${STATIC_IMAGE_HOST}hunger-aid/hunger-aid_freshmeals.webp`,
		title: "Fresh Cooked Meals",
		description: "We serve hot, nutritious meals to:",
		bullets: [
			"Homeless and abandoned individuals",
			"Daily wage laborers and low-income earners",

			"Patients' families at hospitals",

			"Communities affected by hardship or isolation",
		],
		footer: "Every meal is prepared with hygiene, delivered with compassion, and served with dignity.",
	},
	{
		id: 2,
		image: `${STATIC_IMAGE_HOST}hunger-aid/hunger-aid_foodelders.webp`,
		title: "Home-Delivered Meals for Elderly & Disabled",
		description:
			"Many people suffer hunger quietly behind closed doors. We deliver two hot meals every day to:",
		bullets: [
			"Elderly individuals with no family",
			"Physically or mentally disabled people",
			"Individuals recovering from serious illness",
		],
		footer: "This is more than food - it's a lifeline of care.",
	},
	{
		id: 3,
		image: `${STATIC_IMAGE_HOST}hunger-aid/hunger-aid_foodschool.webp`,
		title: "School Feeding for Underprivileged Children",
		description:
			"Children cannot grow, learn, or dream when they are hungry. We provide daily meals to:",
		bullets: [
			"Children in under-resourced schools",
			"Kids from slum and marginalized communities",
			"ShikhaAid Centre children, many of whom rely solely on this meal",
		],
		footer: "These meals support their learning and strengthen their future.",
	},
	{
		id: 4,
		image: `${STATIC_IMAGE_HOST}hunger-aid/kits.webp`,
		title: "Grocery Kits for Families in Crisis",
		description:
			"We distribute essential food and hygiene kits to families experiencing:",
		bullets: [
			"Widowhood, abandonment, or sudden job loss",
			"Chronic illness, disability, or stigma",
			"Floods, fire, displacement, or other emergencies",
		],
		footer: "Our kits are designed to support: Widowed and single women, HIV-positive children and their caregivers, Transgender persons facing social exclusion, Daily wage earners during off-season hardship. Each grocery kit provides safety, relief, and peace of mind.They serve as a vital lifeline, bringing dignity and stability to those navigating life's toughest challenges.",
	},
	{
		id: 5,
		image: `${STATIC_IMAGE_HOST}hunger-aid/hunger-aid_kitchenprogram.webp`,
		title: "Community Kitchen Program",
		description: "We operate Community Kitchens to serve:",
		bullets: [
			"Hot meals to entire neighborhoods and vulnerable groups",
			"Relief food during natural disasters, heatwaves, or public crises",
			"Daily support for families who cannot cook or afford ingredients",
		],
		footer: "These kitchens are hubs of compassion, nutrition, and resilience - ensuring no one in the area is left behind.They not only serve hot, nutritious meals but also restore dignity and hope for vulnerable communities. By addressing hunger at its root, these kitchens foster stronger, healthier, and more inclusive neighborhoods.",
	},
];

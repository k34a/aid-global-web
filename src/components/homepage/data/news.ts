// news.ts

export type NewsItem = {
	id: string;
	title: string;
	date: string;
	image: string;
	description: string;
	link: string;
};

export const newsList: NewsItem[] = [
	{
		id: "blood-donation-2025",
		title: "Blood Donation Camp 2025",
		date: "2025-06-10",
		image: "/news1.jpg",
		description:
			"Our recent camp successfully collected 500+ units to save lives.",
		link: "#",
	},
	{
		id: "eye-care-launch",
		title: "Launch of Eye Care Mission",
		date: "2025-05-25",
		image: "/news2.jpg",
		description:
			"We launched a new initiative providing 1000+ free checkups.",
		link: "#",
	},
	{
		id: "school-kit-drive-1",
		title: "School Kit Drive",
		date: "2025-04-12",
		image: "/news3.jpg",
		description:
			"Donated kits to 300+ underprivileged students before reopening.",
		link: "#",
	},
	{
		id: "eye-care-repeat",
		title: "Launch of Eye Care Mission",
		date: "2025-05-25",
		image: "/news2.jpg",
		description:
			"We launched a new initiative providing 1000+ free checkups.",
		link: "#",
	},
	{
		id: "school-kit-drive-2",
		title: "School Kit Drive",
		date: "2025-04-12",
		image: "/news3.jpg",
		description:
			"Donated kits to 300+ underprivileged students before reopening.",
		link: "#",
	},
	{
		id: "eye-care-repeat-2",
		title: "Launch of Eye Care Mission",
		date: "2025-05-25",
		image: "/news2.jpg",
		description:
			"We launched a new initiative providing 1000+ free checkups.",
		link: "#",
	},
	{
		id: "school-kit-drive-3",
		title: "School Kit Drive",
		date: "2025-04-12",
		image: "/news3.jpg",
		description:
			"Donated kits to 300+ underprivileged students before reopening.",
		link: "#",
	},
];

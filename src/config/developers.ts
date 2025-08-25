export type Developer = {
	name: string;
	github: string;
	linkedin: string;
};

export type DeveloperSection = {
	role: string;
	members: Developer[];
};

export const developers: DeveloperSection[] = [
	{
		role: "Team Lead (Tech)",
		members: [
			{
				name: "Saksham Garg",
				github: "k34a",
				linkedin: "https://linkedin.com/in/saksham-k34a/",
			},
		],
	},
	{
		role: "Frontend Developer",
		members: [
			{
				name: "robinsrarf",
				github: "robinsrarf",
				linkedin: "https://www.linkedin.com/in/robinsrarf/",
			},
			{
				name: "Asiya Tabasum Shaik",
				github: "asiya-tabasum",
				linkedin: "https://www.linkedin.com/in/asiya-tabasum-shaik/",
			},
			{
				name: "Harsha Vardhan Balaka",
				github: "HarshaBalaka",
				linkedin:
					"https://www.linkedin.com/in/harsha-vardhan-balaka-23895a304/",
			},
			{
				name: "KarakaCharmi",
				github: "KarakaCharmi",
				linkedin:
					"https://www.linkedin.com/in/karaka-charmi-7a64b7259/",
			},
		],
	},
	{
		role: "Full stack Developer",
		members: [
			{
				name: "Lavanya Alapana",
				github: "Lavanya-Alapana",
				linkedin:
					"https://www.linkedin.com/in/lavanya-alapana-37339a213/",
			},
		],
	},
];

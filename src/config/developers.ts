export type Developer = {
	name: string;
	github: string;
	linkedin: string;
	role: string;
};

export type DeveloperSection = {
	role: string;
	members: Developer[];
};

export const developers: DeveloperSection[] = [
	{
		role: "Team Lead",
		members: [
			{
				name: "Saksham Garg",
				github: "k34a",
				linkedin: "https://linkedin.com/in/saksham-k34a/",
				role: "Team Lead",
			},
		],
	},
	{
		role: "Developers",
		members: [
			{
				name: "Asiya Tabasum Shaik",
				github: "asiya-tabasum",
				linkedin: "https://www.linkedin.com/in/asiya-tabasum-shaik/",
				role: "Developer",
			},
			{
				name: "Lavanya Alapana",
				github: "Lavanya-Alapana",
				linkedin:
					"https://www.linkedin.com/in/lavanya-alapana-37339a213/",
				role: "Developer",
			},
			{
				name: "Harsha Vardhan Balaka",
				github: "HarshaBalaka",
				linkedin:
					"https://www.linkedin.com/in/harsha-vardhan-balaka-23895a304/",
				role: "Developer",
			},
			{
				name: "KarakaCharmi",
				github: "KarakaCharmi",
				linkedin:
					"https://www.linkedin.com/in/karaka-charmi-7a64b7259/",
				role: "Developer",
			},
			{
				name: "robinsrarf",
				github: "robinsrarf",
				linkedin: "https://www.linkedin.com/in/robinsrarf/",
				role: "Developer",
			},
		],
	},
];

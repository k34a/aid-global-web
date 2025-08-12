export type Clinic = {
	name: string;
	state: string;
	district: string;
	incharge: {
		name: string;
		mobile: string;
		email: string;
	};
};

export const locations: Clinic[] = [
	{
		name: " EnableAid Clinic Bhiwandi ",
		state: "Maharashtra",
		district: "Thane",
		incharge: {
			name: "Mrs.Pooja Pathak",
			mobile: "+91-9607740158",
			email: "Pooja.Pathak@aidglobal.ngo",
		},
	},
];

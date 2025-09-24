import { number } from "zod/v4";
import { STATIC_IMAGE_HOST } from "./config";

export const bankDetails = {
	account: [
		{
			name: "Aid Global Foundation",
			number: "925020029188000",
			bank: "Axis Bank Ltd.",
			ifsc: "UTIB0003387",
			micr: "400211288",
			branchAddress: "Anjur phata bhiwandi Branch",
		},
		{
			name: "Aid Global Foundation",
			number: "110261453265",
			bank: "Canara Bank",
			ifsc: "CNRB0006727",
			micr: "400015191",
			branchAddress:
				"Shop No. 12, Konark Arcade, St Dept Rd, Bhiwandi, Thane, Maharashtra - 421302",
		},
	],
	cheque: {
		payableTo: "Aid Global Foundation",
		mailingAddress: [
			"H.No. 4/24/G7, Sathe Nagar",
			"Near Manoj Kirana Store",
			"Narpoli, Bhiwandi",
			"Thane, Maharashtra - 421305",
		],
	},
	notes: {
		cheque: "You may deposit the cheque at any Axis Bank branch or send it to our office address below:",
		bank: "You can make donations via Bank Transfer (NEFT / RTGS / IMPS) using these details.",
	},
	upi: {
		qr: `${STATIC_IMAGE_HOST}donation/qr.webp`,
		id: "333681419453265@cnrb",
	},
};

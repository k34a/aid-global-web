import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Donation Status",
	description: "View the status of your donation and download the receipt",
	openGraph: {
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
	twitter: {
		card: "summary_large_image",
		title: "Donation Status",
		description:
			"View the status of your donation and download the receipt",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main>{children}</main>
		</>
	);
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ngoDetails } from "@/config/config";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(ngoDetails.contact.website!),
	title: ngoDetails.name,
	description: ngoDetails.description,
	keywords: ngoDetails.keywords,
	authors: [{ name: ngoDetails.name }],
	creator: ngoDetails.name,
	publisher: ngoDetails.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: ngoDetails.contact.website,
		title: ngoDetails.name,
		description: ngoDetails.description,
		siteName: ngoDetails.name,
	},
	twitter: {
		card: ngoDetails.twitterCardType,
		title: ngoDetails.name,
		description: ngoDetails.description,
		creator: ngoDetails.twitterHandle,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

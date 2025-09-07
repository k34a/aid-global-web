import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
	MantineColorsTuple,
	createTheme,
} from "@mantine/core";

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

const sky: MantineColorsTuple = [
	"#f0f9ff", // 50
	"#e0f2fe", // 100
	"#bae6fd", // 200
	"#7dd3fc", // 300
	"#38bdf8", // 400
	"#0ea5e9", // 500
	"#0284c7", // 600
	"#0369a1", // 700
	"#075985", // 800
	"#0c4a6e", // 900
	"#082f49", // 950
];

export const theme = createTheme({
	colors: {
		sky,
	},
	primaryColor: "sky",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MantineProvider theme={theme}>{children}</MantineProvider>
				<Toaster />
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import Header from "@/components/structure/header";

import Footer from "@/components/structure/footer";
import { ngoDetails } from "@/config/config";

export const metadata: Metadata = {
	title: {
		default: ngoDetails.name,
		template: `%s | ${ngoDetails.name}`,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<div style={{ marginTop: "80px" }}>{children}</div>
			<Footer />
		</>
	);
}

import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
			<main className="flex-grow">{children}</main>
			<Footer />
		</>
	);
}

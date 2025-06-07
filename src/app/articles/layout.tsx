import Footer from "@/components/footer";
import Header from "@/components/header";
import { ngoDetails } from "@/config/config";

export const metadata = {
	title: `Article | ${ngoDetails.name}`,
	description: ngoDetails.description,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}

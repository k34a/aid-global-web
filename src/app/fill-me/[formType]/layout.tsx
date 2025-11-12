import Header from "@/components/structure/header";
import Footer from "@/components/structure/footer";

export const dynamic = "force-dynamic";

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

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function VolunteerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-gray-50">{children}</main>
			<Footer />
		</>
	);
}

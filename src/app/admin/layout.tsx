import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Administrative tasks - manage articles, campaigns and more.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<main className="hidden md:block p-5">{children}</main>
			<div className="md:hidden h-screen flex items-center justify-center font-bold text-2xl text-center">
				Admin functionality is currently only supported for desktop
				users.
			</div>
		</>
	);
}

import Breadcrumb from "@/components/dashboard/breadcrumbs";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Breadcrumb basePath="/admin/dashboard" homePageName="Dashboard" />
			{children}
		</>
	);
}

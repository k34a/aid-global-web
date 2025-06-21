type PageProps = {
	params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
	return <main className="max-w-3xl mx-auto p-6"></main>;
}

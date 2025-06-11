import PaginationInput from "@/components/dashboard/pagination";
import { getAllArticles, getAllArticlesCount } from "@/lib/db/articles";
import Link from "next/link";

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POSTS_PER_PAGE = 10;

const Page = async (props: PageProps) => {
	const searchParams = await props.searchParams;
	let pageNumber = 1;
	if (searchParams.page && typeof searchParams.page === "string") {
		try {
			pageNumber = parseInt(searchParams.page);
		} catch {}
	}
	if (pageNumber <= 0) {
		pageNumber = 1;
	}

	const articles = await getAllArticles(
		POSTS_PER_PAGE - 1,
		(pageNumber - 1) * POSTS_PER_PAGE,
	);

	const numberOfPosts = await getAllArticlesCount();

	const numberOfPages = Math.ceil(numberOfPosts / POSTS_PER_PAGE);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-bold">All Articles</h1>
			<ul className="list-disc list-inside">
				{articles.map((article, idx) => {
					return (
						<li key={idx}>
							<Link
								className="text-blue-900 hover:underline font-semibold text-xl"
								href={`/admin/dashboard/articles/${article.slug}`}
							>
								{article.title}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className="flex items-center justify-center">
				<PaginationInput
					currentPage={pageNumber}
					numberOfPages={numberOfPages}
				/>
			</div>
		</div>
	);
};

export default Page;

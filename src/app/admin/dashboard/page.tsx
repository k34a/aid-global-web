import LogoutButton from "@/components/auth/logout";
import Link from "next/link";

const Page = () => {
	return (
		<>
			<h1 className="text-2xl font-bold py-2">Navigation</h1>
			<ul className="list-disc list-inside">
				<li>
					<Link
						className="text-blue-900 hover:underline font-semibold text-xl"
						href="/admin/dashboard/articles"
					>
						Articles
					</Link>
				</li>
				<li>
					<Link
						className="text-blue-900 hover:underline font-semibold text-xl"
						href="/admin/dashboard/campaigns"
					>
						Campaigns
					</Link>
				</li>
				<li>
					<Link
						className="text-blue-900 hover:underline font-semibold text-xl"
						href="/admin/dashboard/access"
					>
						Users with access
					</Link>
				</li>
				<li>
					<LogoutButton className="text-blue-900 hover:underline font-semibold text-xl" />
				</li>
			</ul>
		</>
	);
};

export default Page;

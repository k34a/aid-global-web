import LogoutButton from "@/components/auth/logout";
import Link from "next/link";

const Page = () => {
	return (
		<div>
			<p>Admin</p>
			<div className="flex gap-5 text-blue-500">
				<Link href="/admin/login" className="hover:underline">
					Login
				</Link>
				<Link href="/admin/create-account" className="hover:underline">
					Create Account
				</Link>
				<LogoutButton />
			</div>
		</div>
	);
};

export default Page;

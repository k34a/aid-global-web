import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (token) {
		let isValidToken = false;
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET!);
			if (decoded) {
				isValidToken = true;
			}
		} catch (err) {
			// Token invalid or expired
			console.error("Token invalid or expired");
		}

		if (isValidToken) {
			redirect("/admin/dashboard");
		}
	}

	return <>{children}</>;
}

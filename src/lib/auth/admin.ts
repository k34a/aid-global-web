import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyAdminAuth() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return { error: "Unauthorized", status: 401 };
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
		return { user: decoded };
	} catch (error) {
		return { error: "Invalid token", status: 401 };
	}
}

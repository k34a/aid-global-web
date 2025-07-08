import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_AGE_IN_DAYS } from "@/config/data";

export function getJWT(id: string, email: string, role: string) {
	const JWT_SECRET = process.env.JWT_SECRET!;
	const token = jwt.sign(
		{
			id: id,
			email: email,
			role: role,
		},
		JWT_SECRET,
		{ expiresIn: `${JWT_TOKEN_AGE_IN_DAYS}d` },
	);
	return token;
}

export async function verifyAdminAuth(): Promise<boolean> {
	"use server";
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return false;
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		return !!decoded;
	} catch (error) {
		return false;
	}
}

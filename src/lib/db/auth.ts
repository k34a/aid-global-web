import { supabaseAdmin } from "./supabase";
import bcrypt from "bcryptjs";
import { z } from "zod/v4";
import jwt from "jsonwebtoken";
import { JWT_TOKEN_AGE_IN_DAYS } from "@/config/data";

const createAccountRequestSchema = z.object({
	name: z.string(),
	email: z.email("Invalid email address"),
	password: z.string(),
});

class UnableToRegisterError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, UnableToRegisterError.prototype);
	}
}

async function canAdminRegister(email: string) {
	const { data: existingUser, error } = await supabaseAdmin
		.from("admins")
		.select("id, password_hash")
		.eq("email", email)
		.maybeSingle();

	if (error) {
		console.log(error);
		throw new UnableToRegisterError(
			"Unable to create your account. Please try again later.",
		);
	}

	if (!existingUser) {
		throw new UnableToRegisterError(
			"Registration is by invitation only. Your email is not recognized. Please contact the administrator to request access.",
		);
	}

	if (existingUser.password_hash) {
		throw new UnableToRegisterError(
			"Account already exists. Please login.",
		);
	}

	return true;
}

async function registerAdmin(email: string, name: string, password: string) {
	await canAdminRegister(email);
	const password_hash = await bcrypt.hash(password, 10);

	const { error } = await supabaseAdmin
		.from("admins")
		.update({ name, password_hash })
		.eq("email", email);

	if (error) {
		throw new UnableToRegisterError("Failed to create account.");
	}
}

const loginRequestSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string(),
});

class UnableToLoginError extends Error {
	constructor(msg: string) {
		super(msg);
		Object.setPrototypeOf(this, UnableToLoginError.prototype);
	}
}

function getJWT(id: string, email: string, role: string) {
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

async function loginAdmin(email: string, password: string): Promise<string> {
	const { data: user, error } = await supabaseAdmin
		.from("admins")
		.select("id, name, email, password_hash, role")
		.eq("email", email)
		.maybeSingle();

	if (error || !user?.password_hash) {
		throw new UnableToLoginError("Invalid credentials.");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password_hash);

	if (!isPasswordValid) {
		throw new UnableToLoginError("Invalid credentials.");
	}

	return getJWT(user.id, user.email, user.role);
}

export {
	registerAdmin,
	loginAdmin,
	createAccountRequestSchema,
	loginRequestSchema,
	UnableToRegisterError,
	UnableToLoginError,
};

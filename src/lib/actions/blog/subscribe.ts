"use server";

import { supabaseAdmin } from "@/lib/db/supabase";

export const subscribeEmail = async (email: string) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailRegex.test(email)) {
		return {
			success: false,
			message: "Invalid email address.",
		};
	}

	const { data: existing, error: fetchError } = await supabaseAdmin
		.from("newsletter_subscribers")
		.select("id")
		.eq("email", email)
		.maybeSingle();

	if (fetchError) {
		console.error(fetchError);
		return {
			success: false,
			message: "Error checking existing subscription.",
		};
	}

	if (existing) {
		return {
			success: false,
			message: "Email is already subscribed.",
		};
	}

	const { error } = await supabaseAdmin
		.from("newsletter_subscribers")
		.insert({ email });

	if (error) {
		console.error(error);
		return {
			success: false,
			message: "Failed to subscribe. Please try again later.",
		};
	}

	return {
		success: true,
		message: "Successfully subscribed to the newsletter!",
	};
};

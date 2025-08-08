"use client";

import { useForm } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";

export default function ContactForm() {
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			number: "",
			subject: "",
			message: "",
			location: "",
		},

		validate: {
			name: (value) =>
				value.trim().length < 2 ? "Name is too short" : null,
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
			number: (value) =>
				value.length < 10 ? "Enter a valid phone number" : null,
			location: (value) => (!value ? "Location is required" : null),
			subject: (value) => (!value ? "Subject is required" : null),
			message: (value) => (!value ? "Message is required" : null),
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		setStatus("submitting");
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				throw new Error("Failed to submit the form. Please try again.");
			}

			setStatus("success");
			form.reset();
		} catch (error) {
			setStatus("error");
			setErrorMessage((error as Error).message);
		}
	};

	return (
		<section className="w-full py-10 bg-white">
			<form
				onSubmit={form.onSubmit(handleSubmit)}
				className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20"
			>
				<div className="flex flex-col lg:flex-row gap-12">
					{/* Left Column */}
					<div className="lg:w-1/2">
						<h1 className="text-3xl font-semibold mb-4">
							Write To Us
						</h1>
						<p className="text-zinc-600 mb-4 border-b pb-4">
							If you have any queries, visit our FAQs section or
							just send us a message and someone from our team
							will reach out to you. For volunteering and
							internship opportunities, please{" "}
							<Link
								href="/volunteer"
								className="text-blue-500 hover:underline"
							>
								click here
							</Link>
							.
						</p>

						<div className="mt-6">
							<h2 className="text-lg font-semibold mb-2">
								Frequently Asked Questions
							</h2>
							<div className="flex gap-4 text-blue-500">
								<Link
									href="/who-we-are#vision"
									className="hover:underline border-r border-zinc-400 pr-4"
								>
									Our Vision & Mission
								</Link>
								<Link
									href="/donate"
									className="hover:underline"
								>
									Make A Donation
								</Link>
							</div>
						</div>
					</div>

					{/* Right Column - Form */}
					<div className="lg:w-1/2 space-y-4">
						<div className="flex flex-col md:flex-row gap-4">
							<input
								placeholder="Name*"
								className="flex-1 p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								{...form.getInputProps("name")}
							/>
							<input
								placeholder="Email*"
								type="email"
								className="flex-1 p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								{...form.getInputProps("email")}
							/>
						</div>

						<div className="flex flex-col md:flex-row gap-4">
							<input
								placeholder="Phone Number*"
								type="tel"
								className="flex-1 p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								{...form.getInputProps("number")}
							/>
							<input
								placeholder="Location*"
								className="flex-1 p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
								{...form.getInputProps("location")}
							/>
						</div>
						<input
							placeholder="Subject*"
							className="flex-1 p-3 w-full border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							{...form.getInputProps("subject")}
						/>
						<textarea
							rows={6}
							placeholder="Message*"
							className="w-full p-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
							{...form.getInputProps("message")}
						/>

						{/* Validation Errors */}
						{status === "error" && (
							<p className="text-red-500 text-sm">
								{errorMessage}
							</p>
						)}
						{status === "success" && (
							<p className="text-green-600 text-sm">
								Your message has been sent successfully.
							</p>
						)}

						<button
							type="submit"
							disabled={status === "submitting"}
							className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition disabled:opacity-50"
						>
							{status === "submitting"
								? "Submitting..."
								: "Submit"}
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

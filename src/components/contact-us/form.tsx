"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Textarea, Button } from "@mantine/core";
import { submitContactMessage } from "./actions";
import toast from "react-hot-toast";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { contactFormSchema } from "./schema";

export default function ContactUsForm() {
	const [loading, setLoading] = useState(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},

		validate: zod4Resolver(contactFormSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		try {
			const data = await submitContactMessage(values);
			if (data) {
				toast.error(data);
			} else {
				toast.success("Your message is sent");
				form.reset();
			}
		} catch (error) {
			toast.error("Unable to send your message");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={form.onSubmit(handleSubmit)}
			className="p-6 sm:p-10 md:col-span-2 bg-white rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl shadow-lg flex flex-col"
		>
			<h2 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">
				Send Us a Message
			</h2>
			<p className="mb-6 text-sm sm:text-base text-gray-600 font-light max-w-xl leading-relaxed">
				We&apos;re here to help! Reach out and start a conversation to
				support the cause.
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
				<TextInput
					label="Your Name"
					placeholder="John Doe"
					key={form.key("name")}
					{...form.getInputProps("name")}
					required
					classNames={{ input: "text-sm" }}
				/>

				<TextInput
					label="Your Email"
					placeholder="you@example.com"
					type="email"
					key={form.key("email")}
					{...form.getInputProps("email")}
					required
					classNames={{ input: "text-sm" }}
				/>
			</div>

			<div className="mb-6">
				<TextInput
					label="Subject"
					placeholder="I want to contribute to the cause"
					key={form.key("subject")}
					{...form.getInputProps("subject")}
					required
					classNames={{ input: "text-sm" }}
				/>
			</div>

			<div className="mb-8">
				<Textarea
					label="Message"
					placeholder="Write your message here..."
					rows={5}
					key={form.key("message")}
					{...form.getInputProps("message")}
					required
					classNames={{ input: "text-sm" }}
				/>
			</div>

			<Button
				type="submit"
				loading={loading}
				className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg text-white text-sm font-semibold shadow-md transition-transform transform hover:scale-105"
			>
				Send Message
			</Button>
		</form>
	);
}

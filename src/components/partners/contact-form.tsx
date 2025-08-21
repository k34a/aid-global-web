"use client";

import { TextInput, Textarea, Button, Grid, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { submitCorporatePartnership } from "./actions";
import { zodResolver } from "mantine-form-zod-resolver";
import { corporateFormSchema } from "./schema";

export default function CorporatePartnershipForm() {
	const [loading, setLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			organization: "",
			website: "",
			subject: "",
			message: "",
		},

		validate: zodResolver(corporateFormSchema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		try {
			const error = await submitCorporatePartnership(values);
			if (error) {
				toast.error(error);
			} else {
				toast.success("Form submitted successfully!");
				setIsSubmitted(true);
			}
		} catch (error) {
			toast.error((error as Error).message || "Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="w-full py-10 bg-white">
			<div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
				<div className="flex flex-col lg:flex-row gap-12">
					{/* Left Column - Info/Intro */}
					<div className="lg:w-1/2">
						<h1 className="text-3xl font-semibold mb-4">
							Write To Us
						</h1>
						<p className="text-zinc-600 mb-4 border-b pb-4">
							If you&apos;re a company or organization interested
							in partnering with us, please fill out the form and
							we&apos;ll get back to you shortly. For volunteering
							and internship opportunities, please{" "}
							<Link
								href="/volunteer"
								className="text-sky-500 hover:underline"
							>
								click here
							</Link>
							.
						</p>

						<div className="mt-6">
							<h2 className="text-lg font-semibold mb-2">
								Frequently Asked Questions
							</h2>
							<div className="flex gap-4 text-sky-500">
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

					<div className="lg:w-1/2">
						{isSubmitted ? (
							<div className="bg-green-50 border border-green-300 text-green-700 p-6 rounded-md shadow-sm">
								<h2 className="text-2xl font-semibold mb-2">
									Thank you for reaching out!
								</h2>
								<p>
									Your corporate partnership inquiry has been
									submitted successfully. We&apos;ll get back
									to you shortly.
								</p>
							</div>
						) : (
							<form onSubmit={form.onSubmit(handleSubmit)}>
								<Stack gap="lg">
									<Grid gutter="md">
										<Grid.Col span={{ base: 12, md: 6 }}>
											<TextInput
												label="Full Name"
												placeholder="John Doe"
												withAsterisk
												required
												{...form.getInputProps("name")}
											/>
										</Grid.Col>
										<Grid.Col span={{ base: 12, md: 6 }}>
											<TextInput
												label="Email"
												type="email"
												placeholder="john@company.com"
												withAsterisk
												required
												{...form.getInputProps("email")}
											/>
										</Grid.Col>
									</Grid>

									<Grid gutter="md">
										<Grid.Col span={{ base: 12, md: 6 }}>
											<TextInput
												label="Organization Name"
												placeholder="Company Inc."
												withAsterisk
												required
												{...form.getInputProps(
													"organization",
												)}
											/>
										</Grid.Col>
										<Grid.Col span={{ base: 12, md: 6 }}>
											<TextInput
												label="Organization Website"
												placeholder="https://example.com"
												{...form.getInputProps(
													"website",
												)}
											/>
										</Grid.Col>
									</Grid>

									<TextInput
										label="Subject"
										placeholder="Partnership Inquiry"
										withAsterisk
										required
										{...form.getInputProps("subject")}
									/>

									<Textarea
										label="Message"
										placeholder="Tell us more about your proposal or inquiry..."
										withAsterisk
										minRows={6}
										autosize
										required
										{...form.getInputProps("message")}
									/>

									<Group justify="flex-end">
										<Button
											type="submit"
											loading={loading}
											className="bg-sky-500 hover:bg-sky-600 transition rounded-full"
										>
											Submit
										</Button>
									</Group>
								</Stack>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

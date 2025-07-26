"use client";

import {
	TextInput,
	NumberInput,
	Button,
	Paper,
	Title,
	Text,
	Notification,
	Container,
	Grid,
	Image as MantineImage,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { DonateButton } from "@/components/donation/donate-button";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { Check, X } from "lucide-react";

const Donate = () => {
	const donateParamsSchema = z.object({
		program: z
			.enum([
				"shiksha-aid",
				"enable-aid",
				"cure-aid",
				"sakhi-aid",
				"vision-aid",
				"ghar-aid",
				"hunger-aid",
			])
			.optional()
			.default("general-aid"),
	});
	const searchParams = useSearchParams();
	const programRaw = searchParams.get("program");

	const parsed = donateParamsSchema.safeParse({ program: programRaw });
	const program = parsed.success ? parsed.data.program : "general-aid";

	const [showDonate, setShowDonate] = useState(false);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [error, setError] = useState("");

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			contact: "",
			amount: 0,
		},

		validate: {
			name: (value) =>
				value.trim().length < 2 ? "Enter a valid name" : null,
			email: (value) =>
				/^\S+@gmail\.com$/.test(value)
					? null
					: "Must be a valid Gmail address",
			contact: (value) =>
				/^(?:\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/.test(value.trim())
					? null
					: "Enter a valid Indian phone number",

			amount: (value) =>
				value > 0 ? null : "Donation amount must be greater than 0",
		},
	});

	const handleDonateClick = () => {
		if (form.validate().hasErrors) {
			setError("Please correct the errors before proceeding.");
			return;
		}

		setError("");
		setShowDonate(true);
	};

	return (
		<div className="min-h-screen  bg-[#fbe8e9] flex items-center justify-center ">
			<Paper shadow="xl" radius="md" p="lg" className="w-full max-w-6xl">
				<Grid gutter="xl">
					{/* LEFT: Info & Image */}
					<Grid.Col
						span={{ base: 12, md: 6 }}
						className="text-center"
					>
						<Title order={1} className="text-gray-800">
							Your Kindness Has{" "}
							<span className="text-red-600">No Boundaries</span>
						</Title>
						<Text c="dimmed" size="lg" mt="xs">
							Make a difference in lives across the world in any
							way you choose
						</Text>
						<MantineImage
							src={`${STATIC_IMAGE_HOST}donation/donatebg.webp`}
							alt="Global Donation"
							radius="md"
							mt="md"
							className="object-cover w-full"
						/>
					</Grid.Col>

					{/* RIGHT: Donation Form */}
					<Grid.Col span={{ base: 12, md: 6 }}>
						<Title order={1} align="center" mb="md">
							Donate to{" "}
							<span className="text-red-600">{program}</span>
						</Title>

						<form
							onSubmit={form.onSubmit(() => handleDonateClick())}
							className="space-y-4"
						>
							<TextInput
								label="Your Name"
								placeholder="Enter your full name"
								{...form.getInputProps("name")}
							/>

							<TextInput
								label="Email (Gmail only)"
								placeholder="you@gmail.com"
								{...form.getInputProps("email")}
							/>

							<TextInput
								label="Contact Number"
								placeholder="10-digit Indian number"
								{...form.getInputProps("contact")}
							/>

							<NumberInput
								label={`Donation Amount (\u20B9)`}
								placeholder="Enter amount"
								min={1}
								hideControls
								{...form.getInputProps("amount")}
							/>

							{error && (
								<Notification
									icon={<X size="1.1rem" />}
									color="red"
									title="Form Error"
								>
									{error}
								</Notification>
							)}
							<label className="flex items-center gap-2 text-sm text-gray-700">
								<input
									type="checkbox"
									checked={isAnonymous}
									onChange={() =>
										setIsAnonymous(!isAnonymous)
									}
									className="w-4 h-4 border-gray-300 text-sky-600"
								/>
								Donate Anonymously
							</label>

							<Button fullWidth color="red" type="submit">
								Proceed to Donate
							</Button>
						</form>

						{showDonate && (
							<div className="mt-6 text-center">
								<DonateButton
									name={form.values.name}
									email={form.values.email}
									contact_number={form.values.contact}
									notes={program}
									amount={form.values.amount}
									is_anon={isAnonymous}
									products={{}}
									auto_allocate={true}
									text={`Donate \u20B9${form.values.amount}`}
								/>
							</div>
						)}
					</Grid.Col>
				</Grid>
			</Paper>
		</div>
	);
};

export default Donate;

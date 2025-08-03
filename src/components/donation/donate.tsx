// donation/donate.tsx
"use client";

import {
	TextInput,
	NumberInput,
	Paper,
	Title,
	Text,
	Notification,
	Select,
	Grid,
	Image as MantineImage,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DonateButton } from "@/components/campaign/donate";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { X } from "lucide-react";

const Donate = () => {
	const donateParamsSchema = z.object({
		program: z.enum([
			"shiksha-aid",
			"enable-aid",
			"cure-aid",
			"sakhi-aid",
			"vision-aid",
			"ghar-aid",
			"hunger-aid",
			"general-aid",
		]),
	});

	const searchParams = useSearchParams();
	const programRaw = searchParams.get("program");
	const parsed = donateParamsSchema.safeParse({ program: programRaw });
	const program = parsed.success ? parsed.data.program : "general-aid";

	const [customProgram, setCustomProgram] = useState<string>(program);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [error, setError] = useState("");

	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			contact: "",
			amount: 0,
			countryCode: "+91",
		},
		validate: {
			name: (value) =>
				value.trim().length < 2 ? "Enter a valid name" : null,

			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value)
					? null
					: "Enter a valid email address",

			contact: (value, values) => {
				const number = value.trim();
				const country = values.countryCode;

				if (!/^\d+$/.test(number)) {
					return "Phone number must be digits only";
				}

				if (country === "+91") {
					if (!/^[6-9]\d{9}$/.test(number)) {
						return "Enter a valid 10-digit Indian number";
					}
				} else if (country === "+1") {
					if (!/^\d{10}$/.test(number)) {
						return "Enter a valid 10-digit US number";
					}
				} else if (country === "+44") {
					if (!/^\d{10,11}$/.test(number)) {
						return "Enter a valid UK number (10-11 digits)";
					}
				} else if (country === "+61") {
					if (!/^\d{9}$/.test(number)) {
						return "Enter a valid 9-digit Australian number";
					}
				}

				return null;
			},

			amount: (value) =>
				value > 0 ? null : "Donation amount must be greater than 0",
		},
	});

	return (
		<div className="min-h-screen bg-[#fbe8e9] flex items-center justify-center px-4 py-10 sm:py-6">
			<Paper shadow="xl" radius="md" p="lg" className="w-full max-w-6xl">
				<Grid gutter="xl">
					<Grid.Col
						span={{ base: 12, md: 6 }}
						className="text-center"
					>
						<Title order={1} className="text-gray-800">
							Your Kindness Has{" "}
							<span className="text-[#2563eb]">
								No Boundaries
							</span>
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

					<Grid.Col span={{ base: 12, md: 6 }}>
						<Title order={1} className="text-center mb-4">
							Donate to{" "}
							<TextInput
								value={customProgram}
								onChange={(e) =>
									setCustomProgram(e.currentTarget.value)
								}
								variant="unstyled"
								className="inline w-auto text-[#2563eb] font-semibold text-lg focus:outline-none focus:ring-0"
								styles={{
									input: {
										padding: 0,
										margin: 0,
										fontSize: "inherit",
										fontWeight: "bold",
										color: "#2563eb",
										border: "none",
										background: "transparent",
										textAlign: "center",
									},
								}}
							/>
						</Title>

						<div className="space-y-4">
							<TextInput
								label="Your Name"
								placeholder="Enter your full name"
								{...form.getInputProps("name")}
							/>

							<TextInput
								label="Email"
								placeholder="Enter valid email address"
								{...form.getInputProps("email")}
							/>

							<div className="flex gap-2">
								<Select
									label="Country Code"
									data={[
										{ value: "+91", label: "+91 (India)" },
										{ value: "+1", label: "+1 (USA)" },
										{ value: "+44", label: "+44 (UK)" },
										{
											value: "+61",
											label: "+61 (Australia)",
										},
									]}
									{...form.getInputProps("countryCode")}
									className="w-1/3"
								/>
								<TextInput
									label="Phone Number"
									placeholder="Enter your mobile number"
									{...form.getInputProps("contact")}
									className="w-2/3"
								/>
							</div>

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

							<div className="text-center mt-4">
								<DonateButton
									name={form.values.name}
									email={form.values.email}
									contact_number={`${form.values.contact}`}
									notes={customProgram.trim()}
									amount={form.values.amount}
									is_anon={isAnonymous}
									products={{}}
									auto_allocate={true}
									text={`Donate \u20B9${form.values.amount}`}
									onBeforePay={() => {
										const result = form.validate();
										if (result.hasErrors) {
											setError(
												"Please correct the errors before proceeding.",
											);
											return false;
										}
										setError("");
										return true;
									}}
								/>
							</div>
						</div>
					</Grid.Col>
				</Grid>
			</Paper>
		</div>
	);
};

export default Donate;

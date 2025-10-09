"use client";

import { useState } from "react";
import {
	Button,
	TextInput,
	Textarea,
	Checkbox,
	Alert,
	Text,
	Paper,
	Grid,
	Group,
	Stack,
	Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Heart, Shield, Info, IndianRupee } from "lucide-react";
import {
	onCampaignDonateButtonClick,
	RazorpayScript,
} from "@/components/donate";
import toast from "react-hot-toast";

interface DonationFormData {
	name: string;
	email: string;
	contact_number: string;
	pan_number?: string;
	address?: string;
	notes?: string;
	is_anonymous: boolean;
	tax_exemption: boolean;
	auto_allocate: boolean;
}

interface Props {
	selectedAmount: number;
	campaignId: string;
	selectedProducts: Record<string, number>;
	productsAvailable: boolean;
}

export default function CampaignForm(props: Props) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<DonationFormData>({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			pan_number: "",
			address: "",
			notes: "",
			is_anonymous: false,
			tax_exemption: false,
			auto_allocate:
				props.productsAvailable &&
				Object.keys(props.selectedProducts).length === 0,
		},
		validate: {
			name: (value) =>
				value.length < 2 ? "Name must be at least 2 characters" : null,
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : "Invalid email",
			contact_number: (value) =>
				/^\d{10}$/.test(value)
					? null
					: "Phone number must be exactly 10 digits",
			pan_number: (value, values) => {
				if (!values.tax_exemption) return null;
				return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value!)
					? null
					: "Invalid PAN number format";
			},
			address: (value, values) => {
				if (!values.tax_exemption) return null;
				return value!.length < 10
					? "Please provide your complete address"
					: null;
			},
		},
	});

	const handleDonation = async (values: DonationFormData) => {
		setIsLoading(true);
		try {
			await onCampaignDonateButtonClick({
				userInfo: {
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					pan_number: values.pan_number || undefined,
					address: values.address || undefined,
					notes: values.notes || undefined,
				},
				is_anon: values.is_anonymous,
				campaign_details: {
					amount: props.selectedAmount,
					campaign_id: props.campaignId,
					products: props.selectedProducts,
					auto_allocate: values.auto_allocate,
				},
			});
		} catch (error) {
			console.error("Donation error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to process donation. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Paper
			shadow="xl"
			radius="xl"
			p={{ base: "md", sm: "xl" }}
			className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl"
		>
			<RazorpayScript />
			<form onSubmit={form.onSubmit(handleDonation)}>
				<Stack gap="xl">
					{/* Personal Information */}
					<Grid>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label="Full Name"
								placeholder="Enter your full name"
								required
								size="md"
								{...form.getInputProps("name")}
								key={form.key("name")}
								styles={{
									input: { height: "48px" },
									label: {
										fontWeight: 500,
										color: "var(--mantine-color-gray-7)",
									},
								}}
							/>
						</Grid.Col>
						<Grid.Col span={{ base: 12, md: 6 }}>
							<TextInput
								label="Email Address"
								placeholder="your.email@example.com"
								required
								size="md"
								{...form.getInputProps("email")}
								key={form.key("email")}
								styles={{
									input: { height: "48px" },
									label: {
										fontWeight: 500,
										color: "var(--mantine-color-gray-7)",
									},
								}}
							/>
						</Grid.Col>
					</Grid>

					<Stack>
						{/* <Grid.Col span={{ base: 12, md: 6 }}> */}
						<TextInput
							label="Phone Number"
							placeholder="10-digit mobile number"
							required
							size="md"
							{...form.getInputProps("contact_number")}
							key={form.key("contact_number")}
							styles={{
								input: { height: "48px" },
								label: {
									fontWeight: 500,
									color: "var(--mantine-color-gray-7)",
								},
							}}
						/>
						{/* </Grid.Col> */}
						{/* <Grid.Col span={{ base: 12, md: 6 }}> */}
						<Textarea
							label="Additional Notes (Optional)"
							placeholder="Any special instructions or messages"
							minRows={2}
							size="md"
							{...form.getInputProps("notes")}
							key={form.key("notes")}
							styles={{
								label: {
									fontWeight: 500,
									color: "var(--mantine-color-gray-7)",
								},
							}}
						/>
						{/* </Grid.Col> */}
					</Stack>

					{/* Checkboxes */}
					<Stack gap="md">
						<Checkbox
							label="Make this donation anonymous"
							size="md"
							{...form.getInputProps("is_anonymous", {
								type: "checkbox",
							})}
							key={form.key("is_anonymous")}
							styles={{
								label: {
									fontWeight: 500,
									color: "var(--mantine-color-gray-7)",
								},
							}}
						/>
						<Checkbox
							label="I want tax exemption for this donation"
							size="md"
							{...form.getInputProps("tax_exemption", {
								type: "checkbox",
							})}
							key={form.key("tax_exemption")}
							styles={{
								label: {
									fontWeight: 500,
									color: "var(--mantine-color-gray-7)",
								},
							}}
						/>
						{props.productsAvailable &&
							Object.keys(props.selectedProducts).length ===
								0 && (
								<Checkbox
									label="We noticed you haven't selected any products. Shall we automatically allocate your donation to the most needed items?"
									size="md"
									{...form.getInputProps("auto_allocate", {
										type: "checkbox",
									})}
									key={form.key("auto_allocate")}
									styles={{
										label: {
											fontWeight: 500,
											color: "var(--mantine-color-gray-7)",
										},
									}}
								/>
							)}
					</Stack>

					{/* Tax Exemption Fields */}
					{form.values.tax_exemption && (
						<Paper
							p="md"
							radius="md"
							style={{
								backgroundColor: "#eff6ff",
								border: "1px solid #bfdbfe",
							}}
						>
							<Grid>
								<Grid.Col span={{ base: 12, md: 6 }}>
									<TextInput
										label="PAN Number"
										placeholder="ABCDE1234F"
										required
										size="md"
										{...form.getInputProps("pan_number")}
										key={form.key("pan_number")}
										styles={{
											input: {
												height: "48px",
											},
											label: {
												fontWeight: 500,
												color: "var(--mantine-color-gray-7)",
											},
										}}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, md: 6 }}>
									<Textarea
										label="Complete Address"
										placeholder="Enter your complete address"
										minRows={2}
										required
										size="md"
										{...form.getInputProps("address")}
										key={form.key("address")}
										styles={{
											label: {
												fontWeight: 500,
												color: "var(--mantine-color-gray-7)",
											},
										}}
									/>
								</Grid.Col>
							</Grid>
						</Paper>
					)}

					{/* Alerts */}
					<Stack gap="md">
						<Alert
							icon={<Shield size={16} />}
							color="green"
							radius="md"
							styles={{
								root: {
									backgroundColor: "#f0fdf4",
									border: "1px solid #bbf7d0",
								},
							}}
						>
							<Text size="sm" c="green.8">
								<Text component="span" fw={600}>
									Tax Exemption:
								</Text>{" "}
								Provide your PAN number and complete address to
								receive tax exemption benefits under Section 80G
								of the Income Tax Act.
							</Text>
						</Alert>

						<Alert
							icon={<Info size={16} />}
							color="blue"
							radius="md"
							styles={{
								root: {
									backgroundColor: "#eff6ff",
									border: "1px solid #bfdbfe",
								},
							}}
						>
							<Text size="sm" c="blue.8">
								<Text component="span" fw={600}>
									Secure Payment:
								</Text>{" "}
								Your donation will be processed securely through
								Razorpay. You can pay using UPI, cards, net
								banking, or digital wallets.
							</Text>
						</Alert>
					</Stack>

					{/* Submit Button */}
					<Center pt="md">
						<Button
							type="submit"
							size="xl"
							loading={isLoading}
							leftSection={<Heart size={20} />}
							className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-full px-12 py-4 text-base font-semibold transition-transform duration-300 ease-in-out hover:scale-105 hover:from-sky-700 hover:to-sky-900"
						>
							<Group gap={4}>
								<Text>Donate</Text>
								<Group gap={2}>
									<IndianRupee size={16} />
									<Text>
										{props.selectedAmount.toLocaleString(
											"en-IN",
										)}
									</Text>
								</Group>
							</Group>
						</Button>
					</Center>
				</Stack>
			</form>

			<Alert
				icon={<Info size={16} />}
				color="gray"
				radius="md"
				mt="xl"
				styles={{
					root: {
						backgroundColor: "#f9fafb",
						border: "1px solid #e5e7eb",
					},
				}}
			>
				<Text size="sm" c="gray.7" ta="center">
					<Text component="span" fw={600}>
						Note:
					</Text>{" "}
					After completing your donation, you&apos;ll be redirected to
					a unique receipt page. You can download it immediately or
					access it anytime later via its shareable link.
				</Text>
			</Alert>
		</Paper>
	);
}

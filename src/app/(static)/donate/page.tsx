"use client";

import { useState } from "react";
import {
	Button,
	TextInput,
	NumberInput,
	Textarea,
	Checkbox,
	Alert,
	Text,
	Title,
	Container,
	Paper,
	Grid,
	Group,
	Stack,
	Box,
	Card,
	SimpleGrid,
	Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
	Heart,
	Shield,
	Info,
	IndianRupee,
	Users,
	GraduationCap,
	Stethoscope,
} from "lucide-react";
import { onDonateButtonClick, RazorpayScript } from "@/components/donate";
import OtherDonationModes from "@/components/donate/other-donation-modes";
import toast from "react-hot-toast";
import FAQ from "@/components/faq";
import { donationFaqs } from "@/config/faqs";

interface DonationFormData {
	name: string;
	email: string;
	contact_number: string;
	amount: number;
	pan_number?: string;
	address?: string;
	notes?: string;
	is_anonymous: boolean;
	tax_exemption: boolean;
}

const PRESET_AMOUNTS = [100, 500, 1000, 2000, 5000];

export default function DonatePage() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedAmount, setSelectedAmount] = useState<number | "custom">(
		500,
	);
	const [customAmount, setCustomAmount] = useState<number | undefined>(
		undefined,
	);

	const form = useForm<DonationFormData>({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			amount: 500,
			pan_number: "",
			address: "",
			notes: "",
			is_anonymous: false,
			tax_exemption: false,
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
			amount: (value) =>
				value < 1 ? "Amount must be at least 1 rupee" : null,
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

	const handleAmountSelect = (amount: number | "custom") => {
		setSelectedAmount(amount);
		if (amount !== "custom") {
			form.setFieldValue("amount", amount as number);
			setCustomAmount(undefined);
		} else {
			if (customAmount) {
				form.setFieldValue("amount", customAmount);
			}
		}
	};

	const handleCustomAmountChange = (value: number | string) => {
		const numValue = typeof value === "string" ? parseFloat(value) : value;
		setCustomAmount(numValue);
		if (!isNaN(numValue) && numValue > 0) {
			form.setFieldValue("amount", numValue);
		}
	};

	const handleDonation = async (values: DonationFormData) => {
		setIsLoading(true);
		try {
			await onDonateButtonClick({
				userInfo: {
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					pan_number: values.pan_number || undefined,
					address: values.address || undefined,
					notes: values.notes || undefined,
				},
				is_anon: values.is_anonymous,
				donation_details: {
					amount: values.amount,
				},
			});

			toast.success(
				"Thank you for your donation! You will receive a receipt shortly.",
			);
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
		<Box
			style={{
				minHeight: "100vh",
				background:
					"linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #dcfce7 100%)",
			}}
		>
			<RazorpayScript />
			<Container size="lg" py={{ base: "md", sm: "xl" }}>
				{/* Header */}
				<Stack align="center" mb={{ base: "lg", sm: 40 }}>
					<Title
						order={1}
						size="h1"
						ta="center"
						fw={700}
						c="gray.9"
						mb="sm"
						style={{ fontSize: "2.25rem" }}
					>
						Make a Difference Today
					</Title>
					<Text
						size="h2"
						c="gray.6"
						ta="center"
						maw={600}
						style={{ fontSize: "1.25rem" }}
					>
						Your donation helps us provide food, education,
						healthcare, and hope to those who need it most.
					</Text>
				</Stack>

				{/* Main Form Card */}
				<Paper
					shadow="xl"
					radius="xl"
					p={{ base: "md", sm: "xl" }}
					className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl"
				>
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

							<Grid>
								<Grid.Col span={{ base: 12, md: 6 }}>
									<TextInput
										label="Phone Number"
										placeholder="10-digit mobile number"
										required
										size="md"
										{...form.getInputProps(
											"contact_number",
										)}
										key={form.key("contact_number")}
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
								</Grid.Col>
							</Grid>

							{/* Amount Selection - Moved here after phone number row */}
							<Box>
								<Text size="md" fw={500} c="gray.7" mb="md">
									Select Donation Amount
								</Text>
								<SimpleGrid
									cols={{ base: 2, sm: 3, lg: 6 }}
									spacing="sm"
									mb="md"
								>
									{PRESET_AMOUNTS.map((amount) => (
										<Button
											key={amount}
											variant={
												selectedAmount === amount
													? "filled"
													: "outline"
											}
											color={
												selectedAmount === amount
													? "blue"
													: "gray"
											}
											size="md"
											h={48}
											style={{
												transition: "all 0.2s ease",
												transform:
													selectedAmount === amount
														? "scale(1.02)"
														: "scale(1)",
											}}
											onClick={() =>
												handleAmountSelect(amount)
											}
											leftSection={
												<IndianRupee size={16} />
											}
										>
											{amount.toLocaleString()}
										</Button>
									))}
									<Button
										variant={
											selectedAmount === "custom"
												? "filled"
												: "outline"
										}
										color={
											selectedAmount === "custom"
												? "blue"
												: "gray"
										}
										size="md"
										h={48}
										style={{
											transition: "all 0.2s ease",
											transform:
												selectedAmount === "custom"
													? "scale(1.02)"
													: "scale(1)",
										}}
										onClick={() =>
											handleAmountSelect("custom")
										}
									>
										Other
									</Button>
								</SimpleGrid>

								{/* Custom Amount Input */}
								{selectedAmount === "custom" && (
									<Box mt="md">
										<Text
											size="sm"
											fw={500}
											c="gray.7"
											mb="xs"
										>
											Custom Donation Amount
										</Text>
										<NumberInput
											placeholder="Enter amount"
											value={customAmount}
											onChange={handleCustomAmountChange}
											min={1}
											size="md"
											leftSection={
												<IndianRupee size={16} />
											}
											styles={{
												input: {
													fontSize: "18px",
													height: "48px",
												},
											}}
										/>
									</Box>
								)}
							</Box>

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
												{...form.getInputProps(
													"pan_number",
												)}
												key={form.key("pan_number")}
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
											<Textarea
												label="Complete Address"
												placeholder="Enter your complete address"
												minRows={2}
												required
												size="md"
												{...form.getInputProps(
													"address",
												)}
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
										Provide your PAN number and complete
										address to receive tax exemption
										benefits under Section 80G of the Income
										Tax Act.
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
										Your donation will be processed securely
										through Razorpay. You can pay using UPI,
										cards, net banking, or digital wallets.
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
									className="
					bg-gradient-to-br from-blue-600 to-blue-800
					rounded-full
					px-12 py-4
					text-base font-semibold
					transition-transform duration-300 ease-in-out
					hover:scale-105
					hover:from-blue-700 hover:to-blue-900
				"
								>
									<Group gap={4}>
										<Text>Donate</Text>
										<Group gap={2}>
											<IndianRupee size={16} />
											<Text>
												{form.values.amount.toLocaleString()}
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
							After completing your donation, you&apos;ll be
							redirected to a unique receipt page. You can
							download it immediately or access it anytime later
							via its shareable link.
						</Text>
					</Alert>
				</Paper>
				<OtherDonationModes />

				{/* Impact Section */}
				<Box mt={{ base: "xl", sm: 60 }}>
					<Title
						order={3}
						size="h2"
						ta="center"
						mb={{ base: "lg", sm: 40 }}
						c="gray.9"
						style={{ fontSize: "2rem" }}
					>
						Your Impact
					</Title>
					<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dbeafe",
										borderRadius: "50%",
									}}
								>
									<Users size={32} color="#2563eb" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#2563eb" />
									<Text size="xl" fw={700} c="blue.6">
										100
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides a nutritious meal to a child
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dcfce7",
										borderRadius: "50%",
									}}
								>
									<GraduationCap size={32} color="#16a34a" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#16a34a" />
									<Text size="xl" fw={700} c="green.6">
										500
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Supports a child&apos;s education for a week
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#f3e8ff",
										borderRadius: "50%",
									}}
								>
									<Stethoscope size={32} color="#9333ea" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#9333ea" />
									<Text size="xl" fw={700} c="violet.6">
										1000
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides healthcare for a family
								</Text>
							</Stack>
						</Card>
					</SimpleGrid>
				</Box>
			</Container>
			<FAQ items={donationFaqs} />
		</Box>
	);
}

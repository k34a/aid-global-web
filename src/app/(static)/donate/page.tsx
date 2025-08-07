"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import {
	TextInput,
	Button,
	Textarea,
	Alert,
	Text,
	NumberInput,
	Checkbox,
} from "@mantine/core";
import { Heart, Shield, Info, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import { onDonateButtonClick, RazorpayScript } from "@/components/donate";
import OtherDonationModes from "@/components/donate/other-donation-modes";
import OneHundredClubs from "@/components/donate/one-hundred-clubs";

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

export default function DonatePage() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<DonationFormData>({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			amount: 100,
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
		<main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
			<RazorpayScript />
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
						Make a Difference Today
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Your donation helps us provide food, education,
						healthcare, and hope to those who need it most.
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
					<form
						onSubmit={form.onSubmit(handleDonation)}
						className="space-y-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<TextInput
								label="Full Name"
								placeholder="Enter your full name"
								required
								{...form.getInputProps("name")}
								key={form.key("name")}
								error={form.errors.name}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>
							<TextInput
								label="Email Address"
								placeholder="your.email@example.com"
								required
								{...form.getInputProps("email")}
								key={form.key("email")}
								error={form.errors.email}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<TextInput
								label="Phone Number"
								placeholder="10-digit mobile number"
								required
								{...form.getInputProps("contact_number")}
								key={form.key("contact_number")}
								error={form.errors.contact_number}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>

							<NumberInput
								label="Donation Amount"
								placeholder="Enter amount"
								required
								min={1}
								{...form.getInputProps("amount")}
								key={form.key("amount")}
								error={form.errors.amount}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
							<Textarea
								label="Additional Notes (Optional)"
								placeholder="Any special instructions or messages"
								minRows={2}
								{...form.getInputProps("notes")}
								key={form.key("notes")}
								error={form.errors.notes}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>
							<Checkbox
								label="Make this donation anonymous"
								{...form.getInputProps("is_anonymous", {
									type: "checkbox",
								})}
								key={form.key("is_anonymous")}
								error={form.errors.is_anonymous}
								styles={{
									root: {
										marginTop: "1.5rem",
									},
								}}
							/>
						</div>

						<Checkbox
							label="I want tax exemption for this donation"
							{...form.getInputProps("tax_exemption", {
								type: "checkbox",
							})}
							key={form.key("tax_exemption")}
							error={form.errors.tax_exemption}
						/>

						{form.values.tax_exemption && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
								<TextInput
									label="PAN Number"
									placeholder="ABCDE1234F"
									required
									{...form.getInputProps("pan_number")}
									key={form.key("pan_number")}
									error={form.errors.pan_number}
									styles={{
										input: {
											borderRadius: "0.75rem",
											border: "1px solid #d1d5db",
										},
									}}
								/>
								<Textarea
									label="Complete Address"
									placeholder="Enter your complete address"
									minRows={3}
									required
									{...form.getInputProps("address")}
									key={form.key("address")}
									error={form.errors.address}
									styles={{
										input: {
											borderRadius: "0.75rem",
											border: "1px solid #d1d5db",
										},
									}}
								/>
							</div>
						)}

						<Alert
							icon={<Shield size={16} />}
							color="green"
							className="rounded-lg"
						>
							<Text size="sm">
								<strong>Tax Exemption:</strong> Provide your PAN
								number and complete address to receive tax
								exemption benefits under Section 80G of the
								Income Tax Act.
							</Text>
						</Alert>

						<Alert
							icon={<Info size={16} />}
							color="blue"
							className="rounded-lg"
						>
							<Text size="sm">
								<strong>Secure Payment:</strong> Your donation
								will be processed securely through Razorpay. You
								can pay using UPI, cards, net banking, or
								digital wallets.
							</Text>
						</Alert>

						<div className="text-center">
							<Button
								type="submit"
								size="lg"
								loading={isLoading}
								className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
								leftSection={<Heart size={24} />}
							>
								<span className="inline-flex items-center gap-1">
									Donate <IndianRupee className="w-5 h-5" />
									{form.values.amount}
								</span>
							</Button>
						</div>
					</form>
					<Alert
						icon={<Info size={16} />}
						color="gray"
						className="rounded-lg mt-6 text-center"
					>
						<Text size="sm">
							<strong>Note:</strong> After completing your
							donation, you&apos;ll be redirected to a unique
							receipt page. You can download it immediately or
							access it anytime later via its shareable link.
						</Text>
					</Alert>
				</div>
			</div>
			<OtherDonationModes />

			{/* Impact Section */}
			<div className="max-w-6xl mx-auto py-16 text-center px-4">
				<h3 className="text-2xl font-bold text-gray-900 mb-10">
					Your Impact
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<div className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-1 mb-2">
							<IndianRupee className="w-5 h-5" />
							100
						</div>
						<p className="text-gray-600">
							Provides a nutritious meal to a child
						</p>
					</div>
					<div>
						<div className="text-3xl font-bold text-green-600 flex items-center justify-center gap-1 mb-2">
							<IndianRupee className="w-5 h-5" />
							500
						</div>
						<p className="text-gray-600">
							Supports a child&apos;s education for a week
						</p>
					</div>
					<div>
						<div className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-1 mb-2">
							<IndianRupee className="w-5 h-5" />
							1000
						</div>
						<p className="text-gray-600">
							Provides healthcare for a family
						</p>
					</div>
				</div>
			</div>
			<OneHundredClubs />
		</main>
	);
}

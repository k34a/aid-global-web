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
	Stack,
} from "@mantine/core";
import { Heart, Shield, Info, IndianRupee } from "lucide-react";
import { ngoDetails } from "@/config/config";
import toast from "react-hot-toast";
import { onDonateButtonClick, RazorpayScript } from "@/components/donate";

interface DonationFormData {
	name: string;
	email: string;
	contact_number: string;
	amount: number;
	pan_number?: string;
	address?: string;
	notes?: string;
	is_anonymous: boolean;
}

export default function DonatePage() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<DonationFormData>({
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			amount: 100,
			pan_number: "",
			address: "",
			notes: "",
			is_anonymous: false,
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
			pan_number: (value) => {
				if (!value) return null; // Optional field
				return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value)
					? null
					: "Invalid PAN number format";
			},
			address: (value) => {
				if (!value) return null; // Optional field
				return value.length < 10
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
						healthcare, and hope to those who need it most. Every
						contribution, no matter how small, creates a lasting
						impact.
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
								label="PAN Number (Optional - for tax exemption)"
								placeholder="ABCDE1234F"
								{...form.getInputProps("pan_number")}
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
								styles={{
									root: {
										marginTop: "1.5rem",
									},
								}}
							/>
						</div>

						<Textarea
							label="Complete Address (Optional - for tax exemption)"
							placeholder="Enter your complete address"
							minRows={3}
							{...form.getInputProps("address")}
							styles={{
								input: {
									borderRadius: "0.75rem",
									border: "1px solid #d1d5db",
								},
							}}
						/>

						<Textarea
							label="Additional Notes (Optional)"
							placeholder="Any special instructions or messages"
							minRows={2}
							{...form.getInputProps("notes")}
							styles={{
								input: {
									borderRadius: "0.75rem",
									border: "1px solid #d1d5db",
								},
							}}
						/>

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
				</div>

				<div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
					<h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
						Alternative Payment Methods
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="text-center">
							<h4 className="font-semibold text-gray-900 mb-4">
								UPI Payment
							</h4>
							<div className="bg-gray-100 rounded-lg p-4">
								<p className="font-mono text-lg font-bold text-gray-800">
									aidglobalfoundation@upi
								</p>
							</div>
						</div>
						<div className="text-center">
							<h4 className="font-semibold text-gray-900 mb-4">
								Bank Transfer
							</h4>
							<div className="bg-gray-100 rounded-lg p-4 text-sm">
								<p>
									<strong>Account Name:</strong> Aid Global
									Foundation
								</p>
								<p>
									<strong>Account Number:</strong> [Account
									Number]
								</p>
								<p>
									<strong>IFSC Code:</strong> [IFSC Code]
								</p>
								<p>
									<strong>Bank:</strong> [Bank Name]
								</p>
							</div>
						</div>
					</div>
					<div className="mt-6 text-center">
						<p className="text-sm text-gray-500">
							<strong>Contact:</strong> +91-96077-53148 |{" "}
							{ngoDetails.contact.email}
						</p>
						<p className="text-xs text-orange-600 mt-2">
							<strong>Note:</strong> For donations via UPI, QR
							code, or bank transfer, please email us at{" "}
							{ngoDetails.contact.email} to receive your donation
							receipt.
						</p>
					</div>
				</div>

				{/* Impact Section */}
				<div className="mt-12 text-center">
					<h3 className="text-2xl font-bold text-gray-900 mb-6">
						Your Impact
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-1">
							<IndianRupee className="w-5 h-5" />
							100
						</div>
						<p className="text-gray-600">
							Provides a nutritious meal to a child
						</p>

						<div className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center gap-1">
							<IndianRupee className="w-5 h-5" />
							500
						</div>
						<p className="text-gray-600">
							Supports a child&rsquo;s education for a week
						</p>

						<div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-1">
							<IndianRupee className="w-5 h-5" />
							1000
						</div>
						<p className="text-gray-600">
							Provides healthcare for a family
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

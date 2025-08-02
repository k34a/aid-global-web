"use client";

import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
	TextInput,
	Button,
	Select,
	Modal,
	Text,
	Group,
	Stack,
	Alert,
	Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IndianRupee, Check, Heart, Mail, Shield, Info } from "lucide-react";
import { ngoDetails } from "@/config/config";
import { DEFAULT_CAMPAIGN } from "@/config/data";
import toast from "react-hot-toast";

// Helper function to safely format date
const formatDate = (date: Date | string | null): string => {
	if (!date) return "Not provided";

	if (typeof date === "string") {
		return date.split("T")[0]; // If it's already a string, just get the date part
	}

	if (date instanceof Date) {
		return date.toISOString().split("T")[0];
	}

	return "Invalid date";
};

interface RecurringDonationFormData {
	name: string;
	email: string;
	contact_number: string;
	date_of_birth: Date | null;
	email_notifications: boolean;
}

export default function RecurringDonationForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

	// Load Razorpay script
	useEffect(() => {
		const loadRazorpay = () => {
			return new Promise((resolve, reject) => {
				if ((window as any).Razorpay) {
					setIsRazorpayLoaded(true);
					resolve((window as any).Razorpay);
					return;
				}

				const script = document.createElement("script");
				script.src = "https://checkout.razorpay.com/v1/checkout.js";
				script.onload = () => {
					setIsRazorpayLoaded(true);
					resolve((window as any).Razorpay);
				};
				script.onerror = () => {
					reject(new Error("Failed to load Razorpay"));
				};
				document.body.appendChild(script);
			});
		};

		loadRazorpay().catch((error) => {
			console.error("Error loading Razorpay:", error);
			toast.error("Failed to load payment gateway");
		});
	}, []);

	const form = useForm<RecurringDonationFormData>({
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			date_of_birth: null,
			email_notifications: true,
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
			date_of_birth: (value) =>
				value ? null : "Date of birth is required",
		},
	});

	const handleRecurringDonation = async (
		values: RecurringDonationFormData,
	) => {
		setIsLoading(true);
		try {
			// Check if Razorpay is loaded
			if (!(window as any).Razorpay) {
				throw new Error(
					"Payment gateway not loaded. Please refresh the page and try again.",
				);
			}

			// Create recurring donation using existing API
			const response = await fetch("/api/create-order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					amount: 100,
					campaign_id: DEFAULT_CAMPAIGN,
					is_anon: false,
					auto_allocate: true,
					notes: `100 Club Recurring Donation - DOB: ${formatDate(values.date_of_birth)}, Email Notifications: ${values.email_notifications}, Type: Recurring Monthly`,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Failed to create recurring donation",
				);
			}

			// Initialize Razorpay with order for recurring payment
			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: 100 * 100, // Amount in paise
				currency: "INR",
				name: ngoDetails.name,
				description: "100 Club Monthly Recurring Donation",
				image: ngoDetails.logo,
				order_id: data.order_id,
				prefill: {
					name: values.name,
					email: values.email,
					contact: values.contact_number,
				},
				theme: {
					color: "#3B82F6",
				},
				handler: function (response: any) {
					// Show success message for recurring donation
					toast.success(
						"Recurring donation setup successful! You'll be charged Rs. 100 monthly.",
					);
					// Redirect to receipt page
					window.location.href = `/donation/${data.donation_intent_id}`;
				},
				modal: {
					ondismiss: function () {
						toast.error(
							"Recurring donation setup cancelled. Please try again.",
						);
					},
				},
			};

			const rzp = new (window as any).Razorpay(options);
			rzp.open();
		} catch (error) {
			console.error("Recurring donation error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to create recurring donation. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section id="recurring-donation-form" className="py-20 bg-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
						Ready to Make an Impact?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Join the{" "}
						<span className="inline-flex items-center gap-1">
							<IndianRupee className="w-5 h-5" />
							100 Club
						</span>{" "}
						today and become part of a nationwide giving movement
						that transforms lives, one month at a time.
					</p>
				</div>

				{/* Recurring Donation Form */}
				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
					<form
						onSubmit={form.onSubmit(handleRecurringDonation)}
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
							<DateInput
								label="Date of Birth"
								placeholder="Select your date of birth"
								required
								{...form.getInputProps("date_of_birth")}
								styles={{
									input: {
										borderRadius: "0.75rem",
										border: "1px solid #d1d5db",
									},
								}}
							/>
						</div>

						<Checkbox
							label="Receive email notifications about our impact and updates"
							{...form.getInputProps("email_notifications", {
								type: "checkbox",
							})}
							styles={{
								root: {
									marginTop: "1rem",
								},
							}}
						/>

						{/* Recurring Payment Info */}
						<Alert
							icon={<Info size={16} />}
							color="blue"
							className="rounded-lg"
						>
							<Text size="sm">
								<strong>Recurring Payment Setup:</strong> This
								will set up a monthly recurring donation of Rs.
								100. Your payment method will be saved for
								automatic monthly charges. You can cancel
								anytime by contacting us.
							</Text>
						</Alert>

						{/* What happens next */}
						<Alert
							icon={<Check size={16} />}
							color="green"
							className="rounded-lg"
						>
							<Text size="sm">
								<strong>What happens next:</strong> After
								payment confirmation, your recurring donation
								will be activated. You&apos;ll be charged Rs.
								100 monthly and receive email confirmations for
								each payment. You can manage your recurring
								donations through your account.
							</Text>
						</Alert>

						<div className="text-center">
							<Button
								type="submit"
								size="lg"
								loading={isLoading || !isRazorpayLoaded}
								disabled={!isRazorpayLoaded}
								className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
								leftSection={<Heart size={20} />}
							>
								{!isRazorpayLoaded ? (
									"Loading Payment Gateway..."
								) : (
									<>
										Join The{" "}
										<span className="inline-flex items-center gap-1">
											<IndianRupee className="w-4 h-4" />
											100 Club
										</span>{" "}
										-{" "}
										<span className="inline-flex items-center gap-1">
											<IndianRupee className="w-4 h-4" />
											100/month
										</span>
									</>
								)}
							</Button>
						</div>
					</form>
				</div>

				{/* Payment Methods */}
				<div className="mt-8 text-center">
					<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
						<h4 className="font-semibold text-gray-900 mb-4">
							Payment Methods
						</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
							<div>
								<p className="font-medium">UPI Payment:</p>
								<p className="font-mono bg-gray-100 p-2 rounded mt-1">
									aidglobalfoundation@upi
								</p>
							</div>
							<div>
								<p className="font-medium">Other Methods:</p>
								<p>Card, Wallet, or Bank Transfer</p>
							</div>
						</div>
						<div className="mt-4 text-sm text-gray-500">
							<p>WhatsApp Support: +91-XXXXXXXXXX</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

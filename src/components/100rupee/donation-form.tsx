"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Textarea, Alert, Text } from "@mantine/core";
import { IndianRupee, Check, Heart, Info, Shield } from "lucide-react";
import { ngoDetails, STATIC_IMAGE_HOST } from "@/config/config";
import toast from "react-hot-toast";
import { onSubscriptionButtonClick, RazorpayScript } from "@/components/donate";
import Image from "@/components/image";

interface SubscriptionFormData {
	name: string;
	email: string;
	contact_number: string;
	pan_number?: string;
	address?: string;
}

export default function RecurringDonationForm() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SubscriptionFormData>({
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			pan_number: "",
			address: "",
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

			pan_number: (value) => {
				if (!value) return null;
				return /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/.test(value)
					? null
					: "Invalid PAN number format";
			},
			address: (value) => {
				if (!value) return null;
				return value.length < 10
					? "Please provide your complete address"
					: null;
			},
		},
	});

	const handleRecurringDonation = async (values: SubscriptionFormData) => {
		setIsLoading(true);
		try {
			const planId = "ac1ad332-5ce0-4fdc-a808-84dbc29f8701";
			await onSubscriptionButtonClick({
				userInfo: {
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					pan_number: values.pan_number || undefined,
					address: values.address || undefined,
				},
				is_anon: false,
				subscription_details: {
					plan_id: planId,
				},
			});

			toast.success(
				"100 Club subscription setup successful! You'll be charged Rs. 100 monthly.",
			);
		} catch (error) {
			console.error("Subscription error:", error);
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to setup subscription. Please try again.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section id="recurring-donation-form" className="py-20 bg-white">
			<RazorpayScript />
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
						Ready to Make an Impact?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Join the{" "}
						<span className="inline-flex items-baseline gap-1">
							<IndianRupee className="w-4 h-4 relative top-[1px] text-gray-600" />
							100 Club
						</span>{" "}
						today and become part of a nationwide giving movement
						that transforms lives, one month at a time.
					</p>
				</div>

				{/* Trust and Impact Image */}
				<div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
					<Image
						src={`${STATIC_IMAGE_HOST}home-page/aids/intro.webp`}
						alt="People making a difference together"
						width={800}
						height={300}
						className="w-full h-[250px] object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
					<div className="absolute bottom-6 left-6 right-6 text-white">
						<p className="text-xl font-semibold">
							Your contribution creates real change
						</p>
						<p className="text-sm opacity-90">
							Join thousands of members making a difference
						</p>
					</div>
				</div>

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
								<strong>Recurring Payment Setup:</strong> This
								will set up a monthly recurring donation of Rs.
								100. Your payment method will be saved for
								automatic monthly charges. You can cancel
								anytime by contacting us.
							</Text>
						</Alert>

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
								loading={isLoading}
								className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
								leftSection={<Heart size={20} />}
							>
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
							<p>WhatsApp Support: +91-96077-53148</p>
							<p className="mt-2 text-xs text-orange-600">
								<strong>Note:</strong> For donations via UPI, QR
								code, or bank transfer, please email us at{" "}
								{ngoDetails.contact.email} to receive your
								donation receipt.
							</p>
						</div>
					</div>
				</div>

				{/* Success Stories Preview */}
				<div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Success Stories from Our Members
						</h3>
						<p className="text-gray-600">
							See how your monthly contribution makes a real
							difference
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
									alt="Education impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;100 children received school supplies
									this month&quot;
								</p>
							</div>
						</div>
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}hunger-aid/intro.webp`}
									alt="Hunger relief impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;500 meals served to families in
									need&quot;
								</p>
							</div>
						</div>
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}home-page/aids/cure.webp`}
									alt="Healthcare impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;50 medical checkups completed this
									week&quot;
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

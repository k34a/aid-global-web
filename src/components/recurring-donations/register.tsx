"use client";

import React from "react";
import Image from "next/image";
import { Target, Gift, Lightbulb, BarChart3 } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Select, Textarea } from "@mantine/core";
import { STATIC_IMAGE_HOST } from "@/config/config";
import "@mantine/dates/styles.css";
import { onSubscriptionButtonClick, RazorpayScript } from "@/components/donate";

export default function Register() {
	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			mobile: "",
			countryCode: "+91",
			pan: "",
			address: "",
		},
		validate: {
			name: (value) =>
				value.trim().length < 2
					? "Name must be at least 2 characters"
					: null,
			email: (value) =>
				/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
			mobile: (value) =>
				/^\d{10}$/.test(value)
					? null
					: "Enter valid 10-digit mobile number",
			pan: (value) =>
				value && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())
					? "Invalid PAN format"
					: null,
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("in handle submit");
		if (!form.isValid()) {
			console.log("form validation failed");
			return;
		}
		console.log("Calling onSubscriptionButtonClick");
		try {
			await onSubscriptionButtonClick({
				userInfo: {
					name: form.values.name,
					email: form.values.email,
					contact_number: form.values.mobile,
					pan_number: form.values.pan || undefined,
					address: form.values.address || undefined,
					notes: "",
				},
				is_anon: false,
				subscription_details: {
					plan_id: "29c7e0b7-7edf-4db5-95e2-977793672cee",
				},
			});
		} catch (error) {
			console.error("Subscription failed:", error);
		}
	};

	const features = [
		{
			icon: <Target className="w-8 h-8 text-white" />,
			title: "7-Day Warrior",
			description: "One week of kindness",
			bgColor: "bg-blue-500",
		},
		{
			icon: <Gift className="w-8 h-8 text-white" />,
			title: "30-Day Hero",
			description: "One month of consistency",
			bgColor: "bg-[#FFD700]",
		},
		{
			icon: <Lightbulb className="w-8 h-8 text-white" />,
			title: "100-Day Champion",
			description: "100 days of impact",
			bgColor: "bg-blue-500",
		},
		{
			icon: <BarChart3 className="w-8 h-8 text-white" />,
			title: "365-Day Legend",
			description: "A full year of giving with heart",
			bgColor: "bg-[#FFD700]",
		},
	];

	return (
		<section className="py-16 px-6 lg:px-26 bg-gray-100">
			<RazorpayScript />
			<div className="container mx-auto max-w-7xl">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
						<span className="text-blue-500">Levels, Streaks </span>
						<span className="text-[#FFD700]">and</span>
						<span className="text-blue-500"> Badges</span>
					</h2>
					<h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#FFD700] mt-6">
						Make giving a habit and earn recognition for your
						compassion.
					</h3>
				</div>

				{/* Features + Image */}
				<div className="grid lg:grid-cols-3 gap-12 items-start">
					{/* Features */}
					<div className="lg:col-span-2">
						<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
							{features.map((feature, index) => (
								<div
									key={index}
									className="flex items-start space-x-4"
								>
									<div
										className={`${feature.bgColor} rounded-full p-3 flex-shrink-0`}
									>
										{feature.icon}
									</div>
									<div>
										<h3 className="text-blue-500 font-bold text-lg mb-1">
											{feature.title}
										</h3>
										<p className="text-gray-600 text-md">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
						<h3 className="text-xl md:text-2xl font-semibold text-[#FFD700] text-center mt-12">
							Every streak shows your unwavering commitment to
							change.
						</h3>
					</div>

					<div className="w-full flex justify-center">
						<Image
							src={`${STATIC_IMAGE_HOST}donation/rewards.webp`}
							alt="user rewards"
							width={500}
							height={500}
							priority
							className="rounded-xl object-contain w-full max-w-sm"
						/>
					</div>
				</div>

				<div className="bg-[#FFD700] rounded-2xl p-8 shadow-md">
					<form
						onSubmit={handleSubmit}
						className="grid sm:grid-cols-1 md:grid-cols-2 gap-6"
					>
						{/* Name */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Full Name *
							</label>
							<TextInput
								withAsterisk
								placeholder="Enter your full name"
								{...form.getInputProps("name")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Email Address *
							</label>
							<TextInput
								withAsterisk
								type="email"
								placeholder="your.email@example.com"
								{...form.getInputProps("email")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Phone Number */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Phone Number *
							</label>
							<div className="flex gap-2">
								<Select
									data={[
										{ value: "+91", label: "IN +91" },
										{ value: "+1", label: "US +1" },
										{ value: "+44", label: "GB +44" },
									]}
									{...form.getInputProps("countryCode")}
									className="w-28"
									classNames={{
										input: "rounded-lg px-3 py-3 border-0",
									}}
								/>
								<TextInput
									type="tel"
									placeholder="10-digit mobile number"
									{...form.getInputProps("mobile")}
									className="flex-1"
									classNames={{
										input: "rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500",
									}}
								/>
							</div>
						</div>

						{/* PAN Number */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								PAN Number (Optional - for tax exemption)
							</label>
							<TextInput
								placeholder="ABCDE1234F"
								{...form.getInputProps("pan")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Address */}
						<div className="md:col-span-2">
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Complete Address (Optional - for tax exemption)
							</label>
							<Textarea
								autosize
								minRows={2}
								maxRows={4}
								placeholder="Enter your complete address"
								{...form.getInputProps("address")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Notes */}
						<div className="md:col-span-2">
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Notes (Optional)
							</label>
							<Textarea
								autosize
								minRows={2}
								maxRows={4}
								placeholder="Add any specific instructions or comments"
								onChange={(e) => {
									form.setFieldValue(
										"notes",
										e.currentTarget.value,
									);
								}}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Info blocks */}
						<div className="md:col-span-2 space-y-4 mt-2 text-sm text-gray-700">
							<div className="p-4 bg-green-50 rounded-md border-l-4 border-green-600">
								<strong className="text-green-800">
									Tax Exemption:
								</strong>{" "}
								Provide your PAN number and complete address to
								receive tax exemption benefits under Section 80G
								of the Income Tax Act.
							</div>
							<div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-600">
								<strong className="text-blue-800">
									Recurring Payment Setup:
								</strong>{" "}
								{
									"This will set up a weekly recurring donation of \u20B97. Your payment method will be saved for automatic weekly charges. You can cancel anytime by contacting us."
								}
							</div>
							<div className="p-4 bg-green-50 rounded-md border-l-4 border-green-600">
								<strong className="text-green-800">
									What happens next:
								</strong>{" "}
								{
									"After payment confirmation, your recurring donation will be activated. You'll be charged \u20B97 weekly and receive email confirmations for each payment. You can manage your recurring donations through your account."
								}
							</div>
						</div>

						{/* Submit */}
						<div className="md:col-span-2 flex justify-center mt-4">
							<Button
								type="submit"
								className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-[#1d4ed8] transition-colors duration-300 uppercase tracking-wide rounded-lg"
							>
								{"Join The \u20B9 1 Club \u2013 \u20B9 1/day"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

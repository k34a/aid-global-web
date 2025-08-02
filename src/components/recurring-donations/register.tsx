"use client";

import React from "react";
import Image from "next/image";
import { Target, Gift, Lightbulb, BarChart3 } from "lucide-react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Select } from "@mantine/core";
import { STATIC_IMAGE_HOST } from "@/config/config";
import { DateInput } from "@mantine/dates";
import "@mantine/dates/styles.css"; // Required for styling

export default function Register() {
	const form = useForm({
		initialValues: {
			name: "",
			email: "",
			mobile: "",
			dob: null,
			countryCode: "+91",
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
		},
	});

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

					{/* Image */}
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

				{/* Registration Form */}
				<div className="bg-[#FFD700] rounded-2xl p-8 shadow-md">
					<form className="grid sm:grid-cols-1 md:grid-cols-4 gap-6 items-end">
						{/* Name */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Name
							</label>
							<TextInput
								withAsterisk
								placeholder="Name"
								{...form.getInputProps("name")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Email
							</label>
							<TextInput
								withAsterisk
								type="email"
								placeholder="Email"
								{...form.getInputProps("email")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500",
								}}
							/>
						</div>

						{/* Mobile with Country Code */}
						{/* Mobile with Country Code */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Mobile No.
							</label>
							<div className="flex flex-col md:flex-row gap-2">
								<Select
									data={[
										{ value: "+91", label: "IN +91" },
										{ value: "+1", label: "US +1" },
										{ value: "+44", label: "GB +44" },
										{ value: "+61", label: "AU +61" },
									]}
									{...form.getInputProps("countryCode")}
									className="md:w-28 w-full"
									classNames={{
										input: "rounded-lg md:rounded-l-lg px-3 py-3 sm:px-1 sm:py-1 border-0",
									}}
								/>
								<TextInput
									type="tel"
									placeholder="9876543210"
									{...form.getInputProps("mobile")}
									className="flex-1"
									classNames={{
										input: "rounded-lg md:rounded-r-lg px-4 py-3 border-0 focus:ring-2 focus:ring-blue-500",
									}}
								/>
							</div>
						</div>
						{/* Date of Birth */}
						<div>
							<label className="block text-[#B8860B] text-sm font-medium mb-2 uppercase">
								Date of Birth
							</label>
							<DateInput
								placeholder="Select date"
								valueFormat="DD/MM/YYYY"
								maxDate={new Date()}
								{...form.getInputProps("dob")}
								classNames={{
									input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 w-full",
								}}
							/>
						</div>

						{/* Submit */}
						<div className="md:col-span-4 flex justify-center">
							<Button
								type="submit"
								className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-[#1d4ed8] transition-colors duration-300 uppercase tracking-wide"
							>
								Register
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

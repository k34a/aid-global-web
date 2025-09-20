"use client";

import React, { useState } from "react";

import { useForm } from "@mantine/form";
import { TextInput, Button, Textarea, Checkbox } from "@mantine/core";

import { onSubscriptionButtonClick, RazorpayScript } from "@/components/donate";

interface Props {
	plan_id: string;
	submitButton?: React.JSX.Element | string;
	footer?: React.JSX.Element;
}

interface FormValues {
	name: string;
	email: string;
	contact_number: string;
	pan_number: string;
	address: string;
	is_anon: boolean;
	notes: string;
}

export default function SubscriptionForm(props: Props) {
	const [taxExemption, setTaxExemption] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			email: "",
			contact_number: "",
			pan_number: "",
			address: "",
			is_anon: false,
			notes: "",
		},
		validate: {
			name: (value) =>
				value.trim().length < 5 ? "Please provide a valid name" : null,
			email: (value) =>
				/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
					? null
					: "Invalid email address",
			contact_number: (value) =>
				/^\d{10}$/.test(value) ? null : "Invalid mobile number",
			pan_number: (value) => {
				if (
					taxExemption &&
					!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value.toUpperCase())
				)
					return "Invalid PAN format";
			},
			address: (value) => {
				if (taxExemption && value.length < 10)
					return "Please provide your complete address";
			},
		},
	});

	const handleSubmit = async (values: FormValues) => {
		setLoading(true);
		try {
			await onSubscriptionButtonClick({
				userInfo: {
					name: values.name,
					email: values.email,
					contact_number: values.contact_number,
					pan_number:
						values.pan_number.length > 0
							? values.pan_number
							: undefined,
					address:
						values.address.length > 0 ? values.address : undefined,
					notes: values.notes,
				},
				is_anon: values.is_anon,
				subscription_details: {
					plan_id: props.plan_id,
				},
			});
		} catch (error) {
			console.error("Subscription failed:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<RazorpayScript />
			<form
				onSubmit={form.onSubmit(handleSubmit)}
				className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 items-center"
			>
				<TextInput
					withAsterisk
					label="Full Name"
					placeholder="Enter your full name"
					{...form.getInputProps("name")}
					classNames={{
						input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-sky-500",
					}}
				/>

				<TextInput
					withAsterisk
					label="Email Address"
					type="email"
					placeholder="your.email@example.com"
					{...form.getInputProps("email")}
					classNames={{
						input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-sky-500",
					}}
				/>

				<TextInput
					withAsterisk
					type="tel"
					label="Phone Number"
					required
					placeholder="10-digit mobile number"
					{...form.getInputProps("contact_number")}
					className="flex-1"
					classNames={{
						input: "rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-sky-500",
					}}
				/>

				<div className="flex items-center">
					<Checkbox
						label="I want to get tax exemption for my donation"
						checked={taxExemption}
						onChange={(e) =>
							setTaxExemption(e.currentTarget.checked)
						}
						styles={{
							label: { color: "#4B5563" },
							input: { borderColor: "#D1D5DB" },
						}}
					/>
				</div>

				{taxExemption && (
					<TextInput
						label="PAN Number"
						withAsterisk
						required
						placeholder="ABCDE1234F"
						{...form.getInputProps("pan_number")}
						classNames={{
							input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-sky-500",
						}}
					/>
				)}

				{taxExemption && (
					<Textarea
						label="Complete Address"
						required
						withAsterisk
						autosize
						minRows={2}
						maxRows={4}
						placeholder="Enter your complete address"
						{...form.getInputProps("address")}
						classNames={{
							input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-sky-500",
						}}
					/>
				)}

				<div className="md:col-span-2">
					<Textarea
						autosize
						label="Notes (Optional)"
						minRows={2}
						maxRows={4}
						placeholder="Add any specific instructions or comments"
						onChange={(e) => {
							form.setFieldValue("notes", e.currentTarget.value);
						}}
						classNames={{
							input: "px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-sky-500",
						}}
					/>
				</div>

				<div className="md:col-span-2 text-md">
					<Checkbox
						label="Donate Anonymously"
						{...form.getInputProps("is_anon", {
							type: "checkbox",
						})}
						styles={{
							label: { color: "#4B5563" },
							input: { borderColor: "#D1D5DB" },
						}}
					/>
				</div>

				{props.footer}

				{/* Submit */}
				<div className="md:col-span-2 flex justify-center mt-4">
					<Button
						disabled={loading}
						loading={loading}
						type="submit"
						className="bg-sky-500 text-white font-bold py-3 px-8 hover:bg-[#1d4ed8] transition-colors duration-300 uppercase tracking-wide rounded-lg"
					>
						{props.submitButton}
					</Button>
				</div>
			</form>
		</>
	);
}

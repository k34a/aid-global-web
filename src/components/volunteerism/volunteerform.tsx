"use client";

import { useState } from "react";
import {
	TextInput,
	Textarea,
	MultiSelect,
	Button,
	Container,
	Title,
	Text,
	Paper,
	Stack,
	Alert,
	Group,
	Divider,
	Box,
} from "@mantine/core";
import { AlertCircleIcon } from "lucide-react";
import toast from "react-hot-toast";
import VolunteerSuccess from "@/components/volunteerism/volunteersuccess";
import {
	volunteerSchema,
	type VolunteerData,
} from "@/lib/db/volunteers/schema";

const volunteerAreas = [
	"Education & Teaching",
	"Healthcare & Medical",
	"Community Outreach",
	"Fundraising & Events",
	"Administrative Support",
	"Social Media & Marketing",
	"Translation & Language Support",
	"Technical Support",
	"Childcare & Youth Programs",
	"Environmental Conservation",
	"Emergency Relief",
	"Research & Documentation",
];

const availabilityOptions = [
	"Weekdays (Morning)",
	"Weekdays (Afternoon)",
	"Weekdays (Evening)",
	"Weekends (Morning)",
	"Weekends (Afternoon)",
	"Weekends (Evening)",
	"Flexible Schedule",
	"Remote/Online",
	"Special Events Only",
];

const skillOptions = [
	"Teaching",
	"Nursing/Medical",
	"Counseling",
	"Event Planning",
	"Social Media",
	"Graphic Design",
	"Photography/Videography",
	"Translation",
	"Driving",
	"Cooking",
	"First Aid",
	"Computer Skills",
	"Leadership",
	"Communication",
	"Project Management",
];

export default function VolunteerForm() {
	const [formData, setFormData] = useState<VolunteerData>({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipcode: "",
		volunteer_areas: [],
		availability: [],
		skills: [],
		experience: "",
	});

	const [errors, setErrors] = useState<
		Partial<Record<keyof VolunteerData, string>>
	>({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const validateField = (field: keyof VolunteerData, value: any): string => {
		try {
			volunteerSchema.shape[field].parse(value);
			return "";
		} catch (err: any) {
			return err.errors?.[0]?.message || "Invalid";
		}
	};

	const validateForm = (): boolean => {
		const newErrors: typeof errors = {};
		for (const key in formData) {
			const field = key as keyof VolunteerData;
			const value = formData[field];
			const message = validateField(field, value);
			if (message) newErrors[field] = message;
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			toast.error("Please fix the errors before submitting.");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/volunteer", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setSuccess(true);
				toast.success("Thank you for your interest in volunteering!");
				setFormData({
					first_name: "",
					last_name: "",
					email: "",
					phone: "",
					address: "",
					city: "",
					state: "",
					zipcode: "",
					volunteer_areas: [],
					availability: [],
					skills: [],
					experience: "",
				});
				setErrors({});
			} else {
				toast.error(
					data.message || "Something went wrong. Please try again.",
				);
			}
		} catch {
			toast.error("Network error. Please check your connection.");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return <VolunteerSuccess onReset={() => setSuccess(false)} />;
	}

	return (
		<Paper shadow="md" p="xl" radius="md">
			<form onSubmit={handleSubmit}>
				<Stack gap="lg">
					<Box>
						<Title order={3} mb="md">
							Personal Information
						</Title>
						<Group grow>
							<TextInput
								label="First Name"
								placeholder="Enter your first name"
								required
								value={formData.first_name}
								onChange={(e) => {
									const val = e.target.value;
									setFormData({
										...formData,
										first_name: val,
									});
									setErrors({
										...errors,
										first_name: validateField(
											"first_name",
											val,
										),
									});
								}}
								error={errors.first_name}
							/>
							<TextInput
								label="Last Name"
								placeholder="Enter your last name"
								required
								value={formData.last_name}
								onChange={(e) => {
									const val = e.target.value;
									setFormData({
										...formData,
										last_name: val,
									});
									setErrors({
										...errors,
										last_name: validateField(
											"last_name",
											val,
										),
									});
								}}
								error={errors.last_name}
							/>
						</Group>
					</Box>

					<Group grow>
						<TextInput
							label="Email Address"
							type="email"
							required
							placeholder="you@example.com"
							value={formData.email}
							onChange={(e) => {
								const val = e.target.value;
								setFormData({ ...formData, email: val });
								setErrors({
									...errors,
									email: validateField("email", val),
								});
							}}
							error={errors.email}
						/>
						<TextInput
							label="Phone Number"
							required
							placeholder="Enter your phone number"
							value={formData.phone}
							onChange={(e) => {
								const val = e.target.value;
								setFormData({ ...formData, phone: val });
								setErrors({
									...errors,
									phone: validateField("phone", val),
								});
							}}
							error={errors.phone}
						/>
					</Group>

					<Box>
						<Title order={3} mb="md">
							Address Information
						</Title>
						<Textarea
							label="Full Address"
							required
							placeholder="Enter your complete address"
							value={formData.address}
							onChange={(e) => {
								const val = e.target.value;
								setFormData({ ...formData, address: val });
								setErrors({
									...errors,
									address: validateField("address", val),
								});
							}}
							error={errors.address}
						/>
						<Group grow mt="md">
							<TextInput
								label="City"
								required
								value={formData.city}
								onChange={(e) => {
									const val = e.target.value;
									setFormData({ ...formData, city: val });
									setErrors({
										...errors,
										city: validateField("city", val),
									});
								}}
								error={errors.city}
							/>
							<TextInput
								label="State"
								required
								value={formData.state}
								onChange={(e) => {
									const val = e.target.value;
									setFormData({ ...formData, state: val });
									setErrors({
										...errors,
										state: validateField("state", val),
									});
								}}
								error={errors.state}
							/>
							<TextInput
								label="ZIP Code"
								required
								value={formData.zipcode}
								onChange={(e) => {
									const val = e.target.value;
									setFormData({ ...formData, zipcode: val });
									setErrors({
										...errors,
										zipcode: validateField("zipcode", val),
									});
								}}
								error={errors.zipcode}
							/>
						</Group>
					</Box>

					<Divider />

					<Box>
						<Title order={3} mb="md">
							Volunteer Preferences
						</Title>
						<MultiSelect
							label="Areas of Interest"
							data={volunteerAreas}
							searchable
							required
							placeholder="Select areas"
							value={formData.volunteer_areas}
							onChange={(value) => {
								setFormData({
									...formData,
									volunteer_areas: value,
								});
								setErrors({
									...errors,
									volunteer_areas: validateField(
										"volunteer_areas",
										value,
									),
								});
							}}
							error={errors.volunteer_areas}
						/>
					</Box>

					<MultiSelect
						label="Availability"
						data={availabilityOptions}
						searchable
						required
						placeholder="Select available time slots"
						value={formData.availability}
						onChange={(value) => {
							setFormData({ ...formData, availability: value });
							setErrors({
								...errors,
								availability: validateField(
									"availability",
									value,
								),
							});
						}}
						error={errors.availability}
					/>

					<MultiSelect
						label="Skills & Expertise"
						data={skillOptions}
						searchable
						placeholder="Select your skills (optional)"
						value={formData.skills}
						onChange={(value) =>
							setFormData({ ...formData, skills: value })
						}
					/>

					<Textarea
						label="Previous Experience"
						placeholder="Tell us about past volunteering or relevant experience (optional)"
						minRows={3}
						value={formData.experience}
						onChange={(e) =>
							setFormData({
								...formData,
								experience: e.target.value,
							})
						}
					/>

					<Alert icon={<AlertCircleIcon size={18} />} color="blue">
						<Text size="sm">
							By submitting this form, you agree to our volunteer
							terms. We will get in touch within 2-3 working days.
						</Text>
					</Alert>

					<Button type="submit" size="lg" fullWidth loading={loading}>
						Submit Volunteer Application
					</Button>
				</Stack>
			</form>
		</Paper>
	);
}

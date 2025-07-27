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
import { useForm, zodResolver } from "@mantine/form";
import { submitVolunteer } from "@/app/volunteer/action";

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
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const form = useForm<VolunteerData>({
		initialValues: {
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
		},
		validate: zodResolver(volunteerSchema),
	});

	const handleSubmit = async (values: VolunteerData) => {
		setLoading(true);
		try {
			const result = await submitVolunteer(values);
			if (result.success) {
				setSuccess(true);
				toast.success("Thank you for your interest in volunteering!");
				form.reset();
			} else {
				if (result.errors) {
					form.setErrors(
						Object.fromEntries(
							result.errors.map((err: any) => [
								err.path[0],
								err.message,
							]),
						),
					);
				}
				toast.error(
					result.message || "Something went wrong. Please try again.",
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
			<form onSubmit={form.onSubmit(handleSubmit)}>
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
								{...form.getInputProps("first_name")}
							/>
							<TextInput
								label="Last Name"
								placeholder="Enter your last name"
								required
								{...form.getInputProps("last_name")}
							/>
						</Group>
					</Box>

					<Group grow>
						<TextInput
							label="Email Address"
							type="email"
							required
							placeholder="you@example.com"
							{...form.getInputProps("email")}
						/>
						<TextInput
							label="Phone Number"
							required
							placeholder="Enter your phone number"
							{...form.getInputProps("phone")}
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
							{...form.getInputProps("address")}
						/>
						<Group grow mt="md">
							<TextInput
								label="City"
								required
								{...form.getInputProps("city")}
							/>
							<TextInput
								label="State"
								required
								{...form.getInputProps("state")}
							/>
							<TextInput
								label="ZIP Code"
								required
								{...form.getInputProps("zipcode")}
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
							{...form.getInputProps("volunteer_areas")}
						/>
					</Box>

					<MultiSelect
						label="Availability"
						data={availabilityOptions}
						searchable
						required
						placeholder="Select available time slots"
						{...form.getInputProps("availability")}
					/>

					<MultiSelect
						label="Skills & Expertise"
						data={skillOptions}
						searchable
						placeholder="Select your skills (optional)"
						{...form.getInputProps("skills")}
					/>

					<Textarea
						label="Previous Experience"
						placeholder="Tell us about past volunteering or relevant experience (optional)"
						minRows={3}
						{...form.getInputProps("experience")}
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

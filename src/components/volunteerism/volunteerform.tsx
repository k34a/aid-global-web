"use client";

import { useState } from "react";
import {
	TextInput,
	Textarea,
	MultiSelect,
	Button,
	Container,
	Title,
	Paper,
	Stack,
	Divider,
	Grid,
	Box,
	Checkbox,
} from "@mantine/core";
import toast from "react-hot-toast";
import VolunteerSuccess from "@/components/volunteerism/volunteersuccess";
import {
	volunteerSchema,
	type VolunteerData,
} from "@/lib/db/volunteers/schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { submitVolunteer } from "@/app/(static)/volunteer/actions";

const volunteerAreas = [
	"Education & Teaching",
	"Healthcare & Medical",
	"Community Outreach",
	"Fundraising & Events",
	"Administrative Support",
	"Social Media & Marketing",
	"Graphics & Communication section",
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

	const form = useForm<VolunteerData & { agreeToTerms: boolean }>({
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
			agreeToTerms: false,
		},
		validate: (values) => {
			const base = zodResolver(volunteerSchema)(values);
			return {
				...base,
				agreeToTerms: values.agreeToTerms
					? null
					: "You must agree to the terms.",
			};
		},
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
		<Container size="sm" px="xs">
			<Paper shadow="md" radius="md" p={{ base: "md", sm: "xl" }}>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Stack gap="lg">
						<Box>
							<Title order={3} mb="md">
								Personal Information
							</Title>
							<Grid>
								<Grid.Col span={{ base: 12, sm: 6 }}>
									<TextInput
										label="First Name"
										placeholder="Enter your first name"
										required
										{...form.getInputProps("first_name")}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 6 }}>
									<TextInput
										label="Last Name"
										placeholder="Enter your last name"
										required
										{...form.getInputProps("last_name")}
									/>
								</Grid.Col>
							</Grid>
						</Box>

						<Grid>
							<Grid.Col span={{ base: 12, sm: 6 }}>
								<TextInput
									label="Email Address"
									type="email"
									required
									placeholder="you@example.com"
									{...form.getInputProps("email")}
								/>
							</Grid.Col>
							<Grid.Col span={{ base: 12, sm: 6 }}>
								<TextInput
									label="Phone Number"
									required
									placeholder="Enter your phone number"
									{...form.getInputProps("phone")}
								/>
							</Grid.Col>
						</Grid>

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
							<Grid mt="md">
								<Grid.Col span={{ base: 12, sm: 4 }}>
									<TextInput
										label="City"
										required
										{...form.getInputProps("city")}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 4 }}>
									<TextInput
										label="State"
										required
										{...form.getInputProps("state")}
									/>
								</Grid.Col>
								<Grid.Col span={{ base: 12, sm: 4 }}>
									<TextInput
										label="ZIP Code"
										required
										{...form.getInputProps("zipcode")}
									/>
								</Grid.Col>
							</Grid>
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

						<Checkbox
							label={
								<span>
									By submitting this form, you agree to our
									volunteer terms. We will get in touch within
									2-3 working days.
								</span>
							}
							checked={form.values.agreeToTerms}
							onChange={(event) =>
								form.setFieldValue(
									"agreeToTerms",
									event.currentTarget.checked,
								)
							}
							error={form.errors.agreeToTerms}
							mt="md"
						/>

						<Button
							type="submit"
							size="lg"
							fullWidth
							loading={loading}
							disabled={!form.values.agreeToTerms}
						>
							Submit Volunteer Application
						</Button>
					</Stack>
				</form>
			</Paper>
		</Container>
	);
}

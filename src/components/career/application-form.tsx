"use client";

import React, { useCallback, useState } from "react";
import {
	Stack,
	Divider,
	TextInput,
	Box,
	Text,
	Title,
	Button,
	Center,
	Group,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { File, Upload, X } from "lucide-react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { userInfoSchema } from "@/lib/schema/forms/career";
import { submitCareerApplication } from "@/lib/actions/forms/career";
import toast from "react-hot-toast";
import FormSubmitted from "./form-submitted";

const ALLOWED_MIME_TYPES: string[] = [
	MIME_TYPES.pdf,
	MIME_TYPES.doc,
	MIME_TYPES.docx,
];
const MAX_FILE_SIZE_MB = 5;

export default function CareerApplicationForm() {
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const applicationForm = useForm({
		mode: "uncontrolled",
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			contact: "",
			applyingFor: "",
		},
		validate: zodResolver(userInfoSchema),
	});

	const handleDrop = useCallback((files: File[]) => {
		if (files.length === 0) return;

		const file = files[0];

		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			toast.error("Unsupported file format. Upload a PDF or Word doc.");
			return;
		}

		if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB.`);
			return;
		}

		setCvFile(file);
		toast.success("CV uploaded successfully.");
	}, []);

	const handleSubmit = async (values: typeof applicationForm.values) => {
		setErrorMessage(null);

		if (!cvFile) {
			setErrorMessage("Please upload your CV.");
			return;
		}

		setLoading(true);

		try {
			const response = await submitCareerApplication({
				userInfo: values,
				resume: {
					fileName: cvFile.name,
					fileSize: cvFile.size,
					fileType: cvFile.type,
				},
			});

			if (!response.success) {
				setErrorMessage(response.message || "Submission failed.");
				return;
			}

			const { presignedUrl } = response;

			// Upload the file to Supabase using the signed URL
			const uploadRes = await fetch(presignedUrl, {
				method: "PUT",
				headers: {
					"Content-Type": cvFile.type,
				},
				body: cvFile,
			});

			if (!uploadRes.ok) {
				throw new Error("CV upload failed.");
			}

			applicationForm.reset();
			toast.success("Application submitted successfully!");
			setCvFile(null);
			setFormSubmitted(true);
		} catch (err) {
			const message =
				err instanceof Error
					? err.message
					: "An unexpected error occurred.";
			setErrorMessage(message);
			toast.error(message);
		} finally {
			setLoading(false);
		}
	};

	if (formSubmitted) {
		return <FormSubmitted />;
	}

	return (
		<Box
			px="xl"
			py="xl"
			className="mb-10 rounded-3xl mx-auto max-w-lg w-full sm:px-8 sm:py-10"
		>
			<Title className="text-center font-bold mb-1 text-sky-600 text-3xl sm:text-4xl lg:text-5xl">
				Join Our Team
			</Title>

			<Divider
				size="sm"
				w={100}
				my="md"
				color="gray"
				className="mx-auto mb-6"
			/>

			<form onSubmit={applicationForm.onSubmit(handleSubmit)}>
				<Stack className="space-y-6">
					<TextInput
						label="First Name"
						placeholder="Enter your first name"
						required
						size="md"
						radius="md"
						key={applicationForm.key("firstName")}
						error={applicationForm.errors.firstName}
						{...applicationForm.getInputProps("firstName")}
					/>

					<TextInput
						label="Last Name"
						placeholder="Enter your last name"
						required
						size="md"
						radius="md"
						key={applicationForm.key("lastName")}
						error={applicationForm.errors.lastName}
						{...applicationForm.getInputProps("lastName")}
					/>

					<TextInput
						label="Email"
						placeholder="Enter your email address"
						type="email"
						required
						size="md"
						radius="md"
						key={applicationForm.key("email")}
						error={applicationForm.errors.email}
						{...applicationForm.getInputProps("email")}
					/>

					<TextInput
						label="Contact Number"
						placeholder="Enter your contact number"
						type="tel"
						required
						size="md"
						radius="md"
						key={applicationForm.key("contact")}
						error={applicationForm.errors.contact}
						{...applicationForm.getInputProps("contact")}
					/>

					<TextInput
						label="Applying For"
						placeholder="Enter the role you're applying for"
						required
						size="md"
						radius="md"
						key={applicationForm.key("applyingFor")}
						error={applicationForm.errors.applyingFor}
						{...applicationForm.getInputProps("applyingFor")}
					/>

					<Box>
						<Text className="font-medium text-sm mb-2 text-gray-700">
							Upload your CV *
						</Text>

						<Dropzone
							multiple={false}
							onDrop={handleDrop}
							onReject={() =>
								toast.error(
									"File rejected. Please check format and size.",
								)
							}
							loading={loading}
							maxSize={MAX_FILE_SIZE_MB * 1024 ** 2}
							accept={ALLOWED_MIME_TYPES}
							radius="md"
							aria-label="Upload your CV"
						>
							<Group
								justify="center"
								gap="xl"
								mih={220}
								style={{ pointerEvents: "none" }}
							>
								<Dropzone.Accept>
									<Upload
										size={52}
										color="var(--mantine-color-blue-6)"
									/>
								</Dropzone.Accept>
								<Dropzone.Reject>
									<X
										size={52}
										color="var(--mantine-color-red-6)"
									/>
								</Dropzone.Reject>
								<Dropzone.Idle>
									<File
										size={52}
										color="var(--mantine-color-dimmed)"
									/>
								</Dropzone.Idle>

								<div>
									<Text size="xl" inline>
										Drag & drop your CV here or click to
										upload
									</Text>
									<Text size="sm" c="dimmed" inline mt={7}>
										Supported formats: PDF, DOC, DOCX - Max
										5MB
									</Text>
								</div>
							</Group>
						</Dropzone>

						{cvFile && (
							<div className="mt-4 text-sm text-green-600">
								Selected File: <strong>{cvFile.name}</strong>
							</div>
						)}
					</Box>

					{errorMessage && (
						<Text c="red" size="sm" ta="center">
							{errorMessage}
						</Text>
					)}

					<Center>
						<Button
							size="md"
							radius="md"
							color="blue"
							type="submit"
							loading={loading}
							disabled={loading}
							className="font-serif px-6 py-2 text-white shadow-lg hover:shadow-lg"
						>
							Apply Now
						</Button>
					</Center>
				</Stack>
			</form>
		</Box>
	);
}

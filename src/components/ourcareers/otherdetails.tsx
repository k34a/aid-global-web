"use client";

import React, { useState } from "react";
import {
	Stack,
	Divider,
	TextInput,
	Box,
	Text,
	Title,
	Button,
	Center,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { UploadCloud } from "lucide-react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { careerApplicationSchema } from "@/lib/db/careers/schema";
import { submitCareerApplication } from "@/app/(static)/careers/actions";

function Otherdetails() {
	const [cvFile, setCvFile] = useState<File | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	const form = useForm({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			contact: "",
			applyingFor: "",
		},
		validate: zodResolver(careerApplicationSchema),
	});

	const handleDrop = (files: File[]) => {
		if (files.length > 0) {
			setCvFile(files[0]);
		}
	};

	const handleSubmit = async (values: typeof form.values) => {
		if (!cvFile) {
			setMessage("Please upload your CV.");
			return;
		}

		try {
			const response = await submitCareerApplication({
				userInfo: {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					contact: values.contact,
					applyingFor: values.applyingFor,
				},
				resume: {
					fileName: cvFile.name,
					fileSize: cvFile.size,
					fileType: cvFile.type,
				},
			});

			if (response?.success) {
				setMessage("Form submitted successfully!");
				form.reset();
				setCvFile(null);
			} else {
				setMessage("Submission failed.");
			}
		} catch (err) {
			setMessage("Submission failed. Please try again.");
		}
	};

	return (
		<Box
			px="xl"
			py="xl"
			className="font-serif mb-10 bg-white shadow-xl rounded-3xl border mx-auto max-w-lg w-full border-gray-200 sm:px-8 sm:py-10"
		>
			<Title className="text-center font-bold mb-1 text-blue-600 text-3xl sm:text-4xl lg:text-5xl">
				Join Our Team
			</Title>

			<Divider
				size="sm"
				w={100}
				my="md"
				color="gray"
				className="mx-auto mb-6"
			/>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack className="space-y-6">
					<TextInput
						label="First Name"
						placeholder="Enter your first name"
						{...form.getInputProps("firstName")}
						required
						size="md"
						radius="md"
						withAsterisk
					/>

					<TextInput
						label="Last Name"
						placeholder="Enter your last name"
						{...form.getInputProps("lastName")}
						required
						size="md"
						radius="md"
						withAsterisk
					/>

					<TextInput
						label="Email"
						placeholder="Enter your email address"
						type="email"
						{...form.getInputProps("email")}
						required
						size="md"
						radius="md"
						withAsterisk
					/>

					<TextInput
						label="Contact Number"
						placeholder="Enter your contact number"
						type="tel"
						{...form.getInputProps("contact")}
						required
						size="md"
						radius="md"
						withAsterisk
					/>

					<TextInput
						label="Applying For"
						placeholder="Enter the role you're applying for"
						{...form.getInputProps("applyingFor")}
						required
						size="md"
						radius="md"
						withAsterisk
					/>

					<div>
						<Text className="font-medium text-sm mb-2 text-gray-700">
							Upload your CV *
						</Text>

						<Dropzone
							onDrop={handleDrop}
							accept={[
								MIME_TYPES.pdf,
								MIME_TYPES.doc,
								MIME_TYPES.docx,
							]}
							radius="md"
							className="border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 rounded-xl px-4 py-6"
						>
							<div className="flex flex-col items-center justify-center space-y-1">
								<UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
								<Text className="text-gray-600 text-sm font-medium">
									Drag & drop your CV here or click to upload
								</Text>
								<Text className="text-xs text-gray-500">
									Supported formats: .pdf, .doc, .docx
								</Text>
							</div>
						</Dropzone>

						{cvFile && (
							<div className="mt-4 text-sm text-green-600">
								Selected File: <strong>{cvFile.name}</strong>
							</div>
						)}
					</div>

					<Center>
						<Button
							size="md"
							radius="md"
							color="blue"
							type="submit"
							className="font-serif px-6 py-2 text-white shadow-lg hover:shadow-lg"
						>
							Apply Now
						</Button>
					</Center>

					{message && (
						<Text
							className={`text-center font-medium text-sm ${
								message.includes("success")
									? "text-green-600"
									: "text-red-600"
							}`}
						>
							{message}
						</Text>
					)}
				</Stack>
			</form>
		</Box>
	);
}

export default Otherdetails;

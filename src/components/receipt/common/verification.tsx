"use client";

import { Modal, TextInput, Button, Text, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Lock } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type VerifyPinModalProps = {
	opened: boolean;
	onSuccess: (pin: string) => void;
	loading?: boolean;
	error?: string | null;
};

export default function VerifyPinModal({
	opened,
	onSuccess,
	loading = false,
	error,
}: VerifyPinModalProps) {
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			pin: "",
		},
		validate: {
			pin: (value) =>
				/^\d{4}$/.test(value) ? null : "Enter a valid 4-digit PIN",
		},
	});

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		form.setFieldError("pin", error);
	}, [error]);

	const handleSubmit = (values: { pin: string }) => {
		onSuccess(values.pin);
	};

	return (
		<Modal
			opened={opened}
			onClose={() => {
				redirect("/");
			}}
			title="Verify Your Identity"
			centered
			withCloseButton={false}
			overlayProps={{
				blur: 3,
				opacity: 0.3,
			}}
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<Text>
						To view your donation receipt, please enter the last 4
						digits of the phone number you used during donation.
					</Text>

					<TextInput
						label="4-Digit PIN"
						placeholder="e.g. 1234"
						maxLength={4}
						required
						leftSection={<Lock size={18} />}
						key={form.key("pin")}
						error={form.errors.pin}
						{...form.getInputProps("pin")}
					/>

					<Group justify="flex-end">
						<Button
							variant="default"
							onClick={() => {
								redirect("/");
							}}
						>
							Go back to Home
						</Button>
						<Button
							type="submit"
							loading={loading}
							disabled={loading}
							color="blue"
						>
							Verify
						</Button>
					</Group>
				</Stack>
			</form>
		</Modal>
	);
}

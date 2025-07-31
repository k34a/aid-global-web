"use client";

import { Container, Paper, Stack, Title, Text, Button } from "@mantine/core";
import { CheckCircleIcon } from "lucide-react";

export default function VolunteerSuccess({ onReset }: { onReset: () => void }) {
	return (
		<Container size="md" py="xl">
			<Paper shadow="md" p="xl" radius="md">
				<Stack align="center" gap="lg">
					<CheckCircleIcon
						size={48}
						strokeWidth={2}
						className="text-green-600"
					/>
					<Title order={2} ta="center" c="green">
						Application Submitted Successfully!
					</Title>
					<Text ta="center" c="dimmed" size="lg">
						Thank you for your interest in volunteering with us. We
						will contact you soon.
					</Text>
					<Button onClick={onReset} variant="outline">
						Submit Another Application
					</Button>
				</Stack>
			</Paper>
		</Container>
	);
}

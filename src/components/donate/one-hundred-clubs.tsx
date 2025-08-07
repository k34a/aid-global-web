"use client";

import { useState } from "react";
import {
	Text,
	Title,
	Badge,
	Tabs,
	Group,
	Stack,
	Center,
	Container,
	Paper,
	Flex,
} from "@mantine/core";
import { Heart, Shield, Star } from "lucide-react";
import ClubShowcase from "@/components/donate/club-showcase";

export default function OneHundredClubs() {
	const [selectedFrequency, setSelectedFrequency] = useState<
		"monthly" | "daily"
	>("monthly");
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
			{/* Header */}
			<Paper shadow="sm" className="border-t border-gray-200">
				<Container size="xl" py="md" px="xl">
					<Flex
						justify="space-between"
						align="center"
						className="flex-col sm:flex-row gap-y-2 sm:gap-y-0 px-4"
					>
						<Group gap="xs" className="sm:ml-4">
							<Heart size={24} color="#ef4444" />
							<Text fw={600} size="lg">
								Join The Movement
							</Text>
						</Group>

						<Badge
							color="green"
							variant="light"
							leftSection={<Shield size={12} />}
							className="sm:mr-4"
						>
							Secure & Trusted
						</Badge>
					</Flex>
				</Container>
			</Paper>

			<Container size="xl" py="xl">
				{/* Hero Section */}
				<Stack align="center" gap="xl" mb="xl">
					<Badge
						size="lg"
						color="orange"
						variant="light"
						leftSection={<Star size={16} />}
					>
						5,000+ Active Members
					</Badge>

					<Title order={1} size="3rem" ta="center" c="dark">
						Choose Your Impact Level
					</Title>

					<Text size="xl" c="dimmed" ta="center" maw={800}>
						From {"\u20B9"}1 to {"\u20B9"}100 - every contribution
						creates ripples of positive change. Start where
						you&apos;re comfortable and grow your impact over time.
					</Text>
				</Stack>

				{/* Frequency Toggle */}
				<Center mb="xl">
					<Tabs
						value={selectedFrequency}
						onChange={(value) =>
							setSelectedFrequency(value as "monthly" | "daily")
						}
						style={{ width: "100%", maxWidth: "400px" }}
					>
						<Tabs.List grow>
							<Tabs.Tab value="monthly">Monthly</Tabs.Tab>
							<Tabs.Tab value="daily">Daily</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</Center>

				{/* Dynamic Club Showcase */}
				<Paper shadow="sm" radius="xl" p="xl" mb="xl">
					<ClubShowcase frequency={selectedFrequency} />
				</Paper>
			</Container>
		</div>
	);
}

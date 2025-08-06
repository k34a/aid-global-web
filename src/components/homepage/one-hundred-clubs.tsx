"use client";

import { useState } from "react";
import {
	Button,
	Card,
	Text,
	Title,
	Badge,
	Tabs,
	Group,
	Stack,
	Center,
	Grid,
	Container,
	Paper,
	Flex,
} from "@mantine/core";
import { Heart, Shield, Clock, ArrowRight, Check, Star } from "lucide-react";
import ClubShowcase from "@/components/homepage/club-showcase";
import { useRouter } from "next/navigation";

export default function OneHundredClubs() {
	const router = useRouter();
	const [selectedAmount, setSelectedAmount] = useState(100);
	const [selectedFrequency, setSelectedFrequency] = useState<
		"monthly" | "daily"
	>("monthly");

	const donationTiers = [
		{
			amount: 1,
			title: "Daily Hero",
			description: "\u20B91/day - Start your impact journey",
			impact: "Provides 1 meal to a child",
			popular: false,
			color: "#eff6ff",
			borderColor: "#bfdbfe",
			badge: "Start Small",
		},
		{
			amount: 100,
			title: "Change Maker",
			description: "\u20B9100/month - Join thousands of heroes",
			impact: "Educates 1 child for a month",
			popular: true,
			color: "#fff7ed",
			borderColor: "#fed7aa",
			badge: "Most Popular",
		},
	];

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

				{/* Donation Tiers */}
				<Grid gutter="lg" mb="xl" justify="center">
					{donationTiers.map((tier) => (
						<Grid.Col key={tier.amount} span={{ base: 12, md: 4 }}>
							<Card
								shadow={
									selectedAmount === tier.amount ? "lg" : "sm"
								}
								padding="lg"
								radius="md"
								style={{
									backgroundColor: tier.color,
									border: `1px solid ${tier.borderColor}`,
									cursor: "pointer",
									transition: "all 0.3s ease",
									position: "relative",
									marginTop: "1rem",
									overflow: "visible",
									...(selectedAmount === tier.amount && {
										boxShadow: "0 0 0 2px #f97316",
									}),
								}}
								onClick={() => setSelectedAmount(tier.amount)}
							>
								<Badge
									color="orange"
									style={{
										position: "absolute",
										top: "-12px",
										left: "50%",
										transform: "translateX(-50%)",
									}}
								>
									{tier.badge}
								</Badge>

								<Stack align="center" gap="md">
									<Stack align="center" gap="xs">
										<Group gap={4} align="baseline">
											<Text size="2rem" fw={700} c="dark">
												{"\u20B9"}
												{tier.amount}
											</Text>
											<Text size="sm" c="dimmed">
												/
												{selectedFrequency === "monthly"
													? "month"
													: "day"}
											</Text>
										</Group>
										<Title order={3} size="lg">
											{tier.title}
										</Title>
										<Text size="sm" c="dimmed" ta="center">
											{tier.description}
										</Text>
									</Stack>

									<Paper
										bg="white"
										radius="md"
										p="md"
										w="100%"
									>
										<Stack align="center" gap="xs">
											<Text size="sm" fw={500} c="dark">
												Your Impact:
											</Text>
											<Text
												size="sm"
												c="dimmed"
												ta="center"
											>
												{tier.impact}
											</Text>
										</Stack>
									</Paper>

									{selectedAmount === tier.amount && (
										<Group gap="xs" c="orange">
											<Check size={16} />
											<Text fw={500} c="orange">
												Selected
											</Text>
										</Group>
									)}
								</Stack>
							</Card>
						</Grid.Col>
					))}
				</Grid>

				{selectedAmount === 1 && (
					<Paper
						p="xl"
						radius="xl"
						mb="xl"
						style={{
							background:
								"linear-gradient(to right, #fff7ed, #fefce8)",
							border: "1px solid #fed7aa",
						}}
					>
						<Stack gap="md">
							<Title order={4} c="dark">
								Ready for bigger impact?
							</Title>
							<Text size="sm" c="dimmed">
								Join 1,000+ heroes in the {"\u20B9"}100 Club -
								just {"\u20B9"}3.33/day can educate a child for
								a full month!
							</Text>
							<div>
								<Button
									variant="outline"
									color="orange"
									rightSection={<ArrowRight size={16} />}
									onClick={() => {
										setSelectedAmount(100);
										router.push("/100rupee");
									}}
								>
									Upgrade to {"\u20B9"}100 Club
								</Button>
							</div>
						</Stack>
					</Paper>
				)}

				{/* CTA Section */}
				<Stack align="center" gap="xl">
					<Button
						size="xl"
						color="orange"
						rightSection={<ArrowRight size={20} />}
						style={{
							fontSize: "1.125rem",
							fontWeight: 600,
							borderRadius: "12px",
							padding: "16px 32px",
						}}
						onClick={() => router.push(`${selectedAmount}rupee`)}
					>
						Join with {"\u20B9"}
						{selectedAmount}/
						{selectedAmount === 100 ? "month" : "day"}
					</Button>

					<Flex wrap="wrap" justify="center" gap="xl">
						<Group gap="xs">
							<Shield size={16} color="#16a34a" />
							<Text size="sm" c="dimmed">
								Tax benefits under 80G
							</Text>
						</Group>
						<Group gap="xs">
							<Clock size={16} color="#2563eb" />
							<Text size="sm" c="dimmed">
								Cancel anytime
							</Text>
						</Group>
						<Group gap="xs">
							<Check size={16} color="#9333ea" />
							<Text size="sm" c="dimmed">
								Secure donations
							</Text>
						</Group>
					</Flex>
				</Stack>
			</Container>
		</div>
	);
}

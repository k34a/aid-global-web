"use client";

import {
	Button,
	Card,
	Text,
	Title,
	Group,
	Stack,
	Center,
	Flex,
	Grid,
} from "@mantine/core";
import { Heart, Users, Target, Shield, Clock, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";
import { ArrowRight } from "lucide-react";

interface ClubShowcaseProps {
	frequency: "monthly" | "daily";
}

export default function ClubShowcase({ frequency }: ClubShowcaseProps) {
	const router = useRouter();
	const isMonthly = frequency === "monthly";
	const amount = isMonthly ? 100 : 1;
	const period = isMonthly ? "monthly" : "daily";
	const costPerDay = isMonthly ? "\u20B9 3.33/day" : "\u20B9 1/day";

	return (
		<div style={{ backgroundColor: "white" }}>
			{/* Header */}
			<Stack align="center" gap="md" mb="xl">
				<Group gap="xs">
					<Heart size={20} color="#ef4444" />
					<Text size="sm" fw={500} c="dimmed">
						Join The Movement
					</Text>
				</Group>

				<Title order={1} size="3rem" ta="center" c="dark" mb="md">
					The{" "}
					<Text component="span" c="blue" inherit>
						{"\u20B9"}
						{amount}
					</Text>{" "}
					Club
				</Title>

				<Text size="lg" c="dimmed" ta="center" maw={600}>
					Big hearts, bigger impact. Join thousands of everyday heroes
					who donate just{" "}
					<Text component="span" fw={600} c="blue">
						{"\u20B9"}
						{amount} {period}
					</Text>{" "}
					to create sustainable change.
				</Text>
			</Stack>

			{/* Why Join Section */}
			<Stack gap="xl" mb="xl">
				<Title order={2} size="2rem" ta="center" c="dark">
					Why Join The {"\u20B9"}
					{amount} Club?
				</Title>

				<Grid gutter="xl" align="center">
					{/* Image Section */}
					<Grid.Col span={{ base: 12, lg: 6 }}>
						<div style={{ position: "relative" }}>
							<div
								style={{
									backgroundColor: "#f1f5f9",
									borderRadius: "8px",
									overflow: "hidden",
								}}
							>
								<Image
									src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
									alt="Children studying together"
									width={1200}
									height={256}
									style={{
										width: "100%",
										height: "256px",
										objectFit: "cover",
									}}
								/>
							</div>

							{/* Amount Badge on Image */}
							<Card
								shadow="lg"
								padding="md"
								style={{
									position: "absolute",
									bottom: "-10px",
									right: "-10px",
									minWidth: "auto",
								}}
							>
								<Stack align="center" gap={4}>
									<Text size="xl" fw={700} c="blue">
										{"\u20B9"}
										{amount}
									</Text>
									<Text size="xs" c="dimmed">
										per {period.slice(0, -2)}
									</Text>
								</Stack>
							</Card>
						</div>
					</Grid.Col>

					{/* Content Section */}
					<Grid.Col span={{ base: 12, lg: 6 }}>
						<Stack gap="md">
							<Text c="dimmed" mb="md">
								For less than the cost of{" "}
								{isMonthly ? "a daily coffee" : "a small snack"}
								, you can become part of a movement that
								transforms lives. Your {"\u20B9"}
								{amount} {period} contribution creates ripples
								of positive change across communities.
							</Text>

							{/* Three Pillars */}
							<Grid gutter="md" mb="md">
								<Grid.Col span={4}>
									<Stack align="center" gap="xs">
										<Center
											w={48}
											h={48}
											style={{
												backgroundColor: "#dbeafe",
												borderRadius: "50%",
											}}
										>
											<Heart size={24} color="#2563eb" />
										</Center>
										<Text fw={600} size="sm" ta="center">
											Small Amount
										</Text>
										<Text size="xs" c="dimmed" ta="center">
											Just {costPerDay}
										</Text>
									</Stack>
								</Grid.Col>

								<Grid.Col span={4}>
									<Stack align="center" gap="xs">
										<Center
											w={48}
											h={48}
											style={{
												backgroundColor: "#dcfce7",
												borderRadius: "50%",
											}}
										>
											<Target size={24} color="#16a34a" />
										</Center>
										<Text fw={600} size="sm" ta="center">
											Big Impact
										</Text>
										<Text size="xs" c="dimmed" ta="center">
											{isMonthly
												? "10,000+ lives changed"
												: "1,000+ meals provided"}
										</Text>
									</Stack>
								</Grid.Col>

								<Grid.Col span={4}>
									<Stack align="center" gap="xs">
										<Center
											w={48}
											h={48}
											style={{
												backgroundColor: "#f3e8ff",
												borderRadius: "50%",
											}}
										>
											<Users size={24} color="#9333ea" />
										</Center>
										<Text fw={600} size="sm" ta="center">
											Community
										</Text>
										<Text size="xs" c="dimmed" ta="center">
											{isMonthly
												? "1,000+ members"
												: "500+ daily heroes"}
										</Text>
									</Stack>
								</Grid.Col>
							</Grid>
						</Stack>
					</Grid.Col>
				</Grid>
			</Stack>

			{/* Statistics */}
			<Grid gutter="xl" mb="xl">
				<Grid.Col span={6}>
					<Card
						padding="xl"
						style={{
							backgroundColor: "#eff6ff",
							border: "1px solid #bfdbfe",
							textAlign: "center",
						}}
					>
						<Stack align="center" gap="xs">
							<Text size="2rem" fw={700} c="blue">
								{isMonthly ? "50L+" : "10L+"}
							</Text>
							<Text size="sm" c="dimmed">
								Total Raised
							</Text>
						</Stack>
					</Card>
				</Grid.Col>

				<Grid.Col span={6}>
					<Card
						padding="xl"
						style={{
							backgroundColor: "#f0fdf4",
							border: "1px solid #bbf7d0",
							textAlign: "center",
						}}
					>
						<Stack align="center" gap="xs">
							<Text size="2rem" fw={700} c="green">
								{isMonthly ? "5,000+" : "2,000+"}
							</Text>
							<Text size="sm" c="dimmed">
								Active Members
							</Text>
						</Stack>
					</Card>
				</Grid.Col>
			</Grid>
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
					onClick={() => router.push(`${amount}rupee`)}
				>
					Join with {"\u20B9"}
					{amount}/{amount === 100 ? "month" : "day"}
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
		</div>
	);
}

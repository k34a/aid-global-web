"use client";

import {
	Search,
	School,
	Brush,
	Sparkles,
	HeartHandshake,
	Goal,
	Lightbulb,
} from "lucide-react";
import Link from "next/link";
import {
	Title,
	Text,
	Card,
	Stack,
	Group,
	ThemeIcon,
	Table,
	Button,
	Grid,
	GridCol,
} from "@mantine/core";
import { IndianRupee } from "lucide-react";

const points = [
	{
		icon: Search,
		text: "Identify and enroll migrant, street, and dropout children",
	},
	{
		icon: Brush,
		text: "Teach through joyful methods like dance, drawing, and storytelling",
	},
	{
		icon: Sparkles,
		text: "Emphasize values, hygiene, confidence, and discipline",
	},
	{
		icon: HeartHandshake,
		text: "Host health camps, motivational sessions, and exposure tours",
	},
	{
		icon: School,
		text: "Facilitate re-entry into government or private school",
	},
];

const donationPlans = [
	["Educational supplies for 5 children", "9,225"],
	["Nutritious meals for 50 children (3x a week)", "12,000"],
	["Health camp & educational tour", "33,000"],
	["Teacher's honorarium (monthly)", "10,000"],
	["Set up a new Shiksha Club", "50,000"],
];

export default function Donationsection() {
	return (
		<section
			style={{
				backgroundColor: "rgba(234, 245, 255, 0.2)", // bg-[#eaf5ff]/20
				padding: "1.5rem 1rem",
			}}
		>
			<Card radius="xl" p="lg" shadow="xs" withBorder={false}>
				<Group mb="md" align="center" gap="sm" wrap="nowrap">
					<ThemeIcon
						radius="xl"
						size={36}
						color="yellow"
						className="flex-shrink-0"
					>
						<Lightbulb size={20} />
					</ThemeIcon>
					<Title order={3} c="#003366" fw={700}>
						Why ShikshaAid Centre?
					</Title>
				</Group>

				<Text c="#003366" fw={700} mb="lg">
					The ShikshaAid Centre is our innovative grassroots model for
					informal yet impactful education. It acts as a safe space
					for learning, healing, and growth for children who lack
					access to traditional classrooms.
				</Text>

				<Grid gutter="xl">
					<GridCol span={{ base: 12, lg: 6 }}>
						<Stack gap="md" ml="sm" mt="md">
							{points.map((item, index) => {
								const Icon = item.icon;
								return (
									<div
										key={index}
										className="flex items-start gap-3"
									>
										<div className="flex-shrink-0 mt-1 w-5 h-5 text-orange-400">
											<Icon className="w-5 h-5" />
										</div>
										<span className="text-[#003366] leading-snug">
											{item.text}
										</span>
									</div>
								);
							})}
						</Stack>
					</GridCol>
					<GridCol span={{ base: 12, lg: 6 }}>
						<Card
							withBorder
							shadow="md"
							radius="xl"
							p="md"
							style={{
								backgroundColor: "white",
								borderColor: "#fdba74",
							}}
						>
							<Group mb="sm" align="left" gap="sm" wrap="nowrap">
								<ThemeIcon
									radius="xl"
									size={34}
									color="red"
									className="flex-shrink-0"
								>
									<Goal size={20} />
								</ThemeIcon>
								<Title order={3} c="orange.6" fw={700}>
									Donation Plans- ShikshaAid Centre
								</Title>
							</Group>
							<Table
								striped
								highlightOnHover
								withTableBorder={false}
								withColumnBorders={false}
								styles={{
									thead: {
										borderBottom: "2px solid #004466",
									},
									th: {
										padding: "6px 8px",
										fontWeight: 600,
										color: "#003366",
									},
									td: {
										padding: "6px 8px",
										borderBottom: "1px solid #ccc",
										color: "#003366",
									},
								}}
							>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Support For</Table.Th>
										<Table.Th ta="right">
											Amount (INR)
										</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{donationPlans.map(
										([support, amount], i) => (
											<Table.Tr key={i}>
												<Table.Td>{support}</Table.Td>
												<Table.Td
													ta="right"
													fw={500}
													className="flex items-center justify-end gap-1"
												>
													<IndianRupee
														size={14}
														strokeWidth={2}
													/>{" "}
													{amount}
												</Table.Td>
											</Table.Tr>
										),
									)}
								</Table.Tbody>
							</Table>

							<Text mt="md" size="sm" fs="italic">
								Every rupee you contribute turns the street into
								a stepping stone for a better life.
							</Text>

							<Group justify="center" mt="md">
								<Button
									component={Link}
									href="/donate?program=shiksha-aid"
									radius="xl"
									color="orange"
								>
									Donate Now
								</Button>
							</Group>
						</Card>
					</GridCol>
				</Grid>
			</Card>
		</section>
	);
}

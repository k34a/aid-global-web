import { Check, Goal } from "lucide-react";
import { Title, Text, Flex, SimpleGrid, Paper } from "@mantine/core";
const missionServices = [
	{
		title: "Free Eye Screening Camps",
		description:
			"Conducted in low-income and remote communities to catch problems early.",
		color: "#6a1e55",
	},
	{
		title: "Diagnosis & Treatment",
		description: "Medical support for various eye conditions and diseases.",
		color: "#5d3dc4",
	},
	{
		title: "Prescription Spectacles",
		description: "Free glasses provided to those who cannot afford them.",
		color: "#6a1e55",
	},
	{
		title: "Cataract Surgery Support",
		description:
			"Assistance for elderly and vulnerable people requiring surgery.",
		color: "#5d3dc4",
	},
	{
		title: "Vision Awareness Campaigns",
		description:
			"Conducted in schools, factories, and public areas to spread awareness.",
		color: "#6a1e55",
	},
	{
		title: "Children's Eye Care",
		description:
			"Eye checkups and support for children in Aid Foundation Centres.",
		color: "#5d3dc4",
	},
];

export default function MissionSection() {
	return (
		<section className="bg-gradient-to-b from-[#f8f2fc] to-[#fbeffc] py-10 px-6 md:px-24">
			<div className="text-center mb-10">
				<Title order={2} size="h1" fw={700} ta="center" mb="sm">
					Our Mission:{" "}
					<Title
						order={2}
						size="h1"
						fw={700}
						component="span"
						c="#6a1e55"
					>
						Vision for All
					</Title>
				</Title>
				<Text
					size="lg"
					c="gray.7"
					maw={700}
					mx="auto"
					ta="center"
					mb="md"
				>
					<strong>VisionAid</strong>, a flagship program of{" "}
					<strong>Aid Global Foundation</strong>, is working
					tirelessly to ensure that{" "}
					<Text component="em" c="#5d3dc4" fw={600}>
						no life remains in darkness due to poor vision.
					</Text>
				</Text>
			</div>
			<Flex align="center" gap="sm" mb="md">
				<Goal size={28} color="black" />
				<Title order={3} size="h2" fw={700} c="#6a1e55">
					What VisionAid Does
				</Title>
			</Flex>
			<SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" c="#2f194d">
				{missionServices.map(({ title, description, color }, i) => (
					<Flex key={i} align="flex-start" gap="md">
						<Check size={28} color={color} />
						<div>
							<Text fw={600} size="lg">
								{title}
							</Text>
							<Text c="gray.7">{description}</Text>
						</div>
					</Flex>
				))}
			</SimpleGrid>
			<Paper
				radius="xl"
				shadow="sm"
				px="xl"
				py="lg"
				mt="lg"
				maw={900}
				mx="auto"
				withBorder
				style={{
					backgroundColor: "rgba(243, 234, 255, 0.4)",
					borderColor: "#e4d3fb",
				}}
				ta="center"
			>
				<Title order={3} size="h2" fw={800} c="#6a1e55" mb="md">
					Empowering Children Through Sight
				</Title>
				<Text size="lg" c="#2f194d" maw={700} mx="auto" lh="lg">
					We ensure every child under our care receives routine eye
					check-ups and glasses if needed.
				</Text>
				<Text mt="sm" size="lg" fs="italic" fw={600} c="#5d3dc4">
					Because every child deserves to see their dreams clearly.
				</Text>
			</Paper>
		</section>
	);
}

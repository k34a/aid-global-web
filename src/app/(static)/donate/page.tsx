import { Suspense } from "react";
import {
	Text,
	Title,
	Container,
	Group,
	Stack,
	Box,
	Card,
	SimpleGrid,
} from "@mantine/core";
import { IndianRupee, Users, GraduationCap, Stethoscope } from "lucide-react";
import OtherDonationModes from "@/components/donate/other-donation-modes";
import FAQ from "@/components/faq";
import { donationFaqs } from "@/config/faqs";
import DonateForm from "@/components/donate/form";

export default function DonatePage() {
	return (
		<Box
			style={{
				minHeight: "100vh",
				background:
					"linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #dcfce7 100%)",
			}}
		>
			<Container size="lg" py={{ base: "md", sm: "xl" }}>
				{/* Header */}
				<Stack align="center" mb={{ base: "lg", sm: 40 }}>
					<Title
						order={1}
						size="h1"
						ta="center"
						fw={700}
						c="gray.9"
						mb="sm"
						style={{ fontSize: "2.25rem" }}
					>
						Make a Difference Today
					</Title>
					<Text
						size="h2"
						c="gray.6"
						ta="center"
						maw={600}
						style={{ fontSize: "1.25rem" }}
					>
						Your donation helps us provide food, education,
						healthcare, and hope to those who need it most.
					</Text>
				</Stack>

				{/* Main Form Card */}
				<Suspense>
					<DonateForm />
				</Suspense>
				<OtherDonationModes />

				{/* Impact Section */}
				<Box mt={{ base: "xl", sm: 60 }}>
					<Title
						order={3}
						size="h2"
						ta="center"
						mb={{ base: "lg", sm: 40 }}
						c="gray.9"
						style={{ fontSize: "2rem" }}
					>
						Your Impact
					</Title>
					<SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dbeafe",
										borderRadius: "50%",
									}}
								>
									<Users size={32} color="#2563eb" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#2563eb" />
									<Text size="xl" fw={700} c="blue.6">
										100
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides a nutritious meal to a child
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#dcfce7",
										borderRadius: "50%",
									}}
								>
									<GraduationCap size={32} color="#16a34a" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#16a34a" />
									<Text size="xl" fw={700} c="green.6">
										500
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Supports a child&apos;s education for a week
								</Text>
							</Stack>
						</Card>

						<Card
							shadow="lg"
							radius="xl"
							p="xl"
							className="bg-white/90 backdrop-blur-md border border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]"
						>
							<Stack align="center" gap="md">
								<Box
									p="md"
									style={{
										backgroundColor: "#f3e8ff",
										borderRadius: "50%",
									}}
								>
									<Stethoscope size={32} color="#9333ea" />
								</Box>
								<Group gap="xs">
									<IndianRupee size={20} color="#9333ea" />
									<Text size="xl" fw={700} c="violet.6">
										1000
									</Text>
								</Group>
								<Text size="sm" c="gray.6" ta="center">
									Provides healthcare for a family
								</Text>
							</Stack>
						</Card>
					</SimpleGrid>
				</Box>
			</Container>
			<FAQ items={donationFaqs} />
		</Box>
	);
}

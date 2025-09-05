import {
	Glasses,
	Eye,
	HandCoins,
	HeartHandshake,
	Bus,
	Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { SimpleGrid, Card, Title, Text } from "@mantine/core";
const contributions = [
	{
		icon: Glasses,
		title: "Sponsor a Vision Kit",
		description: "Rs. 250 provides one pair of glasses.",
	},
	{
		icon: Eye,
		title: "Support a Cataract Surgery",
		description: "Rs. 8,000 restores vision for one person.",
	},
	{
		icon: HandCoins,
		title: "Fund a Full Eye Camp",
		description: "Rs. 25,000 supports a full day of free eye care.",
	},
	{
		icon: Bus,
		title: "Contribute to Vision Van Fund",
		description: "Any amount helps bring care to remote areas.",
	},
	{
		icon: HeartHandshake,
		title: "Volunteer or Partner with Us",
		description: "Share your time, skills, or CSR initiative.",
	},
];

export default function JoinUsSection() {
	return (
		<section className="relative my-4 mx-4 md:mx-20 rounded-3xl overflow-hidden bg-[#fbf6ff] py-10 px-6 md:px-24 shadow-lg">
			<div className="absolute right-[-300px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
				<div className="w-[600px] h-[600px] rounded-full bg-[#f3eaff] opacity-60" />

				<div className="absolute top-[60px] left-[60px] w-[480px] h-[480px] rounded-full bg-[#e5d4ff] opacity-50" />
				<div className="absolute top-[120px] left-[120px] w-[360px] h-[360px] rounded-full bg-[#d8beff] opacity-40" />
				<div className="absolute top-[180px] left-[180px] w-[240px] h-[240px] rounded-full bg-[#caa6ff] opacity-30" />
			</div>

			<div className="relative z-10">
				<Title order={2} size="h1" fw={700} c="#2f194d" mb="sm">
					Be the Light in Someone&apos;s Darkness
				</Title>
				<Text size="xl" c="#5d3dc4" mb="md" maw={600}>
					You can be a part of this life-changing journey:
				</Text>
				<SimpleGrid
					cols={{ base: 1, sm: 2, lg: 3 }}
					spacing="md"
					mb="md"
				>
					{contributions.map(
						({ icon: Icon, title, description }, i) => (
							<Card
								key={i}
								shadow="sm"
								radius="md"
								withBorder
								className="hover:shadow-md transition-all"
								p="md"
							>
								<Icon
									size={24}
									color="#6a1e55"
									style={{ marginBottom: 8 }}
								/>
								<Text fw={600} c="#1a1a1d" mb={4}>
									{title}
								</Text>
								<Text size="sm" c="gray.7">
									{description}
								</Text>
							</Card>
						),
					)}
				</SimpleGrid>
				<div className="mb-4">
					<h3 className="text-xl font-semibold text-[#2f194d] mb-2">
						Connect with VisionAid Today
					</h3>
					<p className="text-base font-medium text-[#6a1e55] leading-relaxed">
						Let&apos;s bring light back into someone&apos;s world.
						<br />
						Be their hope. Be their vision.
					</p>
				</div>
				<div className="flex flex-wrap gap-4">
					<Link
						href="/donate?program=vision-aid"
						className="bg-[#5d3dc4] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#6a1e55] transition-all"
					>
						Donate Now
					</Link>
					<Link
						href="/contact-us"
						className="bg-white border-2 border-[#5d3dc4] text-[#5d3dc4] px-6 py-3 rounded-xl font-medium hover:bg-[#f3eaff] transition-all"
					>
						<LinkIcon className="inline-block mr-2" />
						Connect with us
					</Link>
				</div>
			</div>
		</section>
	);
}

import React from "react";
import { developers } from "@/config/developers";
import {
	Avatar,
	Group,
	Stack,
	Text,
	Title,
	Container,
	SimpleGrid,
	Anchor,
} from "@mantine/core";
import Github from "@/components/icons/github";
import Linkedin from "@/components/icons/linkedin";
import Link from "next/link";

const getGithubAvatar = (username: string) =>
	`https://github.com/${username}.png`;

export default function DevelopersPage() {
	return (
		<Container size="lg" py="xl">
			<Title order={1} mb="xs">
				Our Developers &amp; Contributors
			</Title>
			<Text c="dimmed" mb="sm">
				Meet the people who have built and maintained this site. Connect
				with us on GitHub and LinkedIn!
			</Text>
			<Text c="dimmed" mt="sm" mb="md">
				The codebase is open source and available here:{" "}
				<Link
					href="https://github.com/k34a/aid-global-web"
					target="_blank"
					rel="noopener noreferrer"
					className="hover:underline text-sky-500 hover:text-sky-700"
				>
					GitHub
				</Link>
			</Text>
			<Stack gap="xl">
				{developers.map((section, idx) => (
					<div key={idx}>
						<Title
							order={2}
							mb="md"
							className="text-center text-sky-700"
						>
							{section.role}
						</Title>
						<SimpleGrid
							cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
							spacing="lg"
						>
							{section.members.map((member) => (
								<div
									key={member.github}
									className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-4 transition hover:shadow-lg hover:scale-[1.03]"
								>
									<Avatar
										src={getGithubAvatar(member.github)}
										alt={member.name}
										size={72}
										radius={36}
										mb={8}
									/>
									<Text
										fw={700}
										size="md"
										mt={6}
										mb={1}
										className="text-center"
									>
										{member.name}
									</Text>
									<Text
										size="xs"
										c="dimmed"
										mb={8}
										className="text-center"
									>
										{section.role}
									</Text>
									<Group gap={12} mt={4}>
										<Anchor
											href={`https://github.com/${member.github}`}
											target="_blank"
											rel="noopener noreferrer"
											title="GitHub"
										>
											<Github />
										</Anchor>
										<Anchor
											href={member.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											title="LinkedIn"
										>
											<Linkedin />
										</Anchor>
									</Group>
								</div>
							))}
						</SimpleGrid>
					</div>
				))}
			</Stack>
		</Container>
	);
}

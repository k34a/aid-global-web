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
	Divider,
} from "@mantine/core";
import Github from "@/components/icons/github";
import Linkedin from "@/components/icons/linkedin";

const getGithubAvatar = (username: string) =>
	`https://github.com/${username}.png`;

export default function DevelopersPage() {
	return (
		<Container size="lg" py="xl">
			<Title order={1} className="text-center" mb="xs">
				Our Developers & Contributors
			</Title>
			<Text ta="center" c="dimmed" mb="md">
				Meet the people who have built and maintained this site. Connect
				with us on GitHub and LinkedIn!
			</Text>
			<Stack gap="xl">
				{developers.map((section, idx) => (
					<div key={section.role}>
						<Title
							order={2}
							mb="md"
							className={
								idx === 0
									? "text-center text-blue-700"
									: "text-center"
							}
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
										{member.role}
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

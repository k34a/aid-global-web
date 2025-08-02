import { Paper, Text, Title } from "@mantine/core";

type TeamdescProps = {
	name: string;
	role: string;
	desc: string;
};

export default function TeamCardDesc({ name, role, desc }: TeamdescProps) {
	return (
		<Paper
			shadow="md"
			radius="lg"
			p="lg"
			withBorder
			style={{ transition: "all 0.3s ease-in-out" }}
			className="hover:shadow-xl"
		>
			<Title order={3} c="blue.9" ta="center">
				{name}
			</Title>
			<Text size="sm" c="gray.7" ta="center">
				{role}
			</Text>
			<Text size="sm" mt="sm" c="black" ta="justify">
				{desc}
			</Text>
		</Paper>
	);
}

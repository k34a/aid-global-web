import { Avatar, Group, Paper, Text } from "@mantine/core";
import { getInitials, getTimeAgo } from "./utils";
import { IconCurrencyRupee } from "@tabler/icons-react";

type DonorCardProps = {
	name: string;
	amount: number;
	donatedAt: Date;
};

export default function DonorCard({ name, amount, donatedAt }: DonorCardProps) {
	const initials = getInitials(name);
	const timeAgo = getTimeAgo(donatedAt);

	return (
		<Paper shadow="xs" p="md" radius="md" withBorder>
			<Group>
				<Avatar color="blue" radius="xl">
					{initials}
				</Avatar>
				<div>
					<Text fw={500}>{name}</Text>
					<Text size="sm">
						Donated{" "}
						<IconCurrencyRupee
							size={14}
							style={{ display: "inline" }}
						/>
						{amount.toLocaleString("en-IN")}
					</Text>
					<Text size="xs" c="dimmed">
						{timeAgo}
					</Text>
				</div>
			</Group>
		</Paper>
	);
}

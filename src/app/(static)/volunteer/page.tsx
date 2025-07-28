import { Container, Title, Text, Box } from "@mantine/core";
import VolunteerForm from "@/components/volunteerism/volunteerform";

export default function VolunteerPage() {
	return (
		<Container size="lg" py="xl">
			<Box mb="xl">
				<Title order={1} ta="center" mb="md">
					Join Our Volunteer Team
				</Title>
				<Text ta="center" c="dimmed" size="lg" maw={600} mx="auto">
					Make a difference in someone&apos;s life. Join our community
					of dedicated volunteers and help us create positive change
					in the world.
				</Text>
			</Box>

			<VolunteerForm />
		</Container>
	);
}

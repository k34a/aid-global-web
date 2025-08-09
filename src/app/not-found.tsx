import Footer from "@/components/structure/footer";
import HeaderMegaMenu from "@/components/structure/header";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<HeaderMegaMenu />
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<Container className="text-center px-6 py-16">
					<Stack gap="lg">
						<Title
							order={1}
							className="text-7xl font-bold text-gray-900 mb-4"
						>
							404
						</Title>
						<Text size="lg" className="text-gray-600 mb-6">
							Page you are trying to open does not exist. You may
							have mistyped the address, or the page has been
							moved to another URL. If you think this is an error
							contact support.
						</Text>

						<Group justify="center">
							<Link href="/" passHref>
								<Button variant="filled" color="blue" size="md">
									Take me back to home page
								</Button>
							</Link>
						</Group>
					</Stack>
				</Container>
			</div>
			<Footer />
		</>
	);
}

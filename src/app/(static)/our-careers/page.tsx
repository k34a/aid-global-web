"use client";
import React from "react";
import { Container, Paper, Stack, Title, Divider } from "@mantine/core";

import Otherdetails from "@/components/ourcareers/otherdetails";

function OurCareers() {
	return (
		<Container size="md" py="xl">
			<Stack>
				<Otherdetails />
			</Stack>
		</Container>
	);
}

export default OurCareers;

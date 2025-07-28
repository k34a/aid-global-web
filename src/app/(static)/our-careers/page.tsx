"use client";
import React from "react";
import { Container, Paper, Stack, Title, Divider } from "@mantine/core";
import Name from "@/components/ourcareers/name";
import Otherdetails from "@/components/ourcareers/otherdetails";
import Uploadcv from "@/components/ourcareers/uploadcv";
import Apply from "@/components/ourcareers/apply";

function OurCareers() {
	return (
		<Container size="md" py="xl">
			<Stack>
				<Name />
				<Otherdetails />
				<Uploadcv />
				<Apply />
			</Stack>
		</Container>
	);
}

export default OurCareers;

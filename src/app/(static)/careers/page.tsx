import React from "react";
import { Container, Stack } from "@mantine/core";

import CareerApplicationForm from "@/components/career/application-form";

function OurCareers() {
	return (
		<Container size="md" py="xl">
			<Stack>
				<CareerApplicationForm />
			</Stack>
		</Container>
	);
}

export default OurCareers;

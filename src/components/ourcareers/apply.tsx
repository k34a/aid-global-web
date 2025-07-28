import React from "react";
import { Button, Center, Stack, Box } from "@mantine/core";

function Apply() {
	return (
		<Box maw={500} mx="auto" className="font-serif pr-20 pt-5">
			<Stack>
				<Button
					size="md"
					radius="md"
					color="blue"
					variant="filled"
					className="font-serif "
				>
					Apply
				</Button>
			</Stack>
		</Box>
	);
}

export default Apply;

import React from "react";
import { TextInput, Title, Stack, Divider, Box } from "@mantine/core";

function Name() {
	return (
		<Box maw={500} mx="auto" pt="xl" px="xl" className="font-serif mb-5">
			<Title order={1} className="text-center font-semibold mb-2 ">
				Join Our Team
			</Title>

			<Divider
				size="sm"
				w={230}
				my="md"
				color="dark"
				className=" ml-20 mb-10"
			/>

			<Stack>
				<TextInput
					label="Full Name"
					placeholder="Enter your name"
					id="fullname"
					name="fullname"
					required
					size="md"
					radius="md"
					withAsterisk
					className="w-100"
				/>
			</Stack>
		</Box>
	);
}

export default Name;

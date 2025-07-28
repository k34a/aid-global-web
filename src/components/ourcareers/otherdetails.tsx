import React from "react";
import { Stack, TextInput, Box } from "@mantine/core";

function Otherdetails() {
	return (
		<Box maw={500} mx="auto" px="xl" className="font-serif mb-5">
			<Stack>
				<div>
					<TextInput
						id="email"
						label="Email"
						name="email"
						placeholder="Enter email address"
						type="email"
						required
						radius="md"
						size="md"
						withAsterisk
						className="w-100"
					/>
				</div>
				<div>
					<TextInput
						label="Contact"
						id="contact"
						name="contact"
						placeholder="Enter contact number"
						type="tel"
						required
						radius="md"
						size="md"
						withAsterisk
						className="w-100"
					/>
				</div>

				<div>
					<TextInput
						label="Applying For"
						id="apply"
						name="apply"
						placeholder="Enter role you're applying for"
						type="text"
						required
						radius="md"
						size="md"
						withAsterisk
						className="w-100"
					/>
				</div>
			</Stack>
		</Box>
	);
}

export default Otherdetails;

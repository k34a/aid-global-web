import React from "react";
import { FileInput, Stack, Box } from "@mantine/core";

function Uploadcv() {
	return (
		<Box maw={500} mx="auto" className="font-seri mb-5">
			<Stack>
				<FileInput
					label="Upload your CV"
					placeholder="Choose file"
					radius="md"
					size="md"
					withAsterisk
					accept=".pdf,.doc,.docx"
					id="fileinput"
					name="fileinput"
					className="w-100"
					required
				/>
			</Stack>
		</Box>
	);
}

export default Uploadcv;

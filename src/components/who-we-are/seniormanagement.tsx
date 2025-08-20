"use client";

import React, { useState } from "react";
import {
	Modal,
	Container,
	Title,
	SimpleGrid,
	Center,
	Space,
} from "@mantine/core";
import { teamembers } from "@/config/team";
import TeamCard from "./teamcard";

const SeniorManagement: React.FC = () => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleOpenModal = (index: number) => {
		setSelectedIndex(index);
	};

	const handleCloseModal = () => {
		setSelectedIndex(null);
	};

	const selectedMember =
		selectedIndex !== null ? teamembers[selectedIndex] : null;

	return (
		<section id="team" className="py-10 bg-gray-50">
			<Container size="lg">
				<Center>
					<Title
						order={2}
						className="text-sky-800 mb-8 text-3xl sm:text-4xl font-bold"
					>
						Senior Management
					</Title>
				</Center>
				<Space h="lg" />
				<SimpleGrid
					cols={{ base: 1, sm: 2, md: 3 }}
					spacing="lg"
					verticalSpacing="xl"
					className="justify-center"
				>
					{teamembers.map((member, index) => (
						<TeamCard
							key={index}
							{...member}
							onClick={() => handleOpenModal(index)}
						/>
					))}
				</SimpleGrid>
				<Modal
					opened={selectedIndex !== null}
					onClose={handleCloseModal}
					centered
					size="lg"
					overlayProps={{ opacity: 0.55, blur: 3 }}
					radius="md"
					classNames={{
						body: "bg-white p-6",
						title: "font-bold",
					}}
					title={selectedMember?.name}
				>
					{selectedMember?.desc}
				</Modal>
			</Container>
		</section>
	);
};

export default SeniorManagement;

"use client";

import { useMemo, useState } from "react";
import {
	MultiSelect,
	TextInput,
	Table,
	Paper,
	ScrollArea,
	Container,
} from "@mantine/core";
import { locations } from "@/config/location";

export default function ClinicTable() {
	const [search, setSearch] = useState("");
	const [selectedStates, setSelectedStates] = useState<string[]>([]);
	const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

	// Extract unique states
	const stateOptions = useMemo(() => {
		const states = Array.from(new Set(locations.map((loc) => loc.state)));
		return states.sort().map((state) => ({ label: state, value: state }));
	}, []);

	// Extract unique districts based on selected states
	const districtOptions = useMemo(() => {
		let filtered = locations;

		if (selectedStates.length > 0) {
			filtered = filtered.filter((loc) =>
				selectedStates.includes(loc.state),
			);
		}

		const districts = Array.from(
			new Set(filtered.map((loc) => loc.district)),
		);

		return districts.sort().map((district) => ({
			label: district,
			value: district,
		}));
	}, [selectedStates]);

	// Filtered data
	const filteredClinics = useMemo(() => {
		return locations.filter((clinic) => {
			const matchesSearch =
				clinic.name.toLowerCase().includes(search.toLowerCase()) ||
				clinic.incharge.name
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				clinic.incharge.email
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				clinic.incharge.mobile.includes(search);

			const matchesState =
				selectedStates.length === 0 ||
				selectedStates.includes(clinic.state);

			const matchesDistrict =
				selectedDistricts.length === 0 ||
				selectedDistricts.includes(clinic.district);

			return matchesSearch && matchesState && matchesDistrict;
		});
	}, [search, selectedStates, selectedDistricts]);

	return (
		<Container py="xl">
			<Paper p="md">
				<div className="flex flex-col md:flex-row gap-4 mb-4">
					<MultiSelect
						data={stateOptions}
						placeholder="Filter by states"
						value={selectedStates}
						onChange={setSelectedStates}
						clearable
						searchable
						className="w-full md:w-1/3"
					/>
					<MultiSelect
						data={districtOptions}
						placeholder="Filter by districts"
						value={selectedDistricts}
						onChange={setSelectedDistricts}
						clearable
						searchable
						disabled={districtOptions.length === 0}
						className="w-full md:w-1/3"
					/>
					<TextInput
						placeholder="Search clinics by name..."
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
						className="w-full md:w-1/3"
					/>
				</div>

				<ScrollArea>
					<Table
						striped
						highlightOnHover
						withTableBorder
						withColumnBorders
					>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Clinic Name</Table.Th>
								<Table.Th>State</Table.Th>
								<Table.Th>District</Table.Th>
								<Table.Th>Incharge Name</Table.Th>
								<Table.Th>Mobile</Table.Th>
								<Table.Th>Email</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{filteredClinics.length > 0 ? (
								filteredClinics.map((clinic, idx) => (
									<Table.Tr key={idx}>
										<Table.Td>{clinic.name}</Table.Td>
										<Table.Td>{clinic.state}</Table.Td>
										<Table.Td>{clinic.district}</Table.Td>
										<Table.Td>
											{clinic.incharge.name}
										</Table.Td>
										<Table.Td>
											{clinic.incharge.mobile}
										</Table.Td>
										<Table.Td>
											{clinic.incharge.email}
										</Table.Td>
									</Table.Tr>
								))
							) : (
								<Table.Tr>
									<Table.Td
										colSpan={6}
										className="text-center py-4"
									>
										No clinics found.
									</Table.Td>
								</Table.Tr>
							)}
						</Table.Tbody>
					</Table>
				</ScrollArea>
			</Paper>
		</Container>
	);
}

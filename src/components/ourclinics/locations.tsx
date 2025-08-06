"use client";
import React, { useState } from "react";
import { locations } from "@/config/location.ts";

const ITEMS_PER_PAGE = 10;

export default function Locations() {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const filteredLocations = locations.filter((loc) =>
		(loc.clinic + loc.area)
			.toLowerCase()
			.includes(searchQuery.toLowerCase()),
	);

	const totalPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const currentLocations = filteredLocations.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE,
	);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const startEntry = startIndex + 1;
	const endEntry = Math.min(
		startIndex + ITEMS_PER_PAGE,
		filteredLocations.length,
	);

	return (
		<div className="overflow-x-auto mt-5 lg:mt-10 px-4 py-8">
			<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
				Our Clinic Locations
			</h2>

			<div className="mb-4 flex items-center gap-2">
				<input
					type="text"
					placeholder="Search by clinic or area..."
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						setCurrentPage(1); // Reset to first page on search
					}}
					className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<button
					onClick={() => setSearchQuery("")}
					className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
				>
					Clear
				</button>
			</div>

			<table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead className="bg-blue-100 text-gray-700">
					<tr>
						<th className="py-3 px-4 text-left">Clinic</th>
						<th className="py-3 px-4 text-left">Area</th>
						<th className="py-3 px-4 text-left">Location</th>
						<th className="py-3 px-4 text-left">State</th>
						<th className="py-3 px-4 text-left">Pincode</th>
					</tr>
				</thead>
				<tbody>
					{currentLocations.length === 0 ? (
						<tr>
							<td
								colSpan={5}
								className="text-center py-4 text-gray-500"
							>
								No clinics found.
							</td>
						</tr>
					) : (
						currentLocations.map((loc, idx) => (
							<tr
								key={idx}
								className={
									idx % 2 === 0 ? "bg-white" : "bg-gray-50"
								}
							>
								<td className="py-2 px-4">{loc.clinic}</td>
								<td className="py-2 px-4">{loc.area}</td>
								<td className="py-2 px-4">{loc.location}</td>
								<td className="py-2 px-4">{loc.state}</td>
								<td className="py-2 px-4">{loc.pincode}</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<div className="mt-4 text-sm text-gray-600">
				{filteredLocations.length > 0 && (
					<p>
						Showing {startEntry} to {endEntry} of{" "}
						{filteredLocations.length} entries
					</p>
				)}
			</div>
			<div className="mt-4 flex gap-2 items-center">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
				>
					Previous
				</button>
				{[...Array(totalPages)]
					.map((_, i) => (
						<button
							key={i}
							onClick={() => handlePageChange(i + 1)}
							className={`px-3 py-1 rounded ${
								currentPage === i + 1
									? "bg-blue-500 text-white"
									: "bg-gray-200 hover:bg-gray-300"
							}`}
						>
							{i + 1}
						</button>
					))
					.slice(0, 5)}
				{totalPages > 5 && <span>...</span>}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	);
}

"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationInputProps {
	numberOfPages: number;
	currentPage?: number;
}

const PaginationInput: React.FC<PaginationInputProps> = ({
	numberOfPages,
	currentPage,
}) => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const [inputValue, setInputValue] = useState("");

	// Get current page from URL or use provided currentPage
	const pageFromUrl = parseInt(searchParams.get("page") || "1");
	const actualCurrentPage = currentPage || pageFromUrl;

	useEffect(() => {
		setInputValue(actualCurrentPage.toString());
	}, [actualCurrentPage]);

	const updateUrlWithPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		if (page === 1) {
			params.delete("page");
		} else {
			params.set("page", page.toString());
		}

		router.push(`${pathName}?${params.toString()}`);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Allow empty string or numbers
		if (value === "" || /^\d+$/.test(value)) {
			setInputValue(value);
		}
	};

	const handleGoClick = () => {
		const pageNum = parseInt(inputValue);
		if (pageNum >= 1 && pageNum <= numberOfPages) {
			updateUrlWithPage(pageNum);
		} else {
			// Reset to current page if invalid
			setInputValue(actualCurrentPage.toString());
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleGoClick();
		}
	};

	const handlePrevious = () => {
		if (actualCurrentPage > 1) {
			updateUrlWithPage(actualCurrentPage - 1);
		}
	};

	const handleNext = () => {
		if (actualCurrentPage < numberOfPages) {
			updateUrlWithPage(actualCurrentPage + 1);
		}
	};

	const canGoPrevious = actualCurrentPage > 1;
	const canGoNext = actualCurrentPage < numberOfPages;

	return (
		<div className="flex items-center gap-3">
			{/* Previous Arrow */}
			<button
				onClick={handlePrevious}
				disabled={!canGoPrevious}
				className={`p-2 rounded-md transition-colors ${
					canGoPrevious
						? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
						: "text-gray-300 cursor-not-allowed"
				}`}
				aria-label="Previous page"
			>
				<ChevronLeft className="w-5 h-5" />
			</button>

			{/* Page Input Section */}
			<div className="flex items-center gap-2">
				<span className="text-gray-700">Page</span>

				<div className="relative">
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={handleKeyPress}
						className="w-12 text-center bg-transparent border-0 border-b-2 border-gray-300 focus:border-sky-500 focus:outline-none transition-colors text-gray-900 font-medium"
						min="1"
						max={numberOfPages}
					/>
				</div>

				<span className="text-gray-700">of {numberOfPages}</span>

				<button
					onClick={handleGoClick}
					className="px-3 py-1 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
				>
					Go
				</button>
			</div>

			{/* Next Arrow */}
			<button
				onClick={handleNext}
				disabled={!canGoNext}
				className={`p-2 rounded-md transition-colors ${
					canGoNext
						? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
						: "text-gray-300 cursor-not-allowed"
				}`}
				aria-label="Next page"
			>
				<ChevronRight className="w-5 h-5" />
			</button>
		</div>
	);
};

export default PaginationInput;

"use client";
import React from "react";
import DonationCard from "@/components/homepage/categories/donation-card";
import { DonationCardType } from "@/components/homepage/categories/types";

interface DonationListProps {
	cards: DonationCardType[];
}

const DonationList: React.FC<DonationListProps> = ({ cards }) => (
	<div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 px-2 sm:px-4 md:px-6">
		{cards.map((card, idx) => (
			<DonationCard key={idx} card={card} />
		))}
	</div>
);

export default DonationList;

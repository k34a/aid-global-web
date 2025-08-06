"use client";

import { ngoDetails } from "@/config/config";
import Image from "@/components/image";

const ReceiptHeader = () => {
	return (
		<div className="text-center border-b-3 pb-4 mb-6">
			<div className="relative w-24 h-24 mx-auto shrink-0">
				<Image
					src={ngoDetails.logo}
					alt={`${ngoDetails.name} Logo`}
					sizes="(max-width: 768px) 300px, 300px"
					fill
					className="object-contain"
				/>
			</div>
			<h1 className="text-2xl font-bold">{ngoDetails.name}</h1>
			<p className="text-gray-600">{ngoDetails.tagline}</p>
		</div>
	);
};

export default ReceiptHeader;

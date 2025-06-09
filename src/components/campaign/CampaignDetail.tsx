"use client";

import Image from "next/image";

interface CampaignProduct {
	id: string;
	image: string;
	title: string;
	description: string | null;
	price_per_unit: number;
	units_required: number;
	units_collected: number;
}

interface CampaignProps {
	title: string;
	description: string;
	imageUrl: string;
	products: CampaignProduct[];
}

export default function CampaignDetail({ title, description, imageUrl, products }: CampaignProps) {
	return (
		<div className="rounded-lg shadow p-4 bg-white">
			<Image src={imageUrl} alt={title} width={800} height={400} className="rounded" />
			<h2 className="text-xl font-bold mt-4">{title}</h2>
			<p className="text-gray-600 my-2">{description}</p>

			<div className="grid gap-4 md:grid-cols-2 mt-4">
				{products.map(product => (
					<div key={product.id} className="border p-4 rounded-lg">
						<p className="font-semibold">{product.title}</p>
						<p>₹{product.price_per_unit} per unit</p>
						<p>{product.units_collected}/{product.units_required} units collected</p>
					</div>
				))}
			</div>
		</div>
	);
}

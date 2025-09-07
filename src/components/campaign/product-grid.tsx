import ProductCard from "./product-card";
import type { CampaignProduct } from "@/lib/db/campaigns";
import { Grid } from "@mantine/core";

interface Props {
	campaignId: string;
	products: CampaignProduct[];
	productSelection: Record<string, number>;
	addProduct: (productId: string) => void;
	removeProduct: (productId: string) => void;
}

export default function ProductGrid(props: Props) {
	return (
		<Grid gutter="md">
			{props.products.map((product) => (
				<Grid.Col key={product.id} span={{ base: 12, sm: 6 }}>
					<ProductCard
						campaignId={props.campaignId}
						product={product}
						quantity={props.productSelection[product.id] || 0}
						onAdd={() => props.addProduct(product.id)}
						onRemove={() => props.removeProduct(product.id)}
					/>
				</Grid.Col>
			))}
		</Grid>
	);
}

"use client";

import { CampaignProduct } from "@/lib/db/campaigns";
import { Grid, Stack, Typography } from "@mantine/core";
import WhereMoneyGoes from "./where-money-goes";
import ProductGrid from "./product-grid";

interface Props {
	campaignId: string;
	html: string;
	products: Array<CampaignProduct>;
	total: number;
	selectedAmount: number;
	setAmount: (amount: number) => void;
	productSelection: Record<string, number>;
	addProduct: (productId: string) => void;
	removeProduct: (productId: string) => void;
}

export default function CampaignDescription(props: Props) {
	return (
		<Grid.Col span={{ base: 12, lg: 8 }}>
			<Stack gap="lg">
				<WhereMoneyGoes
					products={props.products}
					total={props.total}
					setAmount={props.setAmount}
					selectedAmount={props.selectedAmount}
				/>
				<ProductGrid
					campaignId={props.campaignId}
					products={props.products}
					productSelection={props.productSelection}
					addProduct={props.addProduct}
					removeProduct={props.removeProduct}
				/>
				<Typography>
					<div dangerouslySetInnerHTML={{ __html: props.html }} />
				</Typography>
			</Stack>
		</Grid.Col>
	);
}

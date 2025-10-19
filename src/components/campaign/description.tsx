"use client";

import { CampaignProduct } from "@/lib/db/campaigns";
import { Grid, Stack, Typography } from "@mantine/core";
import WhereMoneyGoes from "./where-money-goes";
import ProductGrid from "./product-grid";
import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import serialize from "dom-serializer";
import { getImageForCampaign } from "./utils";
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

export function applyImageFullPaths(
	html: string,
	getImageFullPath: (src: string) => string,
): string {
	if (!html) return html;

	const dom = parseDocument(html);
	const images = DomUtils.findAll(
		(elem) => elem.name === "img",
		dom.children,
	);

	for (const img of images) {
		const srcAttr = img.attribs?.src;
		if (srcAttr) {
			img.attribs.src = getImageFullPath(srcAttr);
		}
	}

	return serialize(dom);
}

export default function CampaignDescription(props: Props) {
	const formattedHtml = applyImageFullPaths(props.html, (src) =>
		getImageForCampaign(props.campaignId, `content/${src}`),
	);
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
					<div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
				</Typography>
			</Stack>
		</Grid.Col>
	);
}

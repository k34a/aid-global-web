"use client";

import type { CampaignProduct } from "@/lib/db/campaigns";
import {
	Accordion,
	Button,
	em,
	Flex,
	Space,
	Table,
	TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChecks, IconCurrencyRupee } from "@tabler/icons-react";

interface Props {
	products: Array<CampaignProduct>;
	total: number;
	selectedAmount: number;
	setAmount: (amount: number) => void;
}

const presetAmounts = [1100, 1500, 3000];

export default function WhereMoneyGoes(props: Props) {
	if (!props.products || props.products.length === 0) {
		return null;
	}
	const totalProductCost = props.products.reduce((sum, product) => {
		return sum + product.price_per_unit * product.units_required;
	}, 0);
	const miscCost = props.total - totalProductCost;

	return (
		<Accordion
			defaultValue="where-money-goes"
			styles={{
				root: {
					outline: "1px solid #ccc",
					borderRadius: "10px",
				},
			}}
		>
			<Accordion.Item key="where-money-goes" value="where-money-goes">
				<Accordion.Control icon={<IconChecks color="green" />}>
					Where your money goes?
				</Accordion.Control>
				<Accordion.Panel>
					<div style={{ overflowX: "scroll" }}>
						<Table striped horizontalSpacing="xs" miw={600}>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Product/Material</Table.Th>
									<Table.Th>Required Quantity</Table.Th>
									<Table.Th>Price/Unit</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{props.products.map((product, index) => {
									return (
										<Table.Tr key={index}>
											<Table.Td>{product.title}</Table.Td>
											<Table.Td>
												{product.units_required}
											</Table.Td>
											<Table.Td
												style={{
													display: "flex",
													alignItems: "center",
												}}
											>
												<IconCurrencyRupee size={16} />
												{product.price_per_unit.toLocaleString(
													"en-IN",
												)}
											</Table.Td>
										</Table.Tr>
									);
								})}
								{miscCost > 0 && (
									<Table.Tr>
										<Table.Td>
											Miscellaneous expenses
										</Table.Td>
										<Table.Td />
										<Table.Td
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<IconCurrencyRupee size={16} />
											{miscCost.toLocaleString("en-IN")}
										</Table.Td>
									</Table.Tr>
								)}
								<Table.Tr style={{ fontWeight: "bold" }}>
									<Table.Td>Total Campaign Goal</Table.Td>
									<Table.Td />
									<Table.Td
										style={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<IconCurrencyRupee size={16} />
										{props.total.toLocaleString("en-IN")}
									</Table.Td>
								</Table.Tr>
							</Table.Tbody>
						</Table>
					</div>
					<Space h="md" />
					<Flex
						align="baseline"
						justify="space-evenly"
						wrap="wrap"
						gap={10}
					>
						{presetAmounts.map((amt) => {
							const isSelected = props.selectedAmount === amt;
							const isMostDonated = amt === 1500;
							return (
								<Flex
									key={amt}
									direction="column"
									align="center"
								>
									<Button
										variant={
											isSelected ? "filled" : "outline"
										}
										size="md"
										onClick={() => props.setAmount(amt)}
										style={{ position: "relative" }}
									>
										{isMostDonated && (
											<span style={{ marginRight: 4 }}>
												&#x1F44F;
											</span>
										)}
										<IconCurrencyRupee size={14} />
										{amt.toLocaleString("en-IN")}
									</Button>
									{isMostDonated && (
										<div
											style={{
												backgroundColor: "#FF6600",
												color: "white",
												fontWeight: "bold",
												fontSize: 12,
												padding: "2px 6px",
												borderRadius: 4,
											}}
										>
											Most Donated
										</div>
									)}
								</Flex>
							);
						})}
					</Flex>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}

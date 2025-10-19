import type { CampaignProduct } from "@/lib/db/campaigns";
import {
	Box,
	Button,
	Card,
	em,
	Flex,
	Group,
	Progress,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import Image from "@/components/image";
import {
	IconCurrencyRupee,
	IconImageInPicture,
	IconInfoCircle,
	IconMinus,
	IconPlus,
} from "@tabler/icons-react";
import { getImageForCampaign } from "./utils";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
	campaignId: string;
	product: CampaignProduct;
	quantity: number;
	onAdd: () => void;
	onRemove: () => void;
}

export default function ProductCard({
	campaignId,
	product,
	quantity,
	onAdd,
	onRemove,
}: Props) {
	const percentCollected =
		(product.units_collected / product.units_required) * 100;

	const isSmallScreen = useMediaQuery(`(max-width: ${em(350)})`);

	return (
		<Card shadow="md" padding="md" radius="md" withBorder>
			<Flex
				gap="md"
				align="center"
				direction={isSmallScreen ? "column" : "row"}
			>
				{/* LEFT: Product Image */}
				{product.image ? (
					<Image
						src={getImageForCampaign(
							campaignId,
							`products/${product.id}/${product.image}`,
						)}
						alt={product.title}
						width={100}
						height={100}
						style={{ maxWidth: "100%", height: "auto" }}
					/>
				) : (
					<Box
						w={100}
						h={100}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#f0f0f0",
							borderRadius: "8px",
							overflow: "hidden",
						}}
					>
						<IconImageInPicture size={48} color="gray" />
					</Box>
				)}

				{/* RIGHT: Product Info */}
				<Stack gap={6} style={{ flex: 1 }}>
					{/* Title and optional tooltip */}
					<Group justify="space-between" align="start">
						<Title order={5}>{product.title}</Title>
						{product.description && (
							<Tooltip
								label={product.description}
								withArrow
								multiline
								w={200}
							>
								<IconInfoCircle size={16} color="gray" />
							</Tooltip>
						)}
					</Group>

					{/* Quantity Collected */}
					<Text size="sm">
						{product.units_collected} of {product.units_required}{" "}
						Quantity Obtained
					</Text>

					{/* Progress bar */}
					<Progress value={percentCollected} radius="xl" size="xs" />

					{/* Price and Add/Remove Buttons */}
					<Group justify="space-between" align="center" mt="xs">
						<Text fw={700} fz="md">
							<IconCurrencyRupee
								size={14}
								style={{ display: "inline" }}
							/>
							{product.price_per_unit}/unit
						</Text>

						{quantity > 0 ? (
							<Group gap={8}>
								<Button
									size="compact-sm"
									variant="outline"
									onClick={onRemove}
								>
									<IconMinus size={16} />
								</Button>
								<Text fw={500}>{quantity}</Text>
								<Button
									size="compact-sm"
									variant="outline"
									onClick={onAdd}
								>
									<IconPlus size={16} />
								</Button>
							</Group>
						) : (
							<Button
								variant="outline"
								radius="md"
								size="compact-md"
								onClick={onAdd}
								style={{ fontWeight: 600 }}
							>
								ADD +
							</Button>
						)}
					</Group>
				</Stack>
			</Flex>
		</Card>
	);
}

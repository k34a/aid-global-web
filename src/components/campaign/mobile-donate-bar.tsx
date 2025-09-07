import { Box, Button, TextInput, Group } from "@mantine/core";
import { IconCurrencyRupee, IconHeartFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
	amount: number;
	setAmount: (value: number) => void;
	onSubmit: () => void;
}

export function MobileDonateBar({ amount, setAmount, onSubmit }: Props) {
	const isMobile = useMediaQuery("(max-width: 1200px)");

	if (!isMobile) return null;

	return (
		<Box
			pos="fixed"
			bottom={0}
			left={0}
			right={0}
			px="md"
			py="xs"
			bg="white"
			style={{ zIndex: 1000, borderTop: "1px solid #ccc" }}
		>
			<Group gap="sm" grow>
				<TextInput
					placeholder="Enter amount"
					value={amount.toString()}
					onChange={(e) => {
						const val = parseInt(e.currentTarget.value);
						if (Number.isNaN(val)) setAmount(0);
						else setAmount(val);
					}}
					leftSection={<IconCurrencyRupee size={16} />}
				/>
				<Button
					disabled={!amount}
					onClick={onSubmit}
					leftSection={<IconHeartFilled color="red" size={16} />}
					color="sky.5"
				>
					Donate
				</Button>
			</Group>
		</Box>
	);
}

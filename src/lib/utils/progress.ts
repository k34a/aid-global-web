export const calculateProgressPercentage = (
	collected: number,
	target: number,
): number => {
	if (target <= 0) return 0;
	return Math.min(100, (collected / target) * 100);
};

export const formatProgressPercentage = (
	collected: number,
	target: number,
	decimals: number = 1,
): string => {
	const percentage = calculateProgressPercentage(collected, target);
	return percentage.toFixed(decimals);
};

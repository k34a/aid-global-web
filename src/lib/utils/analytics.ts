export const calculateProgress = (raised: number, target: number): number => {
	if (target === 0) return 0;
	return (raised / target) * 100;
};

export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-IN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

export const getInitials = (name: string | null | undefined): string => {
	if (!name || name.trim() === "") return "?";
	return name.charAt(0).toUpperCase();
};

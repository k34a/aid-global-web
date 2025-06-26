import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	variant?: "primary" | "secondary" | "ghost";
	size?: "sm" | "md" | "lg";
	type?: "button" | "submit" | "reset";
}

export function Button({
	children,
	onClick,
	disabled = false,
	className = "",
	variant = "primary",
	size = "md",
	type = "button",
}: ButtonProps) {
	const baseStyles =
		"inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary:
			"bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-md hover:shadow-lg",
		secondary:
			"bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-500",
		ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800 focus:ring-slate-500",
	};

	const sizes = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-base",
		lg: "px-6 py-3 text-lg",
	};

	const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classes}
		>
			{children}
		</button>
	);
}

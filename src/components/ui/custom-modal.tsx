import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
	className?: string;
}

interface ModalContentProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface ModalTitleProps {
	children: React.ReactNode;
	className?: string;
}

export function Modal({
	open,
	onOpenChange,
	children,
	className = "",
}: ModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onOpenChange(false);
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [open, onOpenChange]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex justify-center p-4 overflow-y-auto">
			{/* Backdrop with blur effect */}
			<div
				className="fixed inset-0 bg-white/20 backdrop-blur-sm transition-all duration-300"
				onClick={() => onOpenChange(false)}
			/>

			{/* Modal */}
			<div className={`relative z-50 w-full max-w-md my-12 ${className}`}>
				{children}
			</div>
		</div>
	);
}

export function ModalContent({ children, className = "" }: ModalContentProps) {
	return (
		<div
			className={`bg-white rounded-2xl shadow-2xl w-full border border-slate-200 overflow-y-auto max-h-[90vh] flex flex-col ${className}`}
		>
			{children}
		</div>
	);
}

export function ModalHeader({ children, className = "" }: ModalHeaderProps) {
	return (
		<div
			className={`px-6 py-4 border-b border-slate-200 flex-shrink-0 ${className}`}
		>
			{children}
		</div>
	);
}

export function ModalTitle({ children, className = "" }: ModalTitleProps) {
	return (
		<h2 className={`text-xl font-semibold text-slate-800 ${className}`}>
			{children}
		</h2>
	);
}

export function ModalCloseButton({ onClose }: { onClose: () => void }) {
	return (
		<button
			onClick={onClose}
			className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100 bg-white/90 backdrop-blur-sm shadow-sm"
		>
			<X className="w-5 h-5" />
		</button>
	);
}

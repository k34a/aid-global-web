"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
} from "@/components/ui/custom-modal";
import DonateForm from "@/components/donate/form";
import { Heart } from "lucide-react";

const StickyDonateButton: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{/* Sticky Donate Button */}
			<div className="fixed bottom-6 right-6 z-[100]">
				<Button
					onClick={() => setOpen(true)}
					variant="primary"
					size="lg"
					className="shadow-lg rounded-full flex items-center gap-2 px-6 py-3 text-lg font-bold bg-gradient-to-br from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 animate-bounce-slow"
				>
					<Heart className="w-6 h-6 mr-2 text-white fill-white" />
					Donate
				</Button>
			</div>

			{/* Modal with Donate Form */}
			<Modal open={open} onOpenChange={setOpen}>
				<ModalContent>
					<ModalHeader>
						<ModalTitle>
							<span className="flex items-center gap-2">
								<Heart className="w-6 h-6 text-orange-500" />
								Donate to Aid Global
							</span>
						</ModalTitle>
						<ModalCloseButton onClose={() => setOpen(false)} />
					</ModalHeader>
					<div className="p-4 sm:p-6">
						<DonateForm />
					</div>
				</ModalContent>
			</Modal>
		</>
	);
};

export default StickyDonateButton;

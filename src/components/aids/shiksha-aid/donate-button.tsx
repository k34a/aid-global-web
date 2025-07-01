"use client";
import { useState } from "react";

interface DonateModalButtonProps {
	label?: string;
	defaultAmount?: string;
	onConfirm?: (amount: string) => void;
}

export default function DonateModalButton({
	label = "Donate Now",
	defaultAmount = "",
	onConfirm,
}: DonateModalButtonProps) {
	const [showModal, setShowModal] = useState(false);
	const [amount, setAmount] = useState(defaultAmount);

	const handleConfirm = () => {
		if (onConfirm) onConfirm(amount);
		console.log("Donated:", amount); // placeholder
		setShowModal(false);
	};

	return (
		<>
			<button
				onClick={() => setShowModal(true)}
				className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition"
			>
				{label}
			</button>
			{showModal && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
						<h3 className="text-xl font-bold text-[#003366] mb-4">
							Enter Donation Amount
						</h3>
						<div className="flex gap-2 mb-4">
							{["500", "1000", "2500"].map((amt) => (
								<button
									key={amt}
									className="px-3 py-1 bg-orange-100 border border-orange-300 rounded-full text-[#003366] text-sm"
									onClick={() => setAmount(amt)}
								>
									₹{amt}
								</button>
							))}
						</div>

						<input
							type="number"
							min="1"
							className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
							placeholder="e.g. 500"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>

						<div className="flex justify-end gap-2">
							<button
								className="px-4 py-2 bg-gray-200 rounded"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
								onClick={handleConfirm}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

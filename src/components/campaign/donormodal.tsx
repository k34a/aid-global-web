"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalTitle,
	ModalCloseButton,
} from "@/components/ui/custom-modal";
import { Button } from "@/components/ui/custom-button";
import { Heart, Users, Sparkles, Loader2, IndianRupee } from "lucide-react";
import { BackerDetailsForCampaign } from "@/lib/db/campaigns";
import { formatTimeAgo, getInitials, getDonorTier } from "@/lib/utils/donor";

interface DonorModalProps {
	open: boolean;
	onOpenChange: (val: boolean) => void;
	campaignId: string;
}

async function getDonors(
	campaignId: string,
	page: number,
): Promise<[Array<BackerDetailsForCampaign>, boolean]> {
	const res = await fetch(
		`/api/campaigns/${campaignId}/donors?limit=10&offset=${page * 10}`,
	);
	const data = await res.json();
	if (!Array.isArray(data.backers)) {
		throw new Error("Invalid response format");
	}
	return [data.backers, data.hasMore];
}

export default function DonorModal({
	open,
	onOpenChange,
	campaignId,
}: DonorModalProps) {
	const [donors, setDonors] = useState<BackerDetailsForCampaign[]>([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);


	const fetchMoreDonors = useCallback(
		async (pageNumber: number) => {
			setLoading(true);
			const [newDonors, more] = await getDonors(campaignId, pageNumber);
			setHasMore(more);
			setDonors((prev) => [...prev, ...newDonors]);
			setPage((p) => p + 1);
			setLoading(false);
		},
		[campaignId],
	);


	useEffect(() => {
		if (open) {
			setDonors([]);
			setPage(0);
			setHasMore(true);
			fetchMoreDonors(0);
		}
	}, [open, fetchMoreDonors]);

	const totalDonation = donors.reduce((sum, donor) => sum + donor.amount, 0);

	return (
		<Modal open={open} onOpenChange={onOpenChange}>
			<ModalContent>
				<ModalCloseButton onClose={() => onOpenChange(false)} />

				<ModalHeader className="flex items-center gap-4 bg-white">
					<div className="p-3 bg-blue-500 rounded-xl shadow-md">
						<Users className="w-6 h-6 text-white" />
					</div>
					<div>
						<ModalTitle>All Supporters</ModalTitle>
						<p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
							{donors.length} supporters
							<span className="flex items-center">
								<IndianRupee className="w-3 h-3" />
								{totalDonation}
							</span>
						</p>
					</div>
				</ModalHeader>

				<div className="flex-1 overflow-y-auto min-h-0 px-6 py-4">
					<div className="space-y-3">
						{donors.length === 0 && !loading ? (
							<div className="text-center py-12">
								<Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-400" />
								<p className="text-slate-500 text-lg">
									No supporters yet
								</p>
								<p className="text-slate-400 text-sm">
									Be the first to support this campaign!
								</p>
							</div>
						) : (
							donors.map((d) => {
								const {
									icon: TierIcon,
									color,
									badgeClass,
									amountBadgeIcon: AmountIcon,
								} = getDonorTier(d.amount);

								const isTopDonor = d.amount >= 5000;

								return (
									<div
										key={d.id}
										className="bg-slate-50 rounded-xl p-3 border border-slate-200 hover:shadow-md transition-all duration-300 hover:bg-slate-100 relative overflow-hidden text-sm"
									>
										{isTopDonor && (
											<div className="absolute inset-0 bg-yellow-50 rounded-xl" />
										)}
										<div className="flex items-center gap-3 relative z-10">
											<div
												className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white font-semibold shadow-md text-sm`}
											>
												{isTopDonor ? (
													<TierIcon className="w-5 h-5" />
												) : (
													getInitials(
														d.is_anon
															? "Anonymous"
															: d.name,
													)
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center justify-between mb-1">
													<div className="flex items-center gap-2">
														<span className="font-semibold text-slate-800 text-base">
															{d.is_anon
																? "Anonymous"
																: d.name}
														</span>
													</div>
													<span className="text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
														{formatTimeAgo(
															d.created_at,
														)}
													</span>
												</div>
												<div className="flex items-center justify-between">
													<span className="text-xs text-slate-500">
														contributed with love
													</span>
													<span
														className={`font-semibold text-base px-3 py-1 rounded-full flex items-center gap-1 ${badgeClass}`}
													>
														<AmountIcon className="w-4 h-4" />
														{d.amount}
													</span>
												</div>
											</div>
										</div>
									</div>
								);
							})
						)}
					</div>
				</div>

				{hasMore && (
					<div className="px-6 py-4 border-t border-slate-200 bg-white flex-shrink-0 rounded-b-2xl">
						<Button
							variant="primary"
							className="w-full rounded-xl py-3 font-semibold"
							onClick={() => fetchMoreDonors(page + 1)}
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader2 className="w-5 h-5 mr-2 animate-spin" />
									Loading more supporters...
								</>
							) : (
								<>
									<Heart className="w-5 h-5 mr-2" />
									Load More Supporters
								</>
							)}
						</Button>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
}

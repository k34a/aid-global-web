"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/custom-button";
import DonorModal from "./donormodal";
import { Heart, Users, Sparkles, IndianRupee } from "lucide-react";
import { BackerDetailsForCampaign } from "@/lib/db/campaigns";
import { formatTimeAgo, getInitials } from "@/lib/utils/donor";

interface DonorListProps {
	campaignId: string;
	initialDonors: BackerDetailsForCampaign[];
	hasMore?: boolean;
}

export default function DonorList({
	campaignId,
	initialDonors,
	hasMore = false,
}: DonorListProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-sky-500 rounded-lg shadow-md">
					<Heart className="w-5 h-5 text-white" />
				</div>
				<div>
					<h3 className="text-xl font-bold text-slate-800">
						Recent Supporters
					</h3>
					<p className="text-sm text-slate-600 flex items-center gap-1">
						<Users className="w-4 h-4" />
						Latest contributions
					</p>
				</div>
			</div>

			<div className="space-y-3">
				{initialDonors.length === 0 ? (
					<div className="text-center py-8 text-slate-500">
						<Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
						<p>Be the first to support this campaign!</p>
					</div>
				) : (
					initialDonors.map((d, index) => (
						<div
							key={d.id}
							className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-300 hover:bg-slate-100"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md">
									{getInitials(
										d.is_anon ? "Anonymous" : d.name,
									)}
								</div>
								<div className="flex-1">
									<div className="flex items-center justify-between">
										<span className="font-semibold text-slate-800">
											{d.is_anon
												? "Anonymous Supporter"
												: d.name}
										</span>
										<span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
											{formatTimeAgo(d.created_at)}
										</span>
									</div>
									<div className="flex items-center gap-2 mt-1">
										<span className="text-sm text-slate-600">
											donated
										</span>
										<span className="font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full text-sm inline-flex items-center gap-1">
											<IndianRupee className="w-3 h-3" />
											{d.amount}
										</span>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			{initialDonors.length > 0 && hasMore && (
				<Button
					variant="primary"
					className="w-full mt-6 rounded-xl py-4 font-semibold text-base"
					onClick={() => setOpen(true)}
				>
					<Users className="w-5 h-5 mr-2" />
					View All Supporters
				</Button>
			)}

			<DonorModal
				open={open}
				onOpenChange={setOpen}
				campaignId={campaignId}
			/>
		</div>
	);
}

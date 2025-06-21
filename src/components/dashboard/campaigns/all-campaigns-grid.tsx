"use client";

import Grid from "@/components/aggrid/grid";
import { GridCellValueDataType } from "@/components/aggrid/griddatatypes";
import { RowDoubleClickedEvent } from "ag-grid-community";
import { useRouter } from "next/navigation";

interface Props {
	data: Array<Record<string, GridCellValueDataType>>;
}

const AllCampaignsGrid = (props: Props) => {
	const router = useRouter();
	return (
		<>
			<Grid
				gridData={props.data}
				onRowDoubleClicked={(event: RowDoubleClickedEvent) => {
					router.push(
						`/admin/dashboard/campaigns/${event.data["slug"]}`,
					);
				}}
				colDisplayNames={{
					id: "ID",
					title: "Title",
					description: "Description",
					slug: "Slug",
					amount: "Raising Amount",
					created_at: "Created At",
					ended_at: "Ended At",
					collection: "Amount Collected",
					backers: "# Supporters",
					unallocated_amount: "Extra Amount Collected*",
				}}
			/>
			<p className="text-sm">
				<sup>*</sup> This includes any unallocated amount from the
				donation. This happens when the donation exceeds the total value
				of selected products, or when no specific products or campaigns
				were chosen during donation.
			</p>
		</>
	);
};

export default AllCampaignsGrid;

"use client";

interface Charge {
	amount: number;
	created_at: Date;
}

type Props = {
	charges: Charge[];
};

const ChargeTable = ({ charges }: Props) => {
	if (charges.length === 0) return null;

	return (
		<div className="mb-6">
			<h2 className="text-lg font-semibold mb-4 border-b pb-2">
				Payment History
			</h2>
			<table className="w-full text-sm border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="p-2 text-left">Date</th>
						<th className="p-2 text-left">Amount (&#8377;)</th>
					</tr>
				</thead>
				<tbody>
					{charges.map((charge, idx) => (
						<tr key={idx}>
							<td className="p-2">
								{new Date(charge.created_at).toLocaleDateString(
									"en-GB",
									{
										day: "numeric",
										month: "short",
										year: "numeric",
									},
								)}
							</td>
							<td className="p-2">{charge.amount / 100}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ChargeTable;

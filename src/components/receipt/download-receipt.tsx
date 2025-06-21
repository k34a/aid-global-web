"use client";

const DownloadReceipt = () => {
	return (
		<button
			className="print:hidden px-4 py-2 bg-sky-600 text-white rounded-lg shadow hover:bg-sky-700 transition"
			onClick={() => window.print()}
		>
			Download Receipt
		</button>
	);
};

export default DownloadReceipt;

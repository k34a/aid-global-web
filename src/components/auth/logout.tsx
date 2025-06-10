"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
			});
			const data = await res.json();

			if (res.ok) {
				toast.success(data.message);
				router.push("/admin/login");
			} else {
				toast.error(data.message || "Logout failed");
			}
		} catch (err) {
			toast.error("Something went wrong");
		}
	};

	return (
		<button
			onClick={handleLogout}
			className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
		>
			Log Out
		</button>
	);
}

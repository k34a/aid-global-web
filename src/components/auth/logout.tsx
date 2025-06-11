"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
	className?: string;
}

export default function LogoutButton(props: Props) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = async () => {
		setIsLoading(true);
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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			onClick={handleLogout}
			className={props.className ?? ""}
			disabled={isLoading}
		>
			Log Out
		</button>
	);
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
	const router = useRouter();
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Failed to create account.");
				return;
			}

			toast.success("Account created successfully! Please log in.");
			router.push("/admin/login");
		} catch (err) {
			toast.error("Something went wrong.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow p-6">
				<h2 className="text-2xl font-bold text-center text-black mb-2">
					Create Account
				</h2>
				<p className="text-gray-600 text-center mb-6">
					Join as an administrator
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							value={form.name}
							onChange={handleChange}
							className="mt-1 block w-full border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-sky-200"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={form.email}
							onChange={handleChange}
							className="mt-1 block w-full border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-sky-200"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							value={form.password}
							onChange={handleChange}
							className="mt-1 block w-full border rounded px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring focus:ring-sky-200"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition disabled:opacity-50"
					>
						{loading ? "Creating..." : "Create Account"}
					</button>
				</form>

				<p className="text-sm text-center text-gray-600 mt-4">
					Already have an account?{" "}
					<Link
						href="/admin/login"
						className="text-sky-600 hover:underline"
					>
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
}

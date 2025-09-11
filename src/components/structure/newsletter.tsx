"use client";

import React, { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { subscribeEmail } from "@/lib/actions/blog/subscribe";

const Newsletter: React.FC = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email) {
			toast.error("Please enter your email");
			return;
		}

		setLoading(true);

		try {
			const result = await subscribeEmail(email);

			if (!result.success) {
				toast.error(result.message);
			} else {
				toast.success(result.message);
				setEmail("");
			}
		} catch (error) {
			console.error(error);
			toast.error("Unable to subscribe your email");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="bg-sky-600">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col lg:flex-row items-center justify-between">
					<div className="text-center lg:text-left mb-6 lg:mb-0">
						<h3 className="text-2xl font-bold mb-2 text-white">
							Stay Connected
						</h3>
						<p className="text-sky-100 max-w-md">
							Get updates on our latest programs, success stories,
							and ways to make a difference.
						</p>
					</div>

					<div className="w-full lg:w-auto flex justify-center lg:justify-end">
						<form
							onSubmit={(e) => handleSubmit(e)}
							className="flex flex-col sm:flex-row gap-3 max-w-md lg:max-w-none w-full"
						>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
								className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
								required
							/>
							<button
								type="submit"
								disabled={loading}
								className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
							>
								{loading ? "Please wait..." : "Subscribe"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Newsletter;

import type { NextConfig } from "next";

const hostname = process.env.NEXT_PUBLIC_SUPABASE_HOSTNAME;
if (!hostname) {
	throw new Error("Missing NEXT_PUBLIC_SUPABASE_HOSTNAME in .env file");
}

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: hostname,
			},
			{
				protocol: "https",
				hostname: "website-content.aidglobal.ngo",
			},
		],
	},
};

export default nextConfig;

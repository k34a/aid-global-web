"use client";
import Link from "next/link";
import { useState } from "react";

const menu = [
	{ label: "Home", path: "/" },
	{
		label: "About Us",
		children: [
			{ label: "Who Are We", path: "/about/who-we-are" },
			{ label: "Our Team", path: "/about/our-team" },
			{ label: "Our Legal", path: "/about/our-legal" },
			{ label: "Our Partners", path: "/about/our-partners" },
		],
	},
	{
		label: "Programmes",
		children: [
			{ label: "Shiksha Aid", path: "/programmes/shikshaaid" },
			{ label: "Enable Aid", path: "/programmes/enableaid" },
			{ label: "Cure Aid", path: "/programmes/cureaid" },
			{ label: "Vision Aid", path: "/programmes/visionaid" },
			{ label: "Ghar Aid", path: "/programmes/gharaid" },
			{ label: "Sakhi Aid", path: "/programmes/sakhiaid" },
		],
	},
	{
		label: "Our Clinics",
		children: [{ label: "Our Clinics India", path: "/clinics/india" }],
	},
	{
		label: "Get Involved",
		children: [
			{ label: "Volunteerism", path: "/get-involved/volunteerism" },
			{ label: "Careers", path: "/get-involved/careers" },
			{ label: "Partnership", path: "/get-involved/partnership" },
		],
	},
	{
		label: "Media",
		children: [
			{ label: "Blogs", path: "/media/blogs" },
			{ label: "Photo/Video", path: "/media/photo-video" },
		],
	},
	{ label: "Donate Us", path: "/donate" },
	{ label: "Contact Us", path: "/contact" },
];

const Header = () => {
	const [open, setOpen] = useState<string | null>(null);

	return (
		<nav style={{ padding: 16, borderBottom: "1px solid #eee" }}>
			<ul style={{ display: "flex", gap: 24, listStyle: "none" }}>
				{menu.map((item) => (
					<li
						key={item.label}
						style={{ position: "relative" }}
						onMouseEnter={() => setOpen(item.label)}
						onMouseLeave={() => setOpen(null)}
					>
						{item.children ? (
							<>
								<span style={{ cursor: "pointer" }}>{item.label}</span>
								{open === item.label && (
									<ul
										style={{
											position: "absolute",
											top: "100%",
											left: 0,
											background: "#fff",
											boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
											padding: 8,
											margin: 0,
											listStyle: "none",
											zIndex: 100,
										}}
									>
										{item.children.map((sub) => (
											<li key={sub.label}>
												<Link href={sub.path}>{sub.label}</Link>
											</li>
										))}
									</ul>
								)}
							</>
						) : (
							<Link href={item.path}>{item.label}</Link>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Header;

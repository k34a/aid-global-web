"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
	label: string;
	href: string;
	isClickable: boolean;
}

interface BreadCrumbProps {
	basePath: string;
	homePageName: string;
}

const generateBreadcrumbs = (
	pathname: string,
	basePath: string,
	homePageName: string,
): BreadcrumbItem[] => {
	const pathSegments = pathname
		.split("/")
		.filter((segment) => segment !== "");
	const breadcrumbs: BreadcrumbItem[] = [];

	// Add Dashboard as the root
	breadcrumbs.push({
		label: homePageName,
		href: basePath,
		isClickable: true,
	});

	// Build breadcrumbs from path segments
	let currentPath = "";
	const segmentsOfBasePathToAvoid = basePath
		.split("/")
		.filter((ele) => ele.length > 0);

	pathSegments.forEach((segment, index) => {
		currentPath += `/${segment}`;

		if (segmentsOfBasePathToAvoid.includes(segment)) {
			return;
		}

		const isLastSegment = index === pathSegments.length - 1;
		const capitalizedLabel =
			segment.charAt(0).toUpperCase() + segment.slice(1);

		breadcrumbs.push({
			label: capitalizedLabel,
			href: currentPath,
			isClickable: !isLastSegment, // Last segment (current page) is not clickable
		});
	});

	return breadcrumbs;
};

const Breadcrumb = (props: BreadCrumbProps) => {
	const pathname = usePathname();

	// Don't show breadcrumb on the main dashboard page
	if (pathname === "/admin/dashboard") {
		return null;
	}

	const breadcrumbs = generateBreadcrumbs(
		pathname,
		props.basePath,
		props.homePageName,
	);

	return (
		<nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 px-6 py-4 bg-gray-50 border-b">
			<Home className="w-4 h-4" />

			{breadcrumbs.map((breadcrumb, index) => (
				<React.Fragment key={breadcrumb.href}>
					{index > 0 && (
						<ChevronRight className="w-4 h-4 text-gray-400" />
					)}

					{breadcrumb.isClickable ? (
						<Link
							href={breadcrumb.href}
							className="text-blue-600 hover:text-blue-900 hover:underline transition-colors duration-200"
						>
							{breadcrumb.label}
						</Link>
					) : (
						<span className="text-gray-900 font-medium">
							{breadcrumb.label}
						</span>
					)}
				</React.Fragment>
			))}
		</nav>
	);
};

export default Breadcrumb;

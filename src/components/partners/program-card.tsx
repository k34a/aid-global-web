import type { LucideIcon } from "lucide-react";

interface ProgramCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
	highlights: string[];
}

export function ProgramCard({
	icon: Icon,
	title,
	description,
	highlights,
}: ProgramCardProps) {
	return (
		<div
			className={`
        group h-full rounded-2xl border border-transparent
        bg-green-50 p-6 transition-all
        hover:border-green-500 hover:shadow-md
      `}
		>
			{/* Icon */}
			<div
				className={`
          mb-4 flex h-12 w-12 items-center justify-center rounded-lg
          bg-green-100 text-green-700
          transition-colors group-hover:bg-green-600 group-hover:text-white
        `}
			>
				<Icon className="h-6 w-6" />
			</div>

			{/* Title + Description */}
			<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
			<p className="mt-1 text-base text-gray-600">{description}</p>

			{/* Highlights */}
			<ul className="mt-4 space-y-2">
				{highlights.map((highlight, index) => (
					<li
						key={index}
						className="flex items-start gap-2 text-sm text-gray-700"
					>
						<span
							className={`mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-green-600`}
						/>
						<span>{highlight}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

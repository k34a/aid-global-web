import Image from "next/image";

type TeamCardProps = {
	name: string;
	role: string;
	imageSrc: string;
	linkedinUrl: string;
};

export default function TeamCard({
	name,
	role,
	imageSrc,
	linkedinUrl,
}: TeamCardProps) {
	return (
		<li className="text-center border p-4 rounded-lg bg-amber-100 w-[90%] max-w-xs mx-auto sm:w-60">
			<Image
				src={imageSrc}
				alt={`${name} profile`}
				width={180}
				height={180}
				className="mx-auto rounded-full"
			/>
			<h3 className="mt-3 font-semibold">{name}</h3>
			<p className="text-indigo-600">{role}</p>
			<a
				href={linkedinUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-600 hover:underline text-sm mt-1 inline-block"
			>
				LinkedIn
			</a>
		</li>
	);
}

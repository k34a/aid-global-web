type TeamdescProps = {
	name: string;
	role: string;
	desc: string;
};

export default function TeamCardDesc({ name, role, desc }: TeamdescProps) {
	return (
		<div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center mx-auto hover:shadow-xl transition duration-300 ease-in-out">
			<h2 className="text-xl font-bold text-sky-800">{name}</h2>
			<h3 className="text-md text-gray-600">{role}</h3>
			<p className="text-sm mt-2 text-gray-700">{desc}</p>
		</div>
	);
}

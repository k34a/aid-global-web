import {
	MapPinned,
	IdCard,
	ShieldAlert,
	Factory,
	UsersRound,
	Wallet,
} from "lucide-react";
const challengesData = [
	{
		id: 1,
		title: "Migration",
		description: "Frequent migration disrupting education",

		icon: MapPinned,
	},
	{
		id: 2,
		title: "No ID or Records",
		description: "Lack of documents, ID, or school records",

		icon: IdCard,
	},
	{
		id: 3,
		title: "Unsafe Environment",
		description: "Poor sanitation and unsafe environments",

		icon: ShieldAlert,
	},
	{
		id: 4,
		title: "Child Labor & Trafficking",
		description: "Early child labor and trafficking risks",
		icon: Factory,
	},
	{
		id: 5,
		title: "Parental Resistance",
		description: "Parental unawareness and resistance",
		icon: UsersRound,
	},
	{
		id: 6,
		title: "Lack of Funding",
		description: "Limited funds for educators and facilities",
		icon: Wallet,
	},
];
export default function Challengessection() {
	return (
		<section className="bg-white py-12 px-6 rounded-2xl shadow-xl max-w-6xl mx-auto my-4">
			<h2 className="text-3xl font-sans text-center text-stone-800 mb-8">
				Challenges We Face
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{challengesData.map((challenge) => {
					const Icon = challenge.icon;
					return (
						<div
							key={challenge.id}
							className={`flex items-start gap-4 p-2 `}
						>
							<div className="p-2 bg-red-400/20 rounded-full shadow">
								<Icon className="h-5 w-5" />
							</div>
							<div>
								<h4 className="font-semibold text-[#1a1a1d]">
									{challenge.title}
								</h4>
								<p className="text-sm hidden sm:block text-gray-700">
									{challenge.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}

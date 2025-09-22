type SubscriberCounterProps = {
	count: number;
	subscriptionName: React.ReactNode;
};

export default async function SubscriberCounter({
	count,
	subscriptionName,
}: SubscriberCounterProps) {
	return (
		<section className="py-16 px-4 bg-gray-100">
			<div className="container mx-auto max-w-4xl text-center">
				{/* Title */}
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2563eb] mb-12">
					Become a part of the
					<br />
					&#8377;{subscriptionName} movement
				</h2>

				{/* Number Cards */}
				<div className="flex justify-center gap-4 mb-12">
					{count
						.toString()
						.padStart(3, "0")
						.split("")
						.map((digit, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl shadow-lg w-20 h-24 md:w-28 md:h-32 lg:w-32 lg:h-36 flex items-center justify-center"
							>
								<span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700]">
									{digit}
								</span>
							</div>
						))}
				</div>

				{/* Description */}
				<p className="text-xl md:text-2xl lg:text-2xl font-bold text-sky-500 leading-relaxed font-sans">
					Changemakers are already on board. Every transaction will
					spark a wave of hope, turning generosity into unstoppable
					global impact.
				</p>
			</div>
		</section>
	);
}

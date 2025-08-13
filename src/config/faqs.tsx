import Link from "next/link";
import type { FaqItem } from "@/components/faq";

export const oneRupeeFaqs: FaqItem[] = [
	{
		question: "What is the Rs.1 Warrior movement?",
		answer: (
			<>
				It&apos;s a powerful grassroots campaign where giving just Rs.1
				a day becomes a collective force - transforming tiny acts of
				generosity into waves of lasting change across communities.
			</>
		),
	},
	{
		question: "How does Rs.1 a day make real impact?",
		answer: (
			<>
				Your consistent micro-donations, pooled with those of thousands,
				become a reliable fund for education, food, shelter, healthcare,
				and more - delivering meaningful, sustained hope.
			</>
		),
	},
	{
		question: "Where does my Rs.1 go?",
		answer: (
			<>
				Your contribution supports seven core programs of Aid Global
				Foundation:
				<ul className="list-disc list-inside">
					<li>
						<b>ShikshaAid</b> - Education support and supplies
					</li>
					<li>
						<b>HungerAid</b> - Meals and ration kits
					</li>
					<li>
						<b>EnableAid</b> - Help for persons with disabilities
					</li>
					<li>
						<b>CureAid</b> - Medical aid and health access
					</li>
					<li>
						<b>VisionAid</b> - Eye care and treatments
					</li>
					<li>
						<b>GharAid</b> - Shelter, clothing, and hygiene kits
					</li>
					<li>
						<b>SakhiAid</b> - Women&apos;s dignity and empowerment
						initiatives
					</li>
				</ul>
			</>
		),
	},
	{
		question: "Why do I see Rs. 7 when trying to subscribe?",
		answer: (
			<>
				We process all our donations via{" "}
				<Link
					href="https://www.razorpay.com"
					target="_blank"
					rel="noreferrer noopener"
					className="text-sky-700 hover:text-sky-600 hover:underline"
				>
					Razorpay
				</Link>{" "}
				for ensuring safety and security of our donors. Razorpay only
				supports billing on a weekly basis - so you donate an equivalent
				Rs. 7 every week.
			</>
		),
	},
	{
		question: "How can I inspire others to join?",
		answer: (
			<>
				After signing up, you will receive a personal referral link.
				Share it with friends, family, or coworkers - each person you
				bring aboard multiplies your impact and helps the movement grow
				faster.
			</>
		),
	},
	{
		question: "Who is eligible to become a Rs.1 Warrior?",
		answer: (
			<>
				Anyone with Rs.1 to spare. Whether you are a student, homemaker,
				professional, retiree, or dreamer - you have the power to
				contribute and make a difference.
			</>
		),
	},
	{
		question: "How can I get more info or support?",
		answer: (
			<>
				In case you need more info on this program, feel free to reach
				out to us
				<Link
					href="/contact"
					className="py-1 px-2 border-sky-400 border-2 rounded-sm ml-2 hover:bg-sky-400"
				>
					Contact us
				</Link>
			</>
		),
	},
];

export const hundredRupeeFaqs: FaqItem[] = [
	{
		question: "What is Rs.100 Club?",
		answer: (
			<>
				The Rs.100 Club is a monthly giving program by Aid Global
				Foundation, where members contribute just Rs.100 per month to
				support its life-changing programs:
				<ul>
					<li>ShikshaAid - Education support</li>
					<li>HungerAid - Food and nutrition</li>
					<li>EnableAid - Disability assistance</li>
					<li>CureAid - Healthcare services</li>
					<li>VisionAid - Eye care & spectacles</li>
					<li>GharAid - Shelter & hygiene kits</li>
					<li>SakhiAid - Women empowerment</li>
				</ul>
			</>
		),
	},
	{
		question: "How does Rs.100 create a real and lasting impact?",
		answer: (
			<>
				Rs.100 might not even buy you a cup of coffee today - but when
				combined with thousands of others, it becomes a lifeline. Your
				Rs.100 can put a meal on someone&apos;s plate, a book in a
				child&apos;s hands, a pair of spectacles on someone&apos;s eyes,
				or medicine in the hands of a patient who can&apos;t afford it.
				This is the power of collective giving - small steps creating
				big change.
			</>
		),
	},
	{
		question: "Who can join?",
		answer: (
			<>
				Anyone - students, professionals, homemakers, or senior citizens
				- can join. All it takes is the will to change lives.
			</>
		),
	},
	{
		question: "How do I contribute?",
		answer: (
			<>
				Simply set up a secure recurring donation online through UPI,
				debit/credit card, or net banking. Contributions are
				auto-deducted every month, and you can cancel anytime.
			</>
		),
	},
	{
		question: "Will I receive updates?",
		answer: (
			<>
				Yes! Members get:
				<ul>
					<li>Quarterly impact reports</li>
					<li>Photos & stories from the ground</li>
					<li>Invites to live sessions, webinars & events</li>
					<li>A digital supporter badge to share online</li>
				</ul>
			</>
		),
	},
	{
		question: "Is my donation tax exempt?",
		answer: (
			<>
				Yes, donations are eligible for benefits under Section 80G of
				the Income Tax Act. You will get an official receipt.
			</>
		),
	},
	{
		question: "How can I inspire more people to join?",
		answer: (
			<>
				Your voice is powerful. Share The Rs.100 Club with your friends,
				family, colleagues, and on social media. Tell them the stories
				of lives changed. Invite them to join alongside you - because
				when more hearts come together, the ripple of kindness becomes a
				wave of transformation.
			</>
		),
	},
	{
		question: "How can I get more info or support?",
		answer: (
			<>
				In case you need more info on this program, feel free to reach
				out to us
				<Link
					href="/contact"
					className="py-1 px-2 border-sky-400 border-2 rounded-sm ml-2 hover:bg-sky-400"
				>
					Contact us
				</Link>
			</>
		),
	},
];

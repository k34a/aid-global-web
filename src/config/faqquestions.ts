import { ReactNode } from "react";

interface FAQItem {
	question: string;
	answer: string | ReactNode;
	type?: string;
}

export const questionqa: FAQItem[] = [
	{
		question: "What is the \u20B91 Warrior movement?",
		answer: `Its a powerful grassroots campaign where giving just \u20B91 a day becomes a collective force \u2014 transforming tiny acts of generosity into waves of lasting change across communities.`,
	},
	{
		question: "How does \u20B91 a day make real impact?",
		answer: `Your consistent micro-donations, pooled with those of thousands, become a reliable fund for education, food, shelter, healthcare, and more \u2014 delivering meaningful, sustained hope.`,
	},
	{
		question: "Where does my \u20B91 go?",
		answer: `Your contribution supports seven core programs of Aid Global Foundation:

* ShikshaAid \u2014 Education support and supplies
* HungerAid \u2014 Meals and ration kits
* EnableAid \u2014 Help for persons with disabilities
* CureAid \u2014 Medical aid and health access
* VisionAid \u2014 Eye care and treatments
* GharAid \u2014 Shelter, clothing, and hygiene kits
* SakhiAid \u2014 Womens dignity and empowerment initiatives
`,
	},
	{
		question: "Can I set this up as a recurring donation?",
		answer: `Absolutely. Choose a recurring plan like \u20B91/day or \u20B97/week, and your contribution becomes an ongoing commitment to change. Its automatic, impactful, and effortless.`,
	},
	{
		question: "How can I inspire others to join?",
		answer: `After signing up, you will receive a personal referral link. Share it with friends, family, or coworkers \u2014 each person you bring aboard multiplies your impact and helps the movement grow faster.`,
	},
	{
		question: "Who is eligible to become a \u20B91 Warrior?",
		answer: `Anyone with \u20B91 to spare. Whether you are a student, homemaker, professional, retiree, or dreamer \u2014 you have the power to contribute and make a difference.`,
	},
	{
		question: "How can I get more info or support?",
		answer: "Visit https://www.aidglobal.ngo/1rupee to sign up or learn more. For help, email info@aidglobal.ngo or call +91-9373469754",
		type: "contact",
	},
];

export const questionqa100: FAQItem[] = [
	{
		question: "What is \u20B9100 club?",
		answer: `The \u20B9100 Club is a monthly giving program by Aid Global Foundation, where members contribute just \u20B9100 per month to support its life-changing programs:

* ShikshaAid \u2014 Education support
* HungerAid \u2014 Food and nutrition
* EnableAid \u2014 Disability assistance
* CureAid \u2014 Healthcare services
* VisionAid \u2014 Eye care & spectacles
* GharAid \u2014 Shelter & hygiene kits
* SakhiAid \u2014 Women empowerment`,
	},
	{
		question: "How does \u20B9100 create a real and lasting impact?",
		answer: `\u20B9100 might not even buy you a cup of coffee today\u2014but when combined with thousands of others, it becomes a lifeline. Your \u20B9100 can put a meal on someones plate, a book in a childs hands, a pair of spectacles on someones eyes, or medicine in the hands of a patient who cant afford it. This is the power of collective giving\u2014small steps creating big change.`,
	},
	{
		question: "Who can join?",
		answer: `Anyone\u2014students, professionals, homemakers, or senior citizens\u2014can join. All it takes is the will to change lives.`,
	},
	{
		question: "How do I contribute?",
		answer: `Simply set up a secure recurring donation online through UPI, debit/credit card, or net banking. Contributions are auto-deducted every month, and you can cancel anytime.`,
	},
	{
		question: "Will I receive updates?",
		answer: `Yes! Members get:

* Quarterly impact reports
* Photos & stories from the ground
* Invites to live sessions, webinars & events
* A digital supporter badge to share online.`,
	},
	{
		question: "Is my donation tax exempt?",
		answer: `Yes, donations are eligible for benefits under Section 80G of the Income Tax Act. You will get an official receipt.`,
	},
	{
		question: "How can I inspire more people to join?",
		answer: `Your voice is powerful. Share The \u20B9100 Club with your friends, family, colleagues, and on social media. Tell them the stories of lives changed. Invite them to join alongside you\u2014because when more hearts come together, the ripple of kindness becomes a wave of transformation.`,
	},
	{
		question: "How can I get more info or support?",
		answer: "Visit https://www.aidglobal.ngo/1rupee to sign up or learn more. For help, email info@aidglobal.ngo or call +91-9373469754",
		type: "contact",
	},
];

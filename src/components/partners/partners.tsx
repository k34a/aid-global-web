"use client";
import Image from "@/components/image";
import { STATIC_IMAGE_HOST } from "@/config/config";
import PartnerSay from "./partner-testimonial";
import Link from "next/link";
import { HeartPlus } from "lucide-react";
import { NotepadText } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { partners } from "@/config/partners";
import CorporatePartners from "./corporate-partners";
import ContactForm from "./contact-form";
const bannerTop = `${STATIC_IMAGE_HOST}partners/banner-top.webp`;
const bannerMiddle = `${STATIC_IMAGE_HOST}partners/banner-middle.webp`;
const bannerBottom = `${STATIC_IMAGE_HOST}partners/banner-bottom.webp`;
const brushPatch = `${STATIC_IMAGE_HOST}partners/brush-patch.webp`;
const wayToParticipate = [
	{
		image: `${STATIC_IMAGE_HOST}partners/partner-model-1.webp`,
		heading: "Corporate Social Responsibility",
		subheading: [
			{
				title: "Adopt A Project",
				description:
					"AGF works with 144 local projects across 20 states in the areas of education, health, nutrition, safety and protection as well as participation. You can adopt one or more of our projects that fit your CSR needs in terms of geographical location and area of intervention. AGF will be responsible for monitoring the program, providing programmatic direction and technical expertise to project staff and sending project impact reports periodically.",
			},
			{
				title: "Corporate Donations",
				description:
					"You can make a lump sum donation towards a specific cause that your company would like to support. From education, child labour and child marraige to malnutrition, healthcare and gender inequality - you have a wide array of causes to choose from since AGF works on all areas of children's rights. Your donation would be directed towards AGF's programs which address your preferred cause.",
			},
		],
		button: {
			label: "I'd Like To Know More!",
			url: "",
		},
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/partner-model-2.webp`,
		heading: "Brand Building",
		subheading: [
			{
				title: "Cause Related Marketing (CRM)",
				description:
					"When you integrate your marketing efforts with a cause, you not only help create social impact but also build incredible goodwill for your brand. Partnering with AGF for a cause-related marketing campaign will help you drive purchase behaviour and meet your business objectives - all the while contributing to a really good cause!",
			},
			{
				title: "Event Sponsorships & Participation",
				description:
					"AGF organizes several events (marathons, cyclothons, walkathons and soccer tournaments etc.) across the year to raise awareness for children's rights. You can come on board as one of the event sponsors to support the cause and get visibility for your brand or pledge a fixed amount to include a set number of your employees as participants.",
			},
			{
				title: "Donation Boxes",
				description:
					"You can enable AGF to place physical/digital donation boxes at your office premises or retail outlets to help your employees/customers contribute to the cause. These will be co-branded and thus reflect your association with the cause for children's rights.",
			},
		],
		button: {
			label: "I'd Like To Know More!",
			url: "",
		},
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/partner-model-3.webp`,
		heading: "Employee Engagement",
		subheading: [
			{
				title: "Payroll Giving",
				description:
					"AGF's payroll giving program offers an efficient way for your employees to feel connected to your organization's social ethic. You can encourage your employees to contribute a certain amount from their monthly salary towards changing children's lives - you can also choose to provide a matching grant to encourage them to give more.",
			},
			{
				title: "Corporate Volunteering",
				description:
					"Volunteering is a great addition to your employee engagement program. Your employees can choose to volunteer at our projects by teaching, skill building, aiding documentation, technology training, fundraising etc. - small ways to contribute that make a big difference!",
			},
		],
		button: {
			label: "I'd Like To Know More!",
			url: "",
		},
	},
];
const partnerList = [
	{
		image: `${STATIC_IMAGE_HOST}partners/CorpPartners/heromoto.webp`,
		title: "Marathons for good",
		desc: "Hero Motocorp has been supporting several AGF projects across Delhi since the last 5 years. They have enabled AGF to run child activity centers, digital centers as well as sports and theatre groups that encourage children to stay in school and speak out against child protection issues in their communities. Hero Motocorp also raises funds for AGF at the Airtel Half Delhi Marathon by enabling over 400 of their employees to run for AGF every year.",
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/CorpPartners/hdfc.webp`,
		title: "Incentivizing desired consumer behaviour",
		desc: "HDFC Bank Credit Cards raised funds for AGF by rewarding increased spending behaviour amongst their credit card customers. For every HDFC Bank credit cardholder who spent Rs. 15000 per month for 3 consecutive months, HDFC Bank donated to AGF on their behalf. This campaign for a cause inspired over 6 Lac cardholders to participate and helped HDFC Bank garner a lot of goodwill for their brand.",
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/CorpPartners/oracle-logo.webp`,
		title: "Empowering Girls with Education",
		desc: "Oracle partners with AGF to empower nearly 6,500 girls from underprivileged areas in Raichur, Bangalore, and Chennai by ensuring access to quality primary education, facilitating smooth grade transitions, and supporting uninterrupted schooling up to Grade XII. The partnership also aims to build the agency of adolescent girls by enhancing their capacities and promoting self-esteem and leadership skills, enabling them to influence change at individual, social, and systemic levels.",
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/CorpPartners/marks-spencer.webp`,
		title: "Enabling check-out charity",
		desc: "Marks & Spencer partnered with AGF to launch a check out charity drive across all its stores in India. Each customer was prompted by store cashiers to add an amount of their choice to their bill as a donation to AGF. At the end of the campaign, Marks & Spencer enabled over 5 Lac customers to participate in the drive and reinforced their identity as a socially responsible brand that supports happy childhoods.",
	},
];
const PartnerTestimonialList = [
	{
		image: `${STATIC_IMAGE_HOST}partners/Testimonial/partner-testimonial-2.webp`,
		quote: "We chose AGF as our CSR program partner on the basis of their reputation and long track record of doing sustainable work in the area of ensuring children's rights. Over the past 4 decades, AGF has partnered with NGOs and communities across India and has made a difference to the lives of millions of children.",
		name: "Pooja Khan",
		title: "AVP - Corporate Communications",
		logo: `${STATIC_IMAGE_HOST}partners/CorpPartners/heromoto.webp`,
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/Testimonial/gaurav-dewan.webp`,
		quote: "Oracle is committed to strengthening communities in which we operate around the world, and organizations like AGF are instrumental in helping us fulfill that commitment in India. AGF's programs are helping ensure that children across India are able to achieve their full potential, and we are proud to support their efforts by giving and volunteering",
		name: "Colleen Cassity",
		title: "Executive Director",
		logo: `${STATIC_IMAGE_HOST}partners/CorpPartners/hdfc.webp`,
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/Testimonial/rp-yadav.webp`,
		quote: "Vikram Solar is happy and proud to be associated with the Swachch Urja Ujjwal Bhavishya initiative in collaboration with AGF that has been sensitizing children of this area, and through them, the larger community, by educating them on the benefits of adapting the sustainable model of affordable clean green energy in changing their way of life. It is encouraging to see the silent winds of change gradually blowing into the remote villages of Mograhat that is gradually progressing towards building a sustainable, self-sufficient and viable community",
		name: "Gyanesh Chaudhary",
		title: "Chairman & Managing Director",
		logo: `${STATIC_IMAGE_HOST}partners/CorpPartners/oracle-logo.webp`,
	},
	{
		image: `${STATIC_IMAGE_HOST}partners/Testimonial/vijay-sethi.webp`,
		quote: "AGF is playing a significant role in managing a project component of our Educate to Empower program - designed with the purpose of imbibing life skills in children and also empowering them with a meaningful education. This partnership helped us reach over 13000 children and ensured a significant change in their lives. AGF's approach towards addressing fundamental issues with regard to schooling of children have been noteworthy. Heartiest congratulations to team AGF for the completion of another good year and best wishes for the journey ahead.",
		name: "Vijay Sethi",
		title: "CIO, CHRO & Head CSR",
		logo: `${STATIC_IMAGE_HOST}partners/CorpPartners/marks-spencer.webp`,
	},
];

function Partners() {
	return (
		<section className="overflow-x-hidden">
			<div className="flex flex-col items-center">
				<div className="w-full max-w-xl px-4 sm:px-0 text-center z-10">
					<h1 className="font-semibold text-2xl sm:text-4xl py-5 border-b-2 border-b-blue-400">
						It&apos;ll take{" "}
						<span className="text-blue-400 italic">
							each one of us
						</span>{" "}
						to create lasting change
					</h1>
					<p className="text-sm sm:text-base">
						We believe that corporate partnerships are not only a
						way to help brands meet their CSR objectives, but also
						create sustainable impact for India&apos;s children.
					</p>
				</div>
				<div className="w-full mt-4 relative">
					<Image
						width={900}
						height={700}
						src={bannerTop}
						alt="Top-banner"
						className="w-full object-cover z-0"
					/>
					<div className="absolute h-20 sm:h-40 z-1 flex flex-col bg-white items-center left-1/2 -translate-1/2 w-[90vw] sm:w-[65vw] p-5 rounded-xl shadow-[0px_-50px_30px_1px_#00000024]">
						<h2 className="text-2xl sm:text-3xl font-semibold py-2 text-center">
							Different Ways To Partner With Us
						</h2>
						<p className="text-sm sm:text-base text-center">
							We have a wide range of partnership options for you
							to choose from; all of which are customizable to
							meet your CSR goals.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-20 py-10 px-4 max-w-7xl mx-auto mt-40 sm:mt-20">
				{wayToParticipate.map((res, index) => (
					<div
						key={index}
						className={`flex flex-col ${
							index % 2 ? "sm:flex-row-reverse" : "sm:flex-row"
						} items-center gap-8`}
					>
						<div className=" w-full sm:w-1/2">
							<div className="flex items-center justify-center">
								<Image
									src={brushPatch}
									width={700}
									height={851}
									className="relative w-[300px] h-[400px] sm:w-[430px] sm:h-[550px]"
									alt=""
								/>
								<Image
									src={res.image}
									width={700}
									height={851}
									className=" absolute rounded-2xl w-[200px] sm:w-[360px] sm:h-[480px] object-cover z-3"
									alt=""
								/>
							</div>
						</div>
						<div className="flex flex-col w-full sm:w-1/2 gap-4">
							<h2 className="text-2xl sm:text-3xl font-semibold sm:text-start text-center">
								{res.heading}
							</h2>
							{res.subheading.map((sub, i) => (
								<div key={i}>
									<h3 className="text-lg font-semibold py-1 sm:text-start text-center">
										{sub.title}
									</h3>
									<p className="sm:text-start text-center text-sm sm:text-base text-zinc-600">
										{sub.description}
									</p>
								</div>
							))}
							{res.button.url && (
								<Link
									href={res.button.url}
									className="bg-blue-500 text-white rounded-full w-fit px-4 py-2 border-4 border-white hover:border-blue-300 transition"
								>
									{res.button.label}
								</Link>
							)}
						</div>
					</div>
				))}
			</div>

			<Image
				src={bannerMiddle}
				alt="banner-middle"
				width={1200}
				height={400}
				className="w-full object-cover"
			/>

			<div className="text-center text-2xl sm:text-3xl font-semibold py-10 px-4">
				{"How India's brands "}
				<span className="text-blue-400">have come together</span> for
				{" India's children"}
			</div>

			<CorporatePartners partners={partnerList} />

			<div className="py-10">
				<h2 className="font-semibold text-center text-2xl sm:text-3xl py-3">
					What <span className="text-blue-400">Our partners</span>{" "}
					have to say
				</h2>
				<div className="flex justify-center">
					<PartnerSay testimonial={PartnerTestimonialList} />
				</div>
			</div>

			<div className="flex flex-col items-center py-10 px-4">
				<h2 className="font-semibold text-2xl sm:text-3xl text-center pb-5">
					Our Partners & Supporters
				</h2>
				<div className="flex flex-wrap justify-center gap-4 w-full max-w-7xl">
					{partners.map((image, index) => (
						<Image
							width={200}
							height={100}
							src={image.imageSrc}
							key={index}
							className="hover:scale-105 transition-all duration-300 w-40 sm:w-70 border-2 p-2 object-contain"
							alt={image.name}
						/>
					))}
				</div>
			</div>

			<Image
				width={900}
				height={700}
				src={bannerBottom}
				alt="bottom-banner"
				className="w-full object-cover"
			/>

			<ContactForm />

			<div className="flex flex-col sm:flex-row justify-center gap-6 py-10 px-4 text-sm text-zinc-600">
				<div className="flex gap-2 items-start">
					<HeartPlus size={28} className="text-blue-400" />
					<p>
						All our efforts are made possible only because of your
						support
					</p>
				</div>
				<div className="flex gap-2 items-start">
					<NotepadText size={28} className="text-blue-400" />
					<p>
						Your donations are tax exempted under 80G of the Indian
						Income Tax Act
					</p>
				</div>
				<div className="flex gap-2 items-start">
					<LockKeyhole size={28} className="text-blue-400" />
					<p>
						Your donation transactions are completely safe and
						secure
					</p>
				</div>
			</div>
		</section>
	);
}

export default Partners;

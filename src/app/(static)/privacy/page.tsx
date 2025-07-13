import { ngoDetails } from "@/config/config";
import { Globe, MailCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Privacy Policy",
};

export default function PrivacyPolicy() {
	return (
		<main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
			<h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

			<p className="mb-4">
				{ngoDetails.name} is committed to the ethical collection,
				retention, and use of information that you provide about
				yourself (&ldquo;Personal Information&rdquo;) on this site{" "}
				<Link href="/" className="hover:underline text-sky-700">
					{ngoDetails.contact.website}
				</Link>{" "}
				(&ldquo;Site&rdquo;).
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Personal Information
			</h2>
			<p className="mb-4">
				Your Personal Information may comprise the following:
			</p>
			<ul className="list-disc pl-6 mb-4 space-y-1">
				<li>Your name</li>
				<li>Your email and mailing address</li>
				<li>Your telephone number</li>
				<li>Your payment processing details</li>
				<li>Limited personal details</li>
				<li>Any other data as {ngoDetails.name} may require</li>
			</ul>

			<p className="mb-4">
				The following Privacy Policy sets forth our understanding with
				you on the collection, use, and protection of your Personal
				Information. Please read the entire Privacy Policy.
			</p>

			<p className="mb-4 font-medium">
				YOUR USE OF THE WEBSITE CONSTITUTES YOUR CONSENT TO ALL THE
				TERMS AND CONDITIONS CONTAINED IN THIS PRIVACY POLICY (AS
				AMENDED FROM TIME TO TIME) AND YOU SHALL BE BOUND BY THE SAME.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">Site Browsing</h2>
			<p className="mb-4">
				You may browse the Site anonymously. However, you may not be
				able to access certain sections or interact with us without
				supplying Personal Information.
			</p>

			<p className="mb-4">
				While browsing, the Site may record some general information
				such as:
			</p>
			<ul className="list-disc pl-6 mb-4 space-y-1">
				<li>Date and time of visit</li>
				<li>Referring website address</li>
				<li>Browser type</li>
				<li>Page hit count</li>
			</ul>

			<p className="mb-4">
				This data (&ldquo;General Information&rdquo;) is not Personal
				Information and is used for analytics, trend analysis, and
				public interest gauging. It may be shared at the discretion of{" "}
				{ngoDetails.name}.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Usage of Information
			</h2>
			<p className="mb-4">Personal Information is used internally for:</p>
			<ul className="list-disc pl-6 mb-4 space-y-1">
				<li>
					Sending updates, annual reports, and appreciation emails
				</li>
				<li>Processing donations</li>
				<li>Maintaining internal donor/volunteer records</li>
				<li>Evaluating and improving the Site and activities</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Disclosure of Personal Information
			</h2>
			<p className="mb-4">
				Access is limited to authorized personnel and service providers.
				It may also be shared with affiliated entities, while retaining
				ownership and discretion over what is shared.
			</p>

			<p className="mb-4">
				{ngoDetails.name} is not liable for misuse of your Personal
				Information by third parties not under its employment.
			</p>

			<p className="mb-4">
				Personal Information may be disclosed without notice to comply
				with legal requests, protect the Site, fulfill requests, or
				ensure public safety.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">Security</h2>
			<p className="mb-4">
				{ngoDetails.name} uses up-to-date security measures, but does
				not provide express or implied warranties for the same.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Links to Other Websites
			</h2>
			<p className="mb-4">
				This Privacy Policy does not cover external websites linked from
				the Site. Users are advised to review privacy policies of any
				external websites visited.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Variation of the Privacy Policy
			</h2>
			<p className="mb-4">
				{ngoDetails.name} reserves the right to modify the Privacy
				Policy at any time. Your continued use of the Site constitutes
				acceptance of such changes.
			</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">
				Communicating with Us
			</h2>
			<p className="mb-4">
				If required, we may contact you via telephone, email, or mail.
				For questions or concerns about this Privacy Policy, reach us
				at:
			</p>

			<ul className="pl-6 space-y-1">
				<li className="flex items-center gap-3">
					<MailCheck size={14} /> Email:{" "}
					<a
						href={`mailto:${ngoDetails.contact.email}`}
						className="text-blue-600 hover:underline"
					>
						{ngoDetails.contact.email}
					</a>
				</li>
				<li className="flex items-center gap-3">
					<Globe size={14} /> Website:{" "}
					<a
						href={ngoDetails.contact.website}
						className="text-blue-600 hover:underline"
					>
						{ngoDetails.contact.website}
					</a>
				</li>
			</ul>
		</main>
	);
}

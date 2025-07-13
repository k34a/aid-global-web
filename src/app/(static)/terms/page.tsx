import { ngoDetails } from "@/config/config";
import { Globe, MailCheck } from "lucide-react";

export const metadata = {
	title: "Terms and Conditions",
};

export default function TermsPage() {
	return (
		<main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
			<h1 className="text-3xl font-semibold mb-6">
				Terms and Conditions
			</h1>

			<p className="mb-4">
				Use of this website is provided by{" "}
				<strong>{ngoDetails.name}</strong> subject to the following
				Terms and Conditions:
			</p>

			<ol className="list-decimal pl-6 space-y-4 mb-8">
				<li>
					By using this website, you are accepting these Terms and
					Conditions. They are effective from your first visit.
				</li>
				<li>
					{ngoDetails.name} may change these Terms and Conditions from
					time to time. Your continued use of the website indicates
					your acceptance of the Terms and Conditions in force at the
					time of use.
				</li>
				<li>
					{ngoDetails.name} reserves the right to change the content
					of the website at any time.
				</li>
				<li>
					{ngoDetails.name} has taken every precaution to ensure that
					the content of this website is accurate and legally correct
					at the time of publication. If you believe any content is
					inaccurate, please contact us at{" "}
					<a
						href={`mailto:${ngoDetails.contact.email}`}
						className="text-blue-600 hover:underline"
					>
						{ngoDetails.contact.email}
					</a>
					.
				</li>
				<li>
					{ngoDetails.name} accepts no liability for any loss or
					damage, including personal injury, resulting from the use of
					this website.
				</li>
				<li>
					{ngoDetails.name} makes all reasonable efforts to ensure
					that malware or viruses are not transmitted from this
					website. However, this cannot be guaranteed. We recommend
					you take appropriate safeguards to protect your IT equipment
					before downloading any information or files.
				</li>
				<li>
					{ngoDetails.name} will not accept liability for any damage
					caused by viruses. Links to other websites do not imply
					endorsement or approval of their content. We accept no
					liability for malware or viruses from linked websites.
				</li>
				<li>
					Please request permission before using our logos or other
					branded materials. We reserve the right to request removal
					of our logo from websites or materials if it&apos;s not in
					our interests.
				</li>
				<li>
					Our downloadable documents and web pages are provided for
					personal use. You may copy or print them for private
					purposes (e.g., education), but may not modify or use them
					commercially without our prior written consent.
				</li>
				<li>
					Images and photos used on this website are the property of{" "}
					{ngoDetails.name} or third-party copyright holders. They may
					not be used without written permission.
				</li>
				<li>
					If any conflict arises between these Terms and specific
					rules or terms relating to particular material, the latter
					shall prevail.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Contact Us</h2>
			<p className="mb-4">
				If you have any questions about these Terms and Conditions,
				please contact us at:
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

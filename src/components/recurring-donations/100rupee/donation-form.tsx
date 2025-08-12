import { Alert, Text } from "@mantine/core";
import { IndianRupee, Check, Info, Shield } from "lucide-react";
import { STATIC_IMAGE_HOST } from "@/config/config";
import Image from "@/components/image";
import SubscriptionForm from "@/components/recurring-donations/form";

export default function RecurringDonationForm() {
	return (
		<section id="recurring-donation-form" className="py-20 bg-white">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
						Ready to Make an Impact?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Join the{" "}
						<span className="inline-flex items-baseline gap-1">
							<IndianRupee className="w-4 h-4 relative top-[1px] text-gray-600" />
							100 Club
						</span>{" "}
						today and become part of a nationwide giving movement
						that transforms lives, one month at a time.
					</p>
				</div>

				{/* Trust and Impact Image */}
				<div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
					<Image
						src={`${STATIC_IMAGE_HOST}home-page/aids/intro.webp`}
						alt="People making a difference together"
						width={800}
						height={300}
						className="w-full h-[250px] object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
					<div className="absolute bottom-6 left-6 right-6 text-white">
						<p className="text-xl font-semibold">
							Your contribution creates real change
						</p>
						<p className="text-sm opacity-90">
							Join thousands of members making a difference
						</p>
					</div>
				</div>

				<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
					<SubscriptionForm
						plan_id="ac1ad332-5ce0-4fdc-a808-84dbc29f8701"
						footer={
							<div className="md:col-span-2 space-y-4 mt-2 text-sm text-gray-700">
								<Alert
									icon={<Shield size={16} />}
									color="green"
									className="rounded-lg"
								>
									<Text size="sm">
										<strong>Tax Exemption:</strong> Provide
										your PAN number and complete address to
										receive tax exemption benefits under
										Section 80G of the Income Tax Act.
									</Text>
								</Alert>

								<Alert
									icon={<Info size={16} />}
									color="blue"
									className="rounded-lg"
								>
									<Text size="sm">
										<strong>
											Recurring Payment Setup:
										</strong>{" "}
										This will set up a monthly recurring
										donation of Rs. 100. Your payment method
										will be saved for automatic monthly
										charges. You can cancel anytime by
										contacting us.
									</Text>
								</Alert>

								<Alert
									icon={<Check size={16} />}
									color="green"
									className="rounded-lg"
								>
									<Text size="sm">
										<strong>What happens next:</strong>{" "}
										After payment confirmation, your
										recurring donation will be activated.
										You&apos;ll be charged Rs. 100 monthly
										and receive email confirmations for each
										payment. You can manage your recurring
										donations through your account.
									</Text>
								</Alert>
							</div>
						}
						submitButton={
							<>
								Join the{" "}
								<span className="mx-1 inline-flex items-center">
									<IndianRupee className="w-4 h-4" />
									100 Club
								</span>
							</>
						}
					/>
				</div>

				{/* Success Stories Preview */}
				<div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
					<div className="text-center mb-8">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Success Stories from Our Members
						</h3>
						<p className="text-gray-600">
							See how your monthly contribution makes a real
							difference
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}home-page/aids/shiksha.webp`}
									alt="Education impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;100 children received school supplies
									this month&quot;
								</p>
							</div>
						</div>
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}hunger-aid/intro.webp`}
									alt="Hunger relief impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;500 meals served to families in
									need&quot;
								</p>
							</div>
						</div>
						<div className="bg-white rounded-xl overflow-hidden shadow-sm">
							<div className="relative h-32">
								<Image
									src={`${STATIC_IMAGE_HOST}home-page/aids/cure.webp`}
									alt="Healthcare impact"
									width={300}
									height={128}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="p-4">
								<p className="text-sm text-gray-600">
									&quot;50 medical checkups completed this
									week&quot;
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

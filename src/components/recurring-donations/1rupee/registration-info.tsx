export default function RegistrationInfo() {
	return (
		<div className="md:col-span-2 space-y-4 mt-2 text-sm text-gray-700">
			<div className="p-4 bg-green-50 rounded-md border-l-4 border-green-600">
				<strong className="text-green-800">Tax Exemption:</strong>{" "}
				Provide your PAN number and complete address to receive tax
				exemption benefits under Section 80G of the Income Tax Act.
			</div>
			<div className="p-4 bg-sky-50 rounded-md border-l-4 border-sky-600">
				<strong className="text-sky-800">
					Recurring Payment Setup:
				</strong>{" "}
				{
					"This will set up a weekly recurring donation of \u20B97. Your payment method will be saved for automatic weekly charges. You can cancel anytime by contacting us."
				}
			</div>
			<div className="p-4 bg-green-50 rounded-md border-l-4 border-green-600">
				<strong className="text-green-800">What happens next:</strong>{" "}
				{
					"After payment confirmation, your recurring donation will be activated. You'll be charged \u20B97 weekly and receive email confirmations for each payment. You can manage your recurring donations through your account."
				}
			</div>
		</div>
	);
}

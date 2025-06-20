import React from "react";
import Image from "next/image";
function Ourteam() {
	return (
		<div className="px-4 py-10 sm:px-6 lg:px-16  font-[Times New Roman]">
			<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-400 text-center mb-8">
				Our Team
			</h2>

			<div className="max-w-3xl mx-auto">
				<ul className="list pl-6 space-y-6 text-center sm:text-lg">
					<li className="flex flex-col items-center">
						<Image
							src="/man.png"
							alt="profile"
							width={200}
							height={200}
						/>
						<p className="font-semibold ">Mr. Shivam Pathak</p>
						<p className="text-indigo-700">Director</p>
						<a
							className="text-blue-600 font-semibold hover:underline"
							href="https://www.linkedin.com/in/Shivam Pathak"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn Profile
						</a>
					</li>
					<li className="flex flex-col items-center">
						<Image
							src="/woman.png"
							alt="profile"
							width={200}
							height={200}
						/>
						<p className="font-semibold">Mrs. Pooja Pathak</p>
						<p className="text-indigo-700">Director</p>
						<a
							className="text-blue-600 font-semibold hover:underline"
							href="https://www.linkedin.com/in/Shivam Pathak"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn Profile
						</a>
					</li>
					<li className="flex flex-col items-center">
						<Image
							src="/man.png"
							alt="profile"
							width={200}
							height={200}
						/>
						<p className="font-semibold">Mr. Nilesh Pal</p>
						<p className="text-indigo-700">Director</p>
						<a
							className="text-blue-600 font-semibold hover:underline"
							href="https://www.linkedin.com/in/Shivam Pathak"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn Profile
						</a>
					</li>
					<li className="flex flex-col items-center">
						<Image
							src="/man.png"
							alt="profile"
							width={200}
							height={200}
						/>
						<p className="font-semibold ">Mr. Zeel Mangukiya</p>
						<p className="text-indigo-700">COO</p>
						<a
							className="text-blue-600 font-semibold hover:underline"
							href="https://www.linkedin.com/in/Shivam Pathak"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn Profile
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Ourteam;

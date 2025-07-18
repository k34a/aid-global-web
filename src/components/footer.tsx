"use client";

import React from "react";
import { MapPin, Mail, Phone, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ngoDetails } from "@/config/config";
import NewsLetter from "@/components/newsletter";
import { links } from "@/config/links";
import {
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from "@/components/icons";

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			{/* Newsletter Section */}
			<div>
				<NewsLetter />
			</div>

			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Organization Info */}
					<div className="lg:col-span-1">
						<div className="flex items-center space-x-3 mb-6">
							<div className="relative w-12 h-12 shrink-0">
								<img
									src={ngoDetails.logo}
									alt={`${ngoDetails.name} Logo`}
									className="object-contain"
								/>
							</div>
							<div>
								<h3 className="text-xl font-bold">
									{ngoDetails.name}
								</h3>
							</div>
						</div>
						<p className="text-gray-300 mb-6 leading-relaxed">
							{ngoDetails.description}
						</p>

						{/* Social Links */}
						<div className="flex space-x-4">
							{links.socialLinks.map((social) => (
								<a
									key={social.name}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
								>
									<span className="sr-only">
										{social.name}
									</span>
									<SocialIcon name={social.icon} />
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-6">
							Quick Links
						</h4>
						<ul className="space-y-3">
							{links.primaryLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Programs & Services */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Our Work</h4>
						<ul className="space-y-3">
							{links.secondaryLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Information */}
					<div>
						<h4 className="text-lg font-semibold mb-6">
							Contact Us
						</h4>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<MapPin className="w-5 h-5 mt-1 text-gray-400 shrink-0" />
								<p className="text-gray-300 text-sm leading-relaxed">
									{ngoDetails.contact.address}
								</p>
							</div>

							<div className="flex items-center space-x-3">
								<Mail className="w-5 h-5 text-gray-400 shrink-0" />
								<a
									href={`mailto:${ngoDetails.contact.email}`}
									className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
								>
									{ngoDetails.contact.email}
								</a>
							</div>

							<div className="flex items-center space-x-3">
								<Phone className="w-5 h-5 text-gray-400 shrink-0" />
								<a
									href={`tel:${ngoDetails.contact.phone}`}
									className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
								>
									{ngoDetails.contact.phone}
								</a>
							</div>
						</div>

						{/* Donate Button */}
						<div className="mt-8">
							<Link
								href="/donate"
								className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
							>
								<Heart className="w-5 h-5 mr-2" />
								Donate Now
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
						<div className="text-center lg:text-left">
							<p className="text-gray-400 text-sm">
								&copy; {currentYear} {ngoDetails.name}. All
								rights reserved.
							</p>
						</div>

						{/* Legal Links */}
						<div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6">
							{links.tertiaryLinks.map((link, index) => (
								<React.Fragment key={link.name}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
									>
										{link.name}
									</Link>
									{index < links.tertiaryLinks.length - 1 && (
										<span className="text-gray-600">|</span>
									)}
								</React.Fragment>
							))}
						</div>
					</div>

					{/* Additional Info */}
					<div className="mt-6 pt-6 border-t border-gray-800 text-center">
						<p className="text-gray-500 text-xs leading-relaxed max-w-4xl mx-auto">
							{ngoDetails.name} is a registered non-profit
							organization dedicated to creating positive change
							in communities worldwide. Your donations are
							tax-deductible to the fullest extent allowed by law.
							We are committed to transparency and accountability
							in all our operations.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

const iconMap: Record<string, React.ReactNode> = {
	facebook: <Facebook className="w-5 h-5" />,
	twitter: <Twitter className="w-5 h-5" />,
	instagram: <Instagram className="w-5 h-5" />,
	linkedin: <Linkedin className="w-5 h-5" />,
	youtube: <Youtube className="w-5 h-5" />,
};

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
	return iconMap[name.toLowerCase()] ?? <div className="w-5 h-5" />;
};

export default Footer;

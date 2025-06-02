'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ngoConfig } from '../config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-blue-100 max-w-md">
                Get updates on our latest programs, success stories, and ways to make a difference.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form className="flex flex-col sm:flex-row gap-3 max-w-md lg:max-w-none">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={ngoConfig.logo}
                  alt={`${ngoConfig.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{ngoConfig.name}</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {ngoConfig.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {ngoConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-800 rounded-lg"
                >
                  <span className="sr-only">{social.name}</span>
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {ngoConfig.primaryLinks.map((link) => (
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
              {ngoConfig.secondaryLinks.map((link) => (
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
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {ngoConfig.contact.address}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${ngoConfig.contact.email}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {ngoConfig.contact.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={`tel:${ngoConfig.contact.phone}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {ngoConfig.contact.phone}
                </a>
              </div>
            </div>

            {/* Donate Button */}
            <div className="mt-8">
              <Link
                href="/donate"
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
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
                © {currentYear} {ngoConfig.name}. All rights reserved.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6">
              {ngoConfig.tertiaryLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                  {index < ngoConfig.tertiaryLinks.length - 1 && (
                    <span className="text-gray-600">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs leading-relaxed max-w-4xl mx-auto">
              {ngoConfig.name} is a registered non-profit organization dedicated to creating positive change in communities worldwide. 
              Your donations are tax-deductible to the fullest extent allowed by law. We are committed to transparency and accountability 
              in all our operations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Media Icons Component (same as in Header)
const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconProps = {
    className: "w-5 h-5",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  };

  switch (name) {
    case 'facebook':
      return (
        <svg {...iconProps}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg {...iconProps}>
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
   case 'instagram':
  return (
    <svg {...iconProps} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.75 2h8.5C19.097 2 21 3.903 21 7.75v8.5c0 3.847-1.903 5.75-4.75 5.75h-8.5C4.903 22 3 20.097 3 16.25v-8.5C3 3.903 4.903 2 7.75 2zm0-2C3.469 0 0 3.469 0 7.75v8.5C0 20.531 3.469 24 7.75 24h8.5C20.531 24 24 20.531 24 16.25v-8.5C24 3.469 20.531 0 16.25 0h-8.5z"/>
      <path d="M12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25zm0-1.5A6.25 6.25 0 1 0 18.25 12 6.25 6.25 0 0 0 12 5.75zM18.5 5.5a1.25 1.25 0 1 1-1.25-1.25A1.25 1.25 0 0 1 18.5 5.5z"/>
    </svg>
  );

    case 'linkedin':
      return (
        <svg {...iconProps}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg {...iconProps}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    default:
      return <div className="w-5 h-5"></div>;
  }
};

export default Footer;
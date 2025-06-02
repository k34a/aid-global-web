'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ngoConfig } from '../config';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={ngoConfig.logo}
                    alt={`${ngoConfig.name} Logo`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {ngoConfig.name}
                  </h1>
                  <p className="text-sm text-gray-600 leading-tight">
                    {ngoConfig.tagline}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {ngoConfig.primaryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
              
              {/* Primary CTA Button */}
              <Link
                href="/donate"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Donate Now
              </Link>
            </nav>

            {/* Mobile: Primary Link + Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link
                href="/donate"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200"
              >
                Donate
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
            ></div>
            
            {/* Mobile Menu Panel */}
            <div className="absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t">
              <div className="px-4 py-6 space-y-4">
                {/* Primary Navigation */}
                <div className="space-y-3">
                  {ngoConfig.primaryLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Secondary Navigation */}
                <div className="border-t pt-4 space-y-3">
                  <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    More
                  </h3>
                  {ngoConfig.secondaryLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 px-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Contact
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{ngoConfig.contact.phone}</p>
                    <p>{ngoConfig.contact.email}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t pt-4 px-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {ngoConfig.socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span className="sr-only">{social.name}</span>
                        <SocialIcon name={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

// Social Media Icons Component
const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconProps = {
    className: "w-6 h-6",
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
        <svg {...iconProps}>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988zM12.017 7.729c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4S14.226 7.729 12.017 7.729z"/>
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
      return <div className="w-6 h-6"></div>;
  }
};

export default Header;
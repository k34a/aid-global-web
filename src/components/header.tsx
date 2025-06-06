"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ngoDetails } from "@/config/config";
import { links } from "@/config/links";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12 shrink-0">
                  <Image
                    src={ngoDetails.logo}
                    alt={`${ngoDetails.name} Logo`}
                    fill
                    sizes="(max-width: 768px) 40px, 48px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900 leading-tight">
                    {ngoDetails.name}
                  </h1>
                  <p className="text-sm text-gray-600 leading-tight">
                    {ngoDetails.tagline}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {links.primaryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}

              <Link
                href={links.donateLink.href}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Donate
              </Link>
            </nav>

            {/* Mobile: 1st primary link + Menu toggle */}
            <div className="flex items-center lg:hidden space-x-4">
              <Link
                href={links.donateLink.href}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Donate
              </Link>

              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-hidden"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <X size={29} strokeWidth={3} />
                ) : (
                  <Menu size={29} strokeWidth={3} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-md px-4 py-4 space-y-3">
            {links.primaryLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="block text-gray-700 hover:text-blue-600 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={closeMenu}
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-center font-semibold transition-all duration-200"
            >
              Donate Now
            </Link>
          </div>
        )}
      </header>

      <div className="h-20" />
    </>
  );
};

export default Header;

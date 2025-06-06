import type { Links } from "@/config/types";

export const links: Links = {
  primaryLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Contact", href: "/contact" },
  ],

  donateLink: {
    name: "Donate",
    href: "/donate",
  },

  secondaryLinks: [
    { name: "Our Impact", href: "/impact" },
    { name: "Stories", href: "/stories" },
    { name: "Partners", href: "/partners" },
    { name: "Volunteer", href: "/volunteer" },
  ],

  tertiaryLinks: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Annual Reports", href: "/reports" },
    { name: "Transparency", href: "/transparency" },
  ],
  socialLinks: [
    {
      name: "Facebook",
      href: "https://facebook.com/aidglobal",
      icon: "facebook",
    },
    { name: "Twitter", href: "https://twitter.com/aidglobal", icon: "twitter" },
    {
      name: "Instagram",
      href: "https://instagram.com/aidglobal",
      icon: "instagram",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/aidglobal",
      icon: "linkedin",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@aidglobal",
      icon: "youtube",
    },
  ],
};

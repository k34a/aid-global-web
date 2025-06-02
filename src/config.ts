// src/config.ts
export interface NavigationLink {
  name: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  website?: string;
}

export interface NGOConfig {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryLinks: NavigationLink[];
  secondaryLinks: NavigationLink[];
  tertiaryLinks: NavigationLink[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const ngoConfig: NGOConfig = {
  name: "Aid Global Foundation",
  tagline: "Empowering Communities, Transforming Lives",
  description: "Aid Global Foundation is dedicated to creating sustainable change in communities worldwide through education, healthcare, and humanitarian support.",
  logo: "/logo.png", // You'll need to add your logo file
  
  primaryLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Donate", href: "/donate" },
    { name: "Contact", href: "/contact" }
  ],
  
  secondaryLinks: [
    { name: "Our Impact", href: "/impact" },
    { name: "Stories", href: "/stories" },
    { name: "Partners", href: "/partners" },
    { name: "Volunteer", href: "/volunteer" }
  ],
  
  tertiaryLinks: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Annual Reports", href: "/reports" },
    { name: "Transparency", href: "/transparency" }
  ],
  
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com/aidglobal", icon: "facebook" },
    { name: "Twitter", href: "https://twitter.com/aidglobal", icon: "twitter" },
    { name: "Instagram", href: "https://instagram.com/aidglobal", icon: "instagram" },
    { name: "LinkedIn", href: "https://linkedin.com/company/aidglobal", icon: "linkedin" },
    { name: "YouTube", href: "https://youtube.com/@aidglobal", icon: "youtube" }
  ],
  
  contact: {
    address: "123 Main Street, Suite 456, New York, NY 10001, United States",
    email: "info@aidglobalfoundation.org",
    phone: "+1 (555) 123-4567",
    website: "https://aidglobalfoundation.org"
  },
  
  theme: {
    primary: "#1E40AF", // Blue similar to UNICEF
    secondary: "#0EA5E9", // Light blue
    accent: "#F59E0B" // Orange for CTAs
  }
};
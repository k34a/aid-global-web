// src/config.ts


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

export interface NGODetails {
  name: string;
  tagline: string;
  description: string;
  keywords : string[];
  logo: string;
 
  socialLinks: SocialLink[];
  contact: ContactInfo;
  //twitter metadata
  twitterHandle: string;    
  twitterCardType: 'summary' | 'summary_large_image' | 'player' | 'app'; 
}

export const ngoDetails: NGODetails = {
  name: "Aid Global Foundation",
  tagline: "Empowering Communities, Transforming Lives",
  description: "Aid Global Foundation is dedicated to creating sustainable change in communities worldwide through education, healthcare, and humanitarian support.",
   keywords: [
    'NGO',
    'non-profit',
    'charity',
    'humanitarian',
    'aid',
    'global foundation',
    'donations',
    'volunteer'
  ],
  logo: "/logo.png", // You'll need to add your logo file
  
 
  
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
  twitterHandle: '@aidglobal',
  twitterCardType: 'summary_large_image'
};
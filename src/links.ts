export interface NavigationLink {
  name: string;
  href: string;
  icon?: string;
}

export interface Links{
    primaryLinks: NavigationLink[];
    secondaryLinks: NavigationLink[];
    tertiaryLinks: NavigationLink[];
}

export const links: Links = {
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
}
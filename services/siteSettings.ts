export interface FooterLink {
  label: string;
  url: string;
  group: string;
  order: number;
  isActive: boolean;
  openInNewTab?: boolean;
}

import { logger } from "@/lib/logger";

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface NavbarLink {
  label: string;
  url: string;
  order: number;
  isActive: boolean;
  children?: NavbarLink[];
}

export interface HeroBanner {
  _id?: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaUrl: string;
  ctaText: string;
  order: number;
  isActive: boolean;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteUrl: string;
  footerLinks: FooterLink[];
  navbarLinks: NavbarLink[];
  heroBanners: HeroBanner[];
  socialLinks: SocialLinks;
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      logger.warn("NEXT_PUBLIC_API_URL is not defined");
      return null;
    }

    const response = await fetch(`${apiUrl}/site-settings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch site settings: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    logger.error("Error fetching site settings:", error);
    return null;
  }
};

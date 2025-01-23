export interface Section {
  id: string;
  type:
    | "header"
    | "hero"
    | "features"
    | "pricing"
    | "testimonials"
    | "contact"
    | "footer"
    | "stats";
  content:
    | HeaderContent
    | HeroContent
    | PricingContent
    | TestimonialContent
    | ContactContent
    | StatsContent
    | {
        title?: string;
        subtitle?: string;
        companyName?: string;
        logo?: string;
        buttons?: Array<{
          text: string;
          url: string;
          variant: "primary" | "secondary" | "outline";
        }>;
        images?: Array<{
          url: string;
          alt: string;
        }>;
        features?: Array<{
          title: string;
          description: string;
          icon?: string;
        }>;
        pricing?: Array<{
          title: string;
          price: string;
          description: string;
          features: string[];
          isPopular?: boolean;
        }>;
        testimonials?: Array<{
          name: string;
          title: string;
          content: string;
          avatar?: string;
        }>;
        contactInfo?: Array<{
          type: "email" | "phone" | "address";
          label: string;
          value: string;
        }>;
        links?: Array<{
          title: string;
          items: Array<{
            label: string;
            href: string;
          }>;
        }>;
        social?: Array<{
          icon: "facebook" | "twitter" | "instagram" | "linkedin";
          url: string;
        }>;
      };
  style: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    layout?: "grid" | "carousel" | "list" | "center" | "left" | "right";
  };
}

export interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  buttons?: Array<{
    text: string;
    url: string;
    variant: "primary" | "secondary" | "outline";
  }>;
}

export interface Template {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: "business" | "portfolio" | "startup" | "saas" | "ecommerce" | "";
  sections: Section[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  tags: string[];
}

export interface HeaderContent {
  title?: string;
  subtitle?: string;
  companyName?: string;
  logo?: string;
  variant?: "default" | "centered";
  buttons?: {
    text: string;
    url: string;
    variant: "primary" | "secondary" | "outline";
  }[];
  social?: {
    platform: string;
    url: string;
  }[];
}

export interface PricingContent {
  title?: string;
  subtitle?: string;
  variant?: "modern" | "comparison";
  pricing?: {
    title: string;
    price: string;
    description: string;
    features: string[];
    isPopular: boolean;
    buttonText?: string;
    buttonUrl?: string;
    buttonVariant?: "primary" | "secondary" | "outline";
  }[];
}

export interface TestimonialContent {
  title?: string;
  subtitle?: string;
  testimonials?: Array<{
    name: string;
    title: string;
    content: string;
    avatar?: string;
    rating?: number;
  }>;
}

export interface ContactButton {
  id: string;
  title: string;
  link: string;
  imageUrl: string;
  size: "small" | "medium" | "large";
  shape: "square" | "rounded" | "circle";
}

export interface ContactContent {
  title?: string;
  subtitle?: string;
  email?: string;
  buttons: ContactButton[];
}

export interface StatsContent {
  title?: string;
  subtitle?: string;
  stats: Array<{
    value: string;
    suffix?: string;
    label: string;
  }>;
}

export interface Section {
  id: string;
  type: "hero" | "features" | "pricing" | "testimonials" | "contact" | "footer";
  content: {
    title?: string;
    subtitle?: string;
    companyName?: string;
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
    layout?: "left" | "center" | "right";
  };
}

export interface HeroContent {
  title?: string;
  subtitle?: string;
  buttons?: Array<{
    text: string;
    url: string;
    variant: "primary" | "secondary" | "outline";
  }>;
}

export interface Template {
  _id: string; // Maintenant une chaîne au lieu d'ObjectId
  name: string;
  description: string;
  thumbnail: string;
  category: "business" | "portfolio" | "startup" | "saas" | "ecommerce" | "";
  sections: Section[];
  createdAt: string; // Date ISO string
  updatedAt: string; // Date ISO string
  userId: string;
  isPublic: boolean;
  tags: string[];
}

export interface Section {
  id: string;
  type: "hero" | "features" | "pricing" | "testimonials" | "contact" | "footer";
  content: {
    title?: string;
    subtitle?: string;
    buttons?: Array<{
      text: string;
      url: string;
      variant: "primary" | "secondary";
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
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    layout?: "left" | "center" | "right";
  };
}

export interface Template {
  _id: string; // Maintenant une chaîne au lieu d'ObjectId
  name: string;
  description: string;
  thumbnail: string;
  category: "business" | "portfolio" | "startup" | "saas" | "ecommerce";
  sections: Section[];
  createdAt: string; // Date ISO string
  updatedAt: string; // Date ISO string
  userId: string;
  isPublic: boolean;
  tags: string[];
}

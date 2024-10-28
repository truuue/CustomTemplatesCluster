interface HeaderSectionProps {
  content?: {
    logo?: string;
    companyName?: string;
    variant?: "default" | "centered";
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
  };
  onClick?: () => void;
  sections?: Array<{
    id: string;
    type: string;
    content: {
      type?: string;
      [key: string]: any;
    };
  }>;
}

export function HeaderSection({ content, style, onClick, sections }: HeaderSectionProps) {
  const generateLinks = () => {
    if (!sections) return [];

    return sections
      .filter((section) => section.type !== "header")
      .map((section) => ({
        label: section.content.type || capitalizeFirstLetter(section.type),
        href: `#${section.id}`,
      }));
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const navigationLinks = generateLinks();
  const variant = content?.variant || "default";

  if (variant === "centered") {
    return (
      <header
        onClick={onClick}
        className="sticky top-0 z-50 w-full border-b bg-white shadow-sm"
        style={{
          backgroundColor: style?.backgroundColor,
          color: style?.textColor,
          padding: style?.padding || "1rem",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4">
            {content?.logo && (
              <img
                src={content.logo}
                alt="Logo"
                className="h-16 w-16 object-contain"
              />
            )}
            {content?.companyName && (
              <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                {content.companyName}
              </h1>
            )}
            <nav className="mt-4">
              <ul className="flex items-center space-x-8">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      onClick={onClick}
      className="sticky top-0 z-50 w-full border-b bg-white shadow-sm"
      style={{
        backgroundColor: style?.backgroundColor,
        color: style?.textColor,
        padding: style?.padding || "1rem",
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {content?.logo && (
              <img
                src={content.logo}
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
            )}
            {content?.companyName && (
              <h1 className="text-xl font-bold tracking-tight text-gray-800">
                {content.companyName}
              </h1>
            )}
          </div>
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

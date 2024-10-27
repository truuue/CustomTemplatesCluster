interface PricingProps {
  title: string;
  price: string;
  features: string[];
  style: any;
  isPopular?: boolean;
}

export function PricingSection({
  title,
  price,
  features,
  style,
  isPopular,
}: PricingProps) {
  return (
    <div
      style={{
        backgroundColor: style.backgroundColor,
        padding: style.padding || "2rem",
      }}
      className={`rounded-lg shadow-lg ${isPopular ? "border-2 border-primary" : ""}`}
    >
      <div className="p-6 text-center">
        <h3 className="mb-4 text-2xl font-bold">{title}</h3>
        <div className="mb-6 text-4xl font-bold">{price}</div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <span className="mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

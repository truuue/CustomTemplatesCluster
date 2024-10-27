interface FeatureProps {
  title: string;
  description: string;
  icon?: string;
  style: any;
}

export function FeatureSection({
  title,
  description,
  icon,
  style,
}: FeatureProps) {
  return (
    <div
      style={{
        backgroundColor: style.backgroundColor,
        padding: style.padding || "2rem",
      }}
      className="text-center"
    >
      {icon && (
        <div className="mb-4">
          <span className="text-4xl">{icon}</span>
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

import { Section } from "@/types/template";
import { motion } from "framer-motion";

interface StatsSectionProps {
  style: Section["style"];
}

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatsSection({ style }: StatsSectionProps) {
  const stats: Stat[] = [
    { value: "100", suffix: "k+", label: "Pages créées" },
    { value: "95", suffix: "%", label: "Satisfaction client" },
    { value: "24", suffix: "/7", label: "Support client" },
    { value: "50", suffix: "+", label: "Templates" },
  ];

  return (
    <section
      style={{
        backgroundColor: style.backgroundColor,
        color: style.textColor,
        padding: style.padding || "6rem 2rem",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="bg-grid-pattern absolute inset-0 opacity-[0.03]" />

      <div className="container relative">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border bg-card p-8 text-center"
            >
              <div className="relative space-y-2">
                <h3 className="text-4xl font-bold tracking-tight">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

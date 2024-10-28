import { Button } from "@/components/ui/button";
import { convertButtonVariant } from "@/lib/utils/button";
import { HeroContent } from "@/types/template";

interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="container flex flex-col items-center justify-center space-y-4 py-24 text-center">
      {content.title && (
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {content.title}
        </h1>
      )}

      {content.subtitle && (
        <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {content.subtitle}
        </p>
      )}

      {content.buttons && content.buttons.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          {content.buttons.map((button, index) => {
            console.log("Button variant before conversion:", button.variant);
            const convertedVariant = convertButtonVariant(button.variant);
            console.log("Button variant after conversion:", convertedVariant);

            return (
              <Button
                key={index}
                variant={convertedVariant}
                asChild
                className="min-w-[150px]"
              >
                <a href={button.url}>{button.text}</a>
              </Button>
            );
          })}
        </div>
      )}
    </section>
  );
}

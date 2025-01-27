import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* En-tête */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">{siteConfig.contact.title}</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          {siteConfig.contact.subtitle}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Informations de contact */}
        <div className="space-y-8">
          <h2 className="mb-6 text-2xl font-bold">Nos coordonnées</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="mt-1 size-6 text-primary" />
              <div>
                <h3 className="font-semibold">
                  {siteConfig.contact.form.email}
                </h3>
                <p className="text-muted-foreground">
                  {siteConfig.contact.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="mt-1 size-6 text-primary" />
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-6 text-2xl font-bold">
            {siteConfig.contact.form.title}
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstname" className="text-sm font-medium">
                  {siteConfig.contact.form.firstname}
                </label>
                <Input
                  id="firstname"
                  placeholder={siteConfig.contact.form.placeholders.firstname}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastname" className="text-sm font-medium">
                  {siteConfig.contact.form.lastname}
                </label>
                <Input
                  id="lastname"
                  placeholder={siteConfig.contact.form.placeholders.lastname}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {siteConfig.contact.form.email}
              </label>
              <Input
                id="email"
                type="email"
                placeholder={siteConfig.contact.form.placeholders.email}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                {siteConfig.contact.form.subject}
              </label>
              <Input
                id="subject"
                placeholder={siteConfig.contact.form.placeholders.subject}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                {siteConfig.contact.form.message}
              </label>
              <Textarea
                id="message"
                placeholder={siteConfig.contact.form.placeholders.message}
                className="min-h-[150px]"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {siteConfig.contact.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

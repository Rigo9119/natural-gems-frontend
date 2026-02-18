import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_LOCATION, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, buildMeta, localBusinessJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildMeta({
      title: "Contacto",
      description:
        "Contáctanos para una atención personalizada en esmeraldas colombianas. WhatsApp, email, teléfono. Bogotá, Colombia. Respuesta inmediata.",
      path: "/contact",
      jsonLd: [
        localBusinessJsonLd(),
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contact" },
        ]),
      ],
    }),
  component: ContactPage,
});

const contactMethods = [
  {
    icon: SiWhatsapp,
    title: "WhatsApp",
    description: "Respuesta inmediata",
    detail: "+57 300 123 4567",
    href: WHATSAPP_URL,
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Respuesta en 24h",
    detail: "info@naturagems.co",
    href: "mailto:info@naturagems.co",
    color: "bg-brand-primary-dark hover:bg-brand-primary-dark/90",
  },
  {
    icon: Phone,
    title: "Teléfono",
    description: "Lun - Vie, 9am - 6pm",
    detail: "+57 (1) 234 5678",
    href: "tel:+5712345678",
    color: "bg-brand-secondary-terra hover:bg-brand-secondary-terra/90",
  },
  {
    icon: SiInstagram,
    title: "Instagram",
    description: "Síguenos",
    detail: "@naturagems",
    href: INSTAGRAM_URL,
    color: "bg-pink-600 hover:bg-pink-700",
  },
];

function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-secondary-terra px-6 sm:px-8 py-16 sm:py-24 text-center">
        <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
          Experiencia Personalizada
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl text-brand-primary-lighter mb-4 sm:mb-6 max-w-3xl mx-auto">
          Encuentra tu gema perfecta
        </h1>
        <p className="font-body text-brand-primary-lighter/80 max-w-xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
          Cada esmeralda es única, como tú. Permítenos guiarte en la selección
          de la piedra perfecta con una atención exclusiva y personalizada.
        </p>
        <dl className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-16 text-brand-primary-lighter/70">
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">
              15+
            </dd>
            <dt className="text-xs sm:text-sm tracking-wide">
              Años de experiencia
            </dt>
          </div>
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">
              500+
            </dd>
            <dt className="text-xs sm:text-sm tracking-wide">
              Clientes satisfechos
            </dt>
          </div>
          <div className="flex flex-col items-center">
            <dd className="font-heading text-2xl sm:text-3xl text-brand-primary-dark">
              100+
            </dd>
            <dt className="text-xs sm:text-sm tracking-wide">
              Gemas certificadas
            </dt>
          </div>
        </dl>
      </section>

      {/* Contact Methods */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Múltiples canales
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark">
              Contáctanos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center rounded-xl border border-brand-primary-dark/10 p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full text-white mb-4 transition-colors ${method.color}`}
                >
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg text-brand-primary-dark mb-1">
                  {method.title}
                </h3>
                <p className="text-xs text-brand-primary-dark/50 mb-2">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-brand-primary-dark/80">
                  {method.detail}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Location Info */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl text-brand-primary-dark mb-2">
                Envíanos un mensaje
              </h2>
              <p className="font-body text-brand-primary-dark/70 mb-8">
                Completa el formulario y te responderemos lo antes posible.
              </p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-brand-primary-dark"
                    >
                      Nombre
                    </Label>
                    <Input id="contact-name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-brand-primary-dark"
                    >
                      Email
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-subject"
                    className="text-brand-primary-dark"
                  >
                    Asunto
                  </Label>
                  <Input
                    id="contact-subject"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-brand-primary-dark"
                  >
                    Mensaje
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Cuéntanos más sobre lo que buscas..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-brand-primary-dark hover:bg-brand-primary-dark/90 text-brand-primary-lighter px-8 py-3 rounded-full font-body font-semibold"
                >
                  Enviar mensaje
                </Button>
              </form>
            </div>

            {/* Location & Hours */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl text-brand-primary-dark mb-6">
                  Información
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary-lighter flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-secondary-terra" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-brand-primary-dark mb-1">
                        Ubicación
                      </h3>
                      <p className="text-sm text-brand-primary-dark/70">
                        {COMPANY_LOCATION}
                      </p>
                      <p className="text-sm text-brand-primary-dark/70">
                        Centro Internacional de Esmeraldas
                      </p>
                      <p className="text-sm text-brand-primary-dark/70">
                        Oficina 301
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary-lighter flex items-center justify-center">
                      <Clock className="w-5 h-5 text-brand-secondary-terra" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-brand-primary-dark mb-1">
                        Horario de Atención
                      </h3>
                      <p className="text-sm text-brand-primary-dark/70">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-sm text-brand-primary-dark/70">
                        Sábados: 10:00 AM - 2:00 PM
                      </p>
                      <p className="text-sm text-brand-primary-dark/70">
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-brand-primary-dark/5 aspect-video lg:aspect-[4/3] flex items-center justify-center">
                <div className="text-center px-6">
                  <MapPin className="w-10 h-10 text-brand-primary-dark/30 mx-auto mb-3" />
                  <p className="text-sm text-brand-primary-dark/50">
                    {COMPANY_LOCATION}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

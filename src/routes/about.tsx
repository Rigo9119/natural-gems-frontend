import { createFileRoute } from "@tanstack/react-router";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  Award,
  Gem,
  Mountain,
  PackageCheck,
  Search,
  Shield,
  Truck,
} from "lucide-react";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildMeta({
      title: "Quiénes Somos",
      description:
        "Tres generaciones dedicadas al arte de las esmeraldas colombianas. Desde las minas de Muzo al mundo, con certificación GIA y trazabilidad completa.",
      path: "/about",
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Quiénes Somos", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

const milestones = [
  {
    year: "1985",
    title: "Los Inicios",
    description:
      "Nuestra familia comienza a trabajar en las minas de Muzo, aprendiendo el oficio de generación en generación.",
  },
  {
    year: "1998",
    title: "Primera Exportación",
    description:
      "Realizamos nuestra primera exportación internacional, llevando esmeraldas colombianas a Europa y Asia.",
  },
  {
    year: "2010",
    title: "Certificación Internacional",
    description:
      "Obtenemos certificaciones internacionales de calidad y autenticidad para todas nuestras piedras.",
  },
  {
    year: "2020",
    title: "Era Digital",
    description:
      "Lanzamos nuestra plataforma digital para acercar las esmeraldas colombianas al mundo entero.",
  },
];

const processSteps = [
  {
    icon: Mountain,
    title: "Extracción",
    description:
      "Las esmeraldas son extraídas cuidadosamente de las minas más prestigiosas de Colombia.",
  },
  {
    icon: Search,
    title: "Selección",
    description:
      "Cada piedra es evaluada por nuestros expertos gemólogos para garantizar su calidad.",
  },
  {
    icon: Gem,
    title: "Certificación",
    description:
      "Certificamos cada esmeralda con estándares internacionales de claridad, color y corte.",
  },
  {
    icon: PackageCheck,
    title: "Preparación",
    description:
      "Las piedras son preparadas y empacadas con los más altos estándares de seguridad.",
  },
  {
    icon: Truck,
    title: "Entrega",
    description:
      "Enviamos tu esmeralda con seguro completo y seguimiento a cualquier parte del mundo.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Autenticidad",
    description:
      "Cada esmeralda viene con certificado de autenticidad y origen verificado de minas colombianas.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description:
      "Solo seleccionamos piedras que cumplen con los más altos estándares de calidad internacional.",
  },
  {
    icon: Gem,
    title: "Tradición",
    description:
      "Tres generaciones de conocimiento y pasión por las esmeraldas respaldan cada una de nuestras piezas.",
  },
];

function AboutPage() {
  return (
    <div>
      {/* Hero / Story Section */}
      <section className="bg-brand-primary-lighter">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="flex flex-col justify-center w-full md:w-1/2 px-6 sm:px-8 py-16 sm:py-24 md:px-16 lg:px-24">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
              Nuestra Historia
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-brand-primary-dark mb-4 sm:mb-6">
              Quiénes Somos
            </h1>
            <hr className="w-12 sm:w-16 border-t-2 border-brand-secondary-terra mb-6 sm:mb-8" />
            <p className="font-body text-brand-primary-dark/80 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              Somos una familia con más de tres generaciones dedicadas al arte
              de las esmeraldas colombianas. Nuestra pasión nació en las minas
              de Muzo, donde aprendimos a reconocer la verdadera belleza de cada
              piedra.
            </p>
            <p className="font-body text-brand-primary-dark/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Hoy, llevamos esa tradición al mundo, ofreciendo gemas
              cuidadosamente seleccionadas con la garantía de autenticidad y la
              atención personalizada que nos caracteriza.
            </p>
            <dl className="flex flex-wrap gap-6 sm:gap-8">
              <div>
                <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">
                  3
                </dd>
                <dt className="text-xs sm:text-sm text-brand-primary-dark/60">
                  Generaciones
                </dt>
              </div>
              <div>
                <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">
                  100%
                </dd>
                <dt className="text-xs sm:text-sm text-brand-primary-dark/60">
                  Colombianas
                </dt>
              </div>
              <div>
                <dd className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">
                  Muzo
                </dd>
                <dt className="text-xs sm:text-sm text-brand-primary-dark/60">
                  Origen
                </dt>
              </div>
            </dl>
          </div>
          <figure className="hidden md:flex md:w-1/2 items-center justify-center bg-brand-primary-light/30 relative overflow-hidden min-h-[600px]">
            <OptimizedImage
              alt="Esmeraldas colombianas"
              src="https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop"
              width={800}
              height={1000}
              priority
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-brand-primary-dark/10"
              aria-hidden="true"
            />
          </figure>
        </div>
      </section>

      {/* Values / Mission */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Lo que nos define
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark">
              Nuestros Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {values.map((value) => (
              <div key={value.title} className="text-center px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-lighter mb-6">
                  <value.icon className="w-8 h-8 text-brand-secondary-terra" />
                </div>
                <h3 className="font-heading text-xl text-brand-primary-dark mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-brand-primary-dark/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-brand-surface">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              Nuestro camino
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark">
              Hitos Importantes
            </h2>
          </div>
          <div className="relative">
            <div
              className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-brand-secondary-terra/30 sm:-translate-x-px"
              aria-hidden="true"
            />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${index % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8"}`}
                  >
                    <span className="font-heading text-2xl sm:text-3xl text-brand-secondary-terra">
                      {milestone.year}
                    </span>
                    <h3 className="font-heading text-lg text-brand-primary-dark mt-1">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-brand-primary-dark/70 mt-2 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                  <div
                    className="absolute left-4 sm:relative sm:left-auto flex-shrink-0 w-5 h-5 rounded-full bg-brand-secondary-terra border-4 border-brand-surface"
                    aria-hidden="true"
                  />
                  <div className="hidden sm:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process: Mine to Customer */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
              De la mina a tus manos
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark">
              Nuestro Proceso
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-primary-dark text-brand-primary-lighter mb-4">
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="absolute -top-2 -right-2 sm:right-auto sm:left-1/2 sm:translate-x-4 sm:-translate-y-1 font-heading text-4xl text-brand-primary-dark/10">
                  {index + 1}
                </span>
                <h3 className="font-heading text-lg text-brand-primary-dark mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-brand-primary-dark/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Guarantees */}
      <section className="py-16 sm:py-24 bg-brand-primary-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
            Tu confianza es nuestra prioridad
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-lighter mb-12 sm:mb-16">
            Certificaciones y Garantías
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Certificado GIA",
                description:
                  "Todas nuestras esmeraldas pueden ser certificadas por el Gemological Institute of America.",
              },
              {
                title: "Origen Verificado",
                description:
                  "Cada piedra cuenta con trazabilidad completa desde la mina hasta tu mano.",
              },
              {
                title: "Garantía de Devolución",
                description:
                  "Si no estás satisfecho, tienes 30 días para devolver tu esmeralda sin preguntas.",
              },
              {
                title: "Envío Asegurado",
                description:
                  "Todos los envíos incluyen seguro completo contra pérdida o daño durante el transporte.",
              },
            ].map((cert) => (
              <div
                key={cert.title}
                className="rounded-xl border border-brand-primary-lighter/20 p-6 sm:p-8"
              >
                <h3 className="font-heading text-lg text-brand-primary-lighter mb-3">
                  {cert.title}
                </h3>
                <p className="font-body text-sm text-brand-primary-lighter/70 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

const mineImages = [
  {
    src: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=1400&h=700&fit=crop",
    alt: "Interior de una mina de esmeraldas en Colombia",
    caption: "Las minas de Muzo, corazón esmeraldera de Colombia",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&h=700&fit=crop",
    alt: "Esmeraldas en bruto recién extraídas",
    caption: "Piedras en bruto, pureza directa de la tierra",
  },
  {
    src: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=1400&h=700&fit=crop",
    alt: "Proceso de selección de esmeraldas",
    caption: "Selección artesanal piedra por piedra",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop",
    alt: "Montañas de la región esmeraldera de Colombia",
    caption:
      "La cordillera colombiana, cuna de las mejores esmeraldas del mundo",
  },
  {
    src: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1400&h=700&fit=crop",
    alt: "Gemas de esmeralda con su característico verde intenso",
    caption: "El verde más puro, sello de las esmeraldas de Muzo",
  },
];

const SLIDE_INTERVAL_MS = 4500;

function MineCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % mineImages.length);
    }, SLIDE_INTERVAL_MS);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section aria-label="Galería de minas de esmeraldas colombianas">
      <div className="relative overflow-hidden h-[360px] sm:h-[480px] lg:h-[560px] bg-brand-primary-dark">
        {mineImages.map((img, index) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: index === current ? 1 : 0 }}
            aria-hidden={index !== current}
          >
            <OptimizedImage
              src={img.src}
              alt={img.alt}
              width={1400}
              height={700}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/70 via-brand-primary-dark/10 to-transparent" />
          </div>
        ))}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-8 sm:pb-10">
          <p className="font-body text-brand-primary-lighter/90 text-sm sm:text-base text-center tracking-wide transition-opacity duration-500">
            {mineImages[current].caption}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {mineImages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Imagen ${index + 1}`}
              onClick={() => {
                setCurrent(index);
                if (intervalRef.current) clearInterval(intervalRef.current);
                startInterval();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-6 bg-brand-secondary-golden"
                  : "w-1.5 bg-brand-primary-lighter/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div>
      {/* Mine Image Carousel */}
      <MineCarousel />
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

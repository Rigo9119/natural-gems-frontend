import { createFileRoute } from "@tanstack/react-router";
import {
	Droplets,
	Eye,
	Gem,
	MapPin,
	Scissors,
	ShieldCheck,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { breadcrumbJsonLd, buildMeta, faqJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
	head: () =>
		buildMeta({
			title: "Preguntas Frecuentes",
			description:
				"Resolvemos tus dudas sobre esmeraldas colombianas: certificados, envíos internacionales, devoluciones, compras al por mayor y más.",
			path: "/faq",
			jsonLd: [
				faqJsonLd(faqs),
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Preguntas Frecuentes", path: "/faq" },
				]),
			],
		}),
	component: FaqPage,
});

const buyerGuide = [
	{
		icon: Droplets,
		title: "Color",
		subtitle: "El factor más importante",
		description:
			"Busca un verde intenso y vivo con buena saturación. Las mejores esmeraldas colombianas tienen un tono verde puro, sin tonos amarillentos o azulados excesivos. Un color uniforme y profundo indica mayor calidad y valor.",
	},
	{
		icon: Eye,
		title: "Claridad",
		subtitle: "Las inclusiones cuentan una historia",
		description:
			"A diferencia de los diamantes, las inclusiones en esmeraldas son esperadas y se conocen como \"jardín\". Lo importante es que no afecten la transparencia ni la durabilidad. Una esmeralda AAA tendrá pocas inclusiones visibles a simple vista.",
	},
	{
		icon: Scissors,
		title: "Corte",
		subtitle: "Maximiza el brillo",
		description:
			"Un buen corte realza el color y minimiza las inclusiones. El corte esmeralda (rectangular con esquinas recortadas) es el clásico, pero los cortes oval y pera también son populares. Observa que las facetas sean simétricas y la piedra tenga buen brillo.",
	},
	{
		icon: Gem,
		title: "Quilates",
		subtitle: "Tamaño vs. calidad",
		description:
			"El peso en quilates afecta el precio, pero no siempre indica calidad. Una esmeralda más pequeña con excelente color y claridad puede valer más que una grande con defectos. Para joyería, entre 0.5 y 2 quilates ofrece el mejor balance.",
	},
	{
		icon: MapPin,
		title: "Origen",
		subtitle: "Colombia, la referencia mundial",
		description:
			"Las esmeraldas colombianas de Muzo, Chivor y Coscuez son las más valoradas del mundo por su color verde intenso único. El origen afecta significativamente el valor: una esmeralda colombiana certificada tiene mayor demanda y precio en el mercado.",
	},
	{
		icon: ShieldCheck,
		title: "Certificación",
		subtitle: "Tu garantía de confianza",
		description:
			"Siempre solicita un certificado de un laboratorio reconocido (GIA, Gübelin, SSEF). El certificado confirma autenticidad, origen, tratamientos y características. Desconfía de vendedores que no ofrezcan certificación independiente.",
	},
];

const faqs = [
	{
		question: "¿Las esmeraldas vienen con certificado de autenticidad?",
		answer:
			"Sí, todas nuestras esmeraldas incluyen un certificado de autenticidad que detalla el origen, claridad, peso en quilates y corte de la piedra. También ofrecemos certificación GIA bajo solicitud.",
	},
	{
		question: "¿Realizan envíos internacionales?",
		answer:
			"Sí, enviamos a todo el mundo. Todos los envíos incluyen seguro completo contra pérdida o daño. Los tiempos de entrega varían según el destino: 3-5 días para Colombia, 7-14 días para el resto del mundo.",
	},
	{
		question: "¿Cuál es la política de devoluciones?",
		answer:
			"Ofrecemos una garantía de satisfacción de 30 días. Si la esmeralda no cumple con tus expectativas, puedes devolverla sin costo y te reembolsamos el 100% del valor.",
	},
	{
		question: "¿Ofrecen descuentos para compras al por mayor?",
		answer:
			"Sí, tenemos precios especiales para mayoristas y joyeros. Visita nuestra sección de Mayoristas o contáctanos directamente para recibir una cotización personalizada.",
	},
	{
		question: "¿Cómo puedo verificar la calidad de una esmeralda?",
		answer:
			"Cada esmeralda viene clasificada por claridad (AAA, AA, A, B), origen y corte. Además, puedes solicitar una evaluación independiente por un gemólogo certificado. Nuestro equipo está disponible para resolver cualquier duda sobre la calidad de las piedras.",
	},
	{
		question: "¿Trabajan con piedras montadas o solo sueltas?",
		answer:
			"Principalmente trabajamos con esmeraldas sueltas, pero también ofrecemos servicios de montaje personalizado en colaboración con joyeros expertos. Contáctanos para más detalles.",
	},
];

function FaqPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-brand-primary-dark px-6 sm:px-8 py-16 sm:py-24 text-center">
				<p className="text-brand-secondary-golden font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-6">
					Resolvemos tus dudas
				</p>
				<h1 className="font-heading text-3xl sm:text-4xl md:text-6xl text-brand-primary-lighter mb-4 sm:mb-6 max-w-3xl mx-auto">
					Preguntas Frecuentes
				</h1>
				<p className="font-body text-brand-primary-lighter/80 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
					Todo lo que necesitas saber sobre nuestras esmeraldas, envíos,
					certificaciones y más.
				</p>
			</section>

			{/* Buyer's Guide */}
			<section className="py-16 sm:py-24 bg-brand-surface">
				<div className="max-w-7xl mx-auto px-6 sm:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<p className="text-brand-secondary-terra font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
							Guía para compradores
						</p>
						<h2 className="font-heading text-3xl sm:text-4xl text-brand-primary-dark mb-4">
							Cómo elegir una buena esmeralda
						</h2>
						<p className="font-body text-brand-primary-dark/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
							Si es tu primera vez comprando una esmeralda, estos son los
							factores clave que debes evaluar para hacer una inversión
							inteligente.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{buyerGuide.map((item) => (
							<div
								key={item.title}
								className="bg-white rounded-2xl p-8 border border-brand-primary-dark/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
							>
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary-lighter mb-5">
									<item.icon className="w-6 h-6 text-brand-secondary-terra" />
								</div>
								<h3 className="font-heading text-xl text-brand-primary-dark mb-1">
									{item.title}
								</h3>
								<p className="text-xs font-body text-brand-secondary-terra tracking-wide uppercase mb-3">
									{item.subtitle}
								</p>
								<p className="font-body text-sm text-brand-primary-dark/70 leading-relaxed">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-16 sm:py-24 bg-white">
				<div className="max-w-3xl mx-auto px-6 sm:px-8">
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={faq.question}
								value={`faq-${index}`}
								className="border-brand-primary-dark/10"
							>
								<AccordionTrigger className="text-left font-heading text-lg sm:text-xl text-brand-primary-dark hover:no-underline">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-base text-brand-primary-dark/70 leading-relaxed">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</div>
	);
}

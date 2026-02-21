import { createFileRoute } from "@tanstack/react-router";
import {
	Droplets,
	Eye,
	Gem,
	Globe,
	MapPin,
	Package,
	Scissors,
	ShieldCheck,
	Sparkles,
	TrendingUp,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { breadcrumbJsonLd, buildMeta, faqJsonLd, howToJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
	head: () =>
		buildMeta({
			title: "Preguntas Frecuentes",
			description:
				"Resolvemos tus dudas sobre esmeraldas colombianas: certificados, envios internacionales, devoluciones, compras al por mayor y mas.",
			path: "/faq",
			jsonLd: [
				faqJsonLd(allFaqs),
				howToJsonLd({
					name: "Como elegir una esmeralda colombiana",
					description:
						"Guia paso a paso para evaluar y comprar una esmeralda colombiana de calidad, basada en los criterios usados por gemologos certificados.",
					steps: buyerGuide.map((item) => ({
						name: item.title,
						text: item.description,
					})),
				}),
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
		subtitle: "El factor mas importante",
		description:
			"Busca un verde intenso y vivo con buena saturacion. Las mejores esmeraldas colombianas tienen un tono verde puro, sin tonos amarillentos o azulados excesivos. Un color uniforme y profundo indica mayor calidad y valor.",
	},
	{
		icon: Eye,
		title: "Claridad",
		subtitle: "Las inclusiones cuentan una historia",
		description:
			"A diferencia de los diamantes, las inclusiones en esmeraldas son esperadas y se conocen como jardin. Lo importante es que no afecten la transparencia ni la durabilidad. Una esmeralda AAA tendra pocas inclusiones visibles a simple vista.",
	},
	{
		icon: Scissors,
		title: "Corte",
		subtitle: "Maximiza el brillo",
		description:
			"Un buen corte realza el color y minimiza las inclusiones. El corte esmeralda (rectangular con esquinas recortadas) es el clasico, pero los cortes oval y pera tambien son populares. Observa que las facetas sean simetricas y la piedra tenga buen brillo.",
	},
	{
		icon: Gem,
		title: "Quilates",
		subtitle: "Tamano vs. calidad",
		description:
			"El peso en quilates afecta el precio, pero no siempre indica calidad. Una esmeralda mas pequena con excelente color y claridad puede valer mas que una grande con defectos. Para joyeria, entre 0.5 y 2 quilates ofrece el mejor balance.",
	},
	{
		icon: MapPin,
		title: "Origen",
		subtitle: "Colombia, la referencia mundial",
		description:
			"Las esmeraldas colombianas de Muzo, Chivor y Coscuez son las mas valoradas del mundo por su color verde intenso unico. El origen afecta significativamente el valor: una esmeralda colombiana certificada tiene mayor demanda y precio en el mercado.",
	},
	{
		icon: ShieldCheck,
		title: "Certificacion",
		subtitle: "Tu garantia de confianza",
		description:
			"Siempre solicita un certificado de un laboratorio reconocido (GIA, Gubelin, SSEF). El certificado confirma autenticidad, origen, tratamientos y caracteristicas. Desconfia de vendedores que no ofrezcan certificacion independiente.",
	},
];

const faqGroups: {
	category: string;
	icon: React.ElementType;
	faqs: { question: string; answer: string }[];
}[] = [
	{
		category: "Autenticidad",
		icon: ShieldCheck,
		faqs: [
			{
				question: "Las esmeraldas vienen con certificado de autenticidad?",
				answer:
					"Si, todas nuestras esmeraldas incluyen un certificado de autenticidad que detalla el origen, claridad, peso en quilates y corte de la piedra. Tambien ofrecemos certificacion GIA, Gubelin y SSEF bajo solicitud. El certificado confirma que la piedra es natural y documenta cualquier tratamiento aplicado.",
			},
			{
				question: "Como puedo verificar que una esmeralda es colombiana?",
				answer:
					"El origen colombiano se certifica mediante analisis espectroscopico en laboratorios gemologicos como GIA, Gubelin o SSEF. Estos laboratorios identifican las caracteristicas quimicas y las inclusiones tipicas de las minas colombianas (Muzo, Chivor, Coscuez, Gachala). Todas nuestras piedras tienen trazabilidad completa desde la mina.",
			},
			{
				question: "Que diferencia hay entre GIA, Gubelin y SSEF?",
				answer:
					"Los tres son laboratorios gemologicos de primera clase. GIA (Gemological Institute of America) es el mas reconocido globalmente y el preferido para el mercado americano. Gubelin (Suiza) y SSEF (Suiza) son los estandares de referencia para el mercado europeo y asiatico, especialmente para piedras de alta gama. Para esmeraldas de inversion sobre 2 quilates, recomendamos Gubelin o SSEF por su reputacion en la industria.",
			},
		],
	},
	{
		category: "Calidad",
		icon: Sparkles,
		faqs: [
			{
				question: "Como puedo verificar la calidad de una esmeralda?",
				answer:
					"Cada esmeralda viene clasificada por claridad (AAA, AA, A, B), origen y corte. La claridad AAA indica transparencia excepcional, color vivid y ninguna inclusion visible a simple vista. Puedes solicitar una evaluacion independiente por un gemologo certificado. Nuestro equipo esta disponible para resolver cualquier duda sobre la calidad de las piedras.",
			},
			{
				question: "Que son las inclusiones y por que importan?",
				answer:
					"Las inclusiones son caracteristicas internas naturales de la esmeralda, conocidas como jardin. A diferencia de los diamantes, casi todas las esmeraldas tienen inclusiones — son la huella digital natural de la piedra. Lo importante es que no afecten la transparencia ni la durabilidad. Una piedra AAA puede tener inclusiones microscopicas, mientras que una B tendra inclusiones visibles a simple vista.",
			},
			{
				question: "Que significa el tratamiento de aceite de cedro?",
				answer:
					"El aceite de cedro es el tratamiento mas comun y aceptado en la industria esmeraldiera. Consiste en introducir aceite natural en las fisuras superficiales de la piedra para mejorar su claridad visual. Las piedras AAA y AA tienen tratamiento minimo o ninguno. El tratamiento esta siempre documentado en el certificado gemologico. No afecta la autenticidad ni el valor de forma significativa cuando es menor.",
			},
		],
	},
	{
		category: "Compras",
		icon: Gem,
		faqs: [
			{
				question: "Ofrecen descuentos para compras al por mayor?",
				answer:
					"Si, tenemos precios especiales para mayoristas, joyeros y coleccionistas. Ofrecemos lotes certificados organizados por grado de claridad y origen. El descuento varia segun el volumen y la calidad del lote. Visita nuestra seccion de Mayoristas o contactanos directamente para recibir una cotizacion personalizada.",
			},
			{
				question: "Cual es la politica de devoluciones?",
				answer:
					"Ofrecemos una garantia de satisfaccion de 30 dias. Si la esmeralda no cumple con tus expectativas o la descripcion del certificado, puedes devolverla sin costo adicional y te reembolsamos el 100% del valor. La piedra debe devolverse en su estado original con el certificado incluido.",
			},
			{
				question: "Aceptan pagos internacionales?",
				answer:
					"Si, aceptamos transferencias bancarias internacionales (SWIFT/IBAN), tarjetas de credito Visa y Mastercard, y pagos en criptomonedas para compras mayoristas. Para pedidos sobre USD $5,000 requerimos transferencia bancaria. Todas las transacciones se procesan en USD.",
			},
		],
	},
	{
		category: "Envios",
		icon: Globe,
		faqs: [
			{
				question: "Realizan envios internacionales?",
				answer:
					"Si, enviamos a todo el mundo. Todos los envios incluyen seguro completo contra perdida o dano, embalaje de seguridad certificado y numero de rastreo. Los tiempos de entrega son 3-5 dias habiles para Colombia y 7-14 dias para destinos internacionales via DHL o FedEx.",
			},
			{
				question: "Que pasa con los impuestos de importacion?",
				answer:
					"Los aranceles e impuestos de importacion son responsabilidad del comprador y varian segun el pais de destino. Para la Union Europea, las gemas naturales tienen un arancel reducido. Te proporcionamos toda la documentacion aduanera necesaria incluyendo el certificado de origen, factura comercial y certificado gemologico.",
			},
		],
	},
	{
		category: "Joyeria",
		icon: Package,
		faqs: [
			{
				question: "Trabajan con piedras montadas o solo sueltas?",
				answer:
					"Principalmente trabajamos con esmeraldas sueltas certificadas, pero tambien ofrecemos servicios de montaje personalizado en colaboracion con joyeros expertos. Puedes elegir la piedra suelta y coordinar con nuestro equipo el diseno de la montura en oro 18k, oro rosa o plata 925.",
			},
			{
				question: "Puedo encargar una pieza de joyeria personalizada?",
				answer:
					"Si, ofrecemos servicio de joyeria a medida. El proceso es: seleccionas la esmeralda, defines el diseno de la montura (anillo, collar, aretes, pulsera), y nuestros artesanos colombianos la fabrican en 3-4 semanas. Para diseños personalizados contactanos directamente con tus ideas o referencias.",
			},
		],
	},
	{
		category: "Inversion",
		icon: TrendingUp,
		faqs: [
			{
				question: "Las esmeraldas son una buena inversion?",
				answer:
					"Las esmeraldas colombianas de alta calidad (AAA, certificadas, sin tratamiento o con tratamiento minimo, sobre 2 quilates) han demostrado apreciacion historica sostenida. A diferencia de los diamantes, la oferta de esmeraldas colombianas premium es limitada y la demanda global crece especialmente en Asia. Para inversion, priorizamos piedras con certificado Gubelin o SSEF, origen Muzo o Chivor, y color vivid.",
			},
			{
				question: "Como almaceno y aseguro mis esmeraldas?",
				answer:
					"Las esmeraldas tienen dureza 7.5-8 en la escala Mohs, por lo que deben almacenarse separadas de otras gemas y metales que puedan rayarlas. Usa estuches individuales acolchados. Evita temperaturas extremas, ultrasonicos y vapor. Para piezas de valor, recomendamos seguro gemologico especifico — podemos orientarte con aseguradoras especializadas en gemas.",
			},
		],
	},
];

// Flatten all FAQs for the JSON-LD schema
const allFaqs = faqGroups.flatMap((g) => g.faqs);

// React type for icon
import type React from "react";

function FaqPage() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-brand-primary-dark px-6 py-16 text-center sm:px-8 sm:py-24">
				<p className="mb-4 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-golden sm:mb-6 sm:text-sm">
					Resolvemos tus dudas
				</p>
				<h1 className="mx-auto mb-4 max-w-3xl font-heading text-3xl text-brand-primary-lighter sm:mb-6 sm:text-4xl md:text-6xl">
					Preguntas Frecuentes
				</h1>
				<p className="mx-auto max-w-xl font-body text-base leading-relaxed text-brand-primary-lighter/80 sm:text-lg">
					Todo lo que necesitas saber sobre nuestras esmeraldas, envios,
					certificaciones y mas.
				</p>
			</section>

			{/* Buyer's Guide */}
			<section className="bg-brand-surface py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-12 text-center sm:mb-16">
						<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-terra sm:text-sm">
							Guia para compradores
						</p>
						<h2 className="mb-4 font-heading text-3xl text-brand-primary-dark sm:text-4xl">
							Como elegir una buena esmeralda
						</h2>
						<p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-brand-primary-dark/70 sm:text-lg">
							Si es tu primera vez comprando una esmeralda, estos son los
							factores clave que debes evaluar para hacer una inversion
							inteligente.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{buyerGuide.map((item) => (
							<div
								key={item.title}
								className="rounded-2xl border border-brand-primary-dark/5 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
							>
								<div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-lighter">
									<item.icon className="h-6 w-6 text-brand-secondary-terra" />
								</div>
								<h3 className="mb-1 font-heading text-xl text-brand-primary-dark">
									{item.title}
								</h3>
								<p className="mb-3 font-body text-xs uppercase tracking-wide text-brand-secondary-terra">
									{item.subtitle}
								</p>
								<p className="font-body text-sm leading-relaxed text-brand-primary-dark/70">
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ grouped by category */}
			<section className="bg-white py-16 sm:py-24">
				<div className="mx-auto max-w-3xl px-6 sm:px-8">
					<div className="mb-12 text-center">
						<h2 className="font-heading text-3xl text-brand-primary-dark sm:text-4xl">
							Preguntas y Respuestas
						</h2>
					</div>
					<div className="space-y-12">
						{faqGroups.map((group) => {
							const Icon = group.icon;
							return (
								<div key={group.category}>
									<div className="mb-4 flex items-center gap-3">
										<span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary-dark/10">
											<Icon className="h-4 w-4 text-brand-primary-dark" />
										</span>
										<h3 className="font-heading text-xl text-brand-primary-dark">
											{group.category}
										</h3>
									</div>
									<Accordion type="single" collapsible className="w-full">
										{group.faqs.map((faq, index) => (
											<AccordionItem
												key={faq.question}
												value={`${group.category}-${index}`}
												className="border-brand-primary-dark/10"
											>
												<AccordionTrigger className="text-left font-heading text-lg text-brand-primary-dark hover:no-underline sm:text-xl">
													{faq.question}
												</AccordionTrigger>
												<AccordionContent className="text-base leading-relaxed text-brand-primary-dark/70">
													{faq.answer}
												</AccordionContent>
											</AccordionItem>
										))}
									</Accordion>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
}

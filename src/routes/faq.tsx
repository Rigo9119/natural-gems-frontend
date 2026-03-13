import { createFileRoute } from "@tanstack/react-router";
import {
	BadgeDollarSign,
	Droplets,
	Eye,
	FlaskConical,
	Gem,
	MapPin,
	Microscope,
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
import { prefetchFaqPageData } from "@/data/page-data";
import { faqPageQueryOptions } from "@/lib/sanity/sanity-queries";
import type { SeoMetadata } from "@/lib/sanity/sanity-types";
import {
	breadcrumbJsonLd,
	buildMeta,
	faqJsonLd,
	howToJsonLd,
	resolveSanityMeta,
} from "@/lib/seo";

export const Route = createFileRoute("/faq")({
	head: ({ loaderData }) =>
		buildMeta(
			resolveSanityMeta(
				(loaderData as { seo?: SeoMetadata } | undefined)?.seo,
				{
					title: "Preguntas Frecuentes",
					description:
						"Resolvemos tus dudas sobre esmeraldas colombianas: cómo elegir la piedra correcta, certificados, envíos internacionales, devoluciones, inversión y más.",
					path: "/faq",
					jsonLd: [
						faqJsonLd(faqs),
						howToJsonLd(
							"Cómo elegir una buena esmeralda colombiana",
							"Guía para compradores: los 6 factores clave para evaluar una esmeralda antes de comprar.",
							buyerGuide.map((item) => ({
								name: item.title,
								text: item.description,
							})),
						),
						breadcrumbJsonLd([
							{ name: "Inicio", path: "/" },
							{ name: "Preguntas Frecuentes", path: "/faq" },
						]),
					],
				},
			),
		),
	loader: async ({ context }) => {
		await prefetchFaqPageData(context.queryClient);
		const data = context.queryClient.getQueryData<{ seo?: SeoMetadata }>(
			faqPageQueryOptions().queryKey,
		);
		return { seo: data?.seo };
	},
	component: FaqPage,
});

const buyerGuide = [
	{
		icon: Droplets,
		title: "Color",
		subtitle: "El factor más importante",
		description:
			"Busca un verde intenso y vivo con buena saturación. Las mejores esmeraldas colombianas tienen un tono verde puro causado por el cromo, sin tonos amarillentos o azulados excesivos. El color ideal se describe como «vivid green» — saturación alta, tono medio-oscuro, hue puro. Un color uniforme y profundo indica mayor calidad y valor. Las esmeraldas de Muzo son el estándar de referencia para el color.",
	},
	{
		icon: Eye,
		title: "Claridad",
		subtitle: "Las inclusiones cuentan una historia",
		description:
			'A diferencia de los diamantes, las inclusiones en esmeraldas son esperadas y se conocen poéticamente como "jardín". Casi todas las esmeraldas naturales las tienen. Lo importante es que no afecten la transparencia ni la durabilidad. Una esmeralda AAA será ojo limpio (eye-clean) o casi ojo limpio, con inclusiones visibles solo bajo lupa 10x. Una esmeralda sin ninguna inclusión es una señal de alerta — probablemente es sintética.',
	},
	{
		icon: Scissors,
		title: "Corte",
		subtitle: "Maximiza el brillo",
		description:
			"Un buen corte realza el color y minimiza las inclusiones visibles. El corte esmeralda (rectangular con esquinas octogonales) es el clásico — diseñado específicamente para este tipo de piedra. Los cortes oval y pera también son muy populares. Observa que las facetas sean simétricas, que la piedra tenga buena ventana (no demasiado clara en el centro), y que el brillo sea uniforme en toda la superficie.",
	},
	{
		icon: Gem,
		title: "Quilates",
		subtitle: "Tamaño vs. calidad",
		description:
			"El peso en quilates afecta el precio de forma no lineal. Una esmeralda de 3 quilates no cuesta 3 veces más que una de 1 quilate — puede costar 5 a 8 veces más, porque las piedras grandes de calidad fina son exponencialmente más raras. Para joyería de uso diario, entre 0.5 y 1.5 quilates en grado AA ofrece el mejor balance visual y económico. Para inversión, apunta a 2+ quilates en AAA.",
	},
	{
		icon: MapPin,
		title: "Origen",
		subtitle: "Colombia, la referencia mundial",
		description:
			"Colombia produce el 70–90% de las esmeraldas finas del mundo. Dentro de Colombia, Muzo es el origen más valorado por su color verde profundo y cálido — el estándar de referencia global. Le siguen Chivor (verde azulado, mayor claridad) y Coscuez (color intenso). Un certificado de origen de GIA, Gübelin o SSEF puede añadir un 20–40% al valor de la piedra sobre una esmeralda colombiana sin origen documentado.",
	},
	{
		icon: ShieldCheck,
		title: "Certificación",
		subtitle: "Tu garantía de confianza",
		description:
			"Siempre solicita un certificado de un laboratorio reconocido: GIA (el más conocido mundialmente), Gübelin (estándar de lujo en Europa), o SSEF (muy respetado en Asia). El certificado confirma autenticidad, origen geográfico, tratamientos aplicados y sus características físicas. Desconfía de vendedores que no ofrezcan certificación independiente: sin certificado no hay forma objetiva de verificar lo que te están vendiendo.",
	},
];

const faqs = [
	// ── Autenticidad y certificación ──
	{
		question: "¿Las esmeraldas vienen con certificado de autenticidad?",
		answer:
			"Sí, todas nuestras esmeraldas incluyen un certificado de autenticidad propio que detalla el origen (región minera), claridad (AAA/AA/A/B), peso en quilates y corte de la piedra. Para compradores que requieren verificación internacional independiente, ofrecemos certificación GIA bajo solicitud. Para el mercado europeo o asiático, también gestionamos certificados Gübelin y SSEF. El certificado siempre especifica si la piedra ha recibido algún tratamiento y en qué grado.",
	},
	{
		question:
			"¿Cuál es la diferencia entre una esmeralda natural, sintética y tratada?",
		answer:
			"Una esmeralda natural se formó por procesos geológicos durante millones de años — esto es lo único que vendemos en Natura Gems. Una esmeralda sintética (creada en laboratorio) tiene la misma composición química pero se fabrica en semanas; vale un 95–99% menos que una natural de apariencia equivalente. Una esmeralda tratada es una piedra natural cuya claridad se mejoró con aceite de cedro o resina para rellenar fracturas superficiales — es una práctica aceptada y estándar en el mercado siempre que se declare abiertamente. En Natura Gems siempre divulgamos el tipo y grado de tratamiento.",
	},
	{
		question: "¿Cómo puedo saber si una esmeralda es falsa o sintética?",
		answer:
			"Las señales de alerta más comunes: (1) Claridad perfecta sin ninguna inclusión — las esmeraldas naturales casi siempre tienen inclusiones (jardín); una piedra sin ninguna debe generar sospecha. (2) Precio anormalmente bajo — una esmeralda colombiana AAA legítima cuesta miles de dólares por quilate; una «AAA colombiana» a $50 no lo es. (3) Sin certificado de laboratorio reconocido. (4) Color demasiado uniforme y artificial. Para certeza total, solicita un informe de GIA, Gübelin o SSEF — estos laboratorios distinguen infaliblemente natural de sintético y determinan el origen geográfico.",
	},
	{
		question: "¿Cómo puedo verificar la calidad de una esmeralda?",
		answer:
			"Cada esmeralda de Natura Gems viene documentada con su claridad (AAA/AA/A/B), origen, corte y quilates. Para verificación independiente, puedes solicitar un certificado de GIA, Gübelin o SSEF — nosotros te asistimos en el proceso. También puedes llevar la piedra con cualquier gemólogo certificado (FGA, GIA GG, o equivalente). Damos la bienvenida a evaluaciones independientes porque tenemos plena confianza en nuestros estándares de calidad.",
	},
	// ── Compra y precio ──
	{
		question:
			"¿Son las esmeraldas colombianas mejores que las de otros países?",
		answer:
			"Las esmeraldas colombianas son consideradas universalmente las mejores del mundo por su color único. La diferencia clave es el agente colorante: las colombianas deben su color principalmente al cromo, que produce un verde cálido, puro e intenso. Las de Zambia, Brasil o Zimbabwe suelen colorearse por vanadio o hierro, produciendo un verde más frío o ligeramente grisáceo. Dicho esto, una esmeralda zambiana de excelente claridad puede superar a una colombiana de baja calidad. El origen es un factor importante, no el único.",
	},
	{
		question: "¿Varían los precios según la mina de origen dentro de Colombia?",
		answer:
			"Sí. Dentro de las esmeraldas colombianas, las de Muzo generalmente alcanzan los precios más altos por su legendaria reputación de color, seguidas de Chivor y Coscuez. Las de Gachala son más raras pero menos conocidas internacionalmente. El sobreprecio por origen certificado Muzo puede ser del 20–40% sobre una piedra colombiana equivalente sin origen documentado. Este diferencial es mayor en los mercados de lujo e inversión (Europa, Asia) y menor en el mercado minorista masivo.",
	},
	{
		question: "¿Qué grado de claridad me conviene según mi presupuesto?",
		answer:
			"Para inversión: solo AAA. La rareza y el potencial de apreciación están concentrados en el grado más alto. Para un anillo de compromiso o pieza especial: AA o AAA — quieres una piedra ojo limpio que sea visualmente espectacular. Para joyería del día a día o aretes: el grado A es ideal — buena belleza a un precio accesible. Para diseños artesanales o bohemios: el grado B tiene carácter y es asequible. Guía de presupuesto: menos de $500 USD → B o A; $500–$2,000 → A o AA; más de $2,000 → apunta a AA o AAA.",
	},
	// ── Compras al por mayor ──
	{
		question: "¿Ofrecen descuentos para compras al por mayor?",
		answer:
			"Sí. Tenemos un programa mayorista dedicado para joyeros, retailers, comerciantes de gemas y compradores en volumen. Ofrecemos lotes certificados organizados por grado de claridad, origen y rango de quilates. Los descuentos por volumen aplican desde el primer lote. Contáctanos por WhatsApp (+57 300 123 4567) o email (info@naturagems.co) con tus requerimientos específicos para recibir una cotización personalizada.",
	},
	// ── Envíos y devoluciones ──
	{
		question: "¿Realizan envíos internacionales?",
		answer:
			"Sí, enviamos a todo el mundo. Cada envío internacional está asegurado al 100% contra pérdida, robo o daño durante el tránsito, e incluye seguimiento en tiempo real. Tiempos de entrega: 3–5 días hábiles dentro de Colombia, 7–14 días hábiles internacionalmente según el destino y la aduana. Tenemos experiencia enviando a EE.UU., Europa, Japón, Medio Oriente y América Latina.",
	},
	{
		question: "¿Cuál es la política de devoluciones?",
		answer:
			"Ofrecemos una garantía de satisfacción de 30 días sin condiciones. Si tu esmeralda no cumple con tus expectativas por cualquier motivo — color, tamaño, claridad — puedes devolverla dentro de los 30 días de recibida para un reembolso del 100%. La piedra debe ser devuelta en su condición original con su certificado de autenticidad. Los costos de envío de devolución son cubiertos por Natura Gems.",
	},
	// ── Joyería y monturas ──
	{
		question: "¿Trabajan con piedras montadas o solo sueltas?",
		answer:
			"Nuestro negocio principal son esmeraldas sueltas certificadas. Sin embargo, también ofrecemos servicios de diseño y montaje personalizado en colaboración con artesanos y joyeros colombianos expertos. Si tienes un diseño específico en mente, contáctanos — podemos guiarte desde la selección de la piedra hasta la pieza terminada. También llevamos una colección de joyería lista para usar (anillos, collares, aretes, pulseras, dijes) con nuestras esmeraldas.",
	},
	{
		question: "¿Pueden las esmeraldas usarse en un anillo de compromiso?",
		answer:
			"Sí, con el cuidado adecuado. Las esmeraldas (Mohs 7.5–8) son más duras que la mayoría de las piedras preciosas, pero más frágiles que los diamantes (Mohs 10) debido a sus inclusiones naturales. Para uso diario en un anillo, elige un estilo de montura protectora (bisel o halo en vez de garras altas), evita actividades de impacto fuerte, y limpia suavemente con agua tibia y cepillo suave. Históricamente, muchos anillos de compromiso reales y famosos llevan esmeraldas — el anillo de Elizabeth Taylor de Richard Burton es el ejemplo más célebre.",
	},
	// ── Inversión y cuidados ──
	{
		question: "¿Son las esmeraldas colombianas una buena inversión?",
		answer:
			"Las esmeraldas colombianas finas — especialmente piedras AAA de Muzo de 2+ quilates con certificado GIA o Gübelin — han apreciado históricamente su valor por encima de la inflación durante las últimas tres décadas. A diferencia del oro o las acciones, son activos tangibles, portables y usables. La oferta es finita: las minas de Muzo llevan 500+ años en producción y no son inagotables. La demanda global crece, especialmente en China, India y Medio Oriente. Para valor de inversión, solo considera grados AAA o AA con origen documentado y certificado de laboratorio reconocido.",
	},
	{
		question: "¿Cómo se cuidan y limpian las esmeraldas?",
		answer:
			"Limpieza segura: agua tibia con jabón suave y cepillo de cerdas blandas. Enjuaga bien. Evita: limpiadoras ultrasónicas (las vibraciones pueden extender fracturas), limpiadoras de vapor (el calor puede afectar los tratamientos de aceite), y químicos fuertes como blanqueador o amoníaco. Almacenamiento: guarda las esmeraldas separadas de piedras más duras (diamantes, zafiros) para evitar rayones. Usa una funda suave o caja forrada. Las esmeraldas tratadas pueden necesitar re-aceitado cada 5–10 años si se guardan en condiciones muy secas o se limpian frecuentemente — es un servicio estándar de joyería que no afecta el valor de la piedra.",
	},
	{
		question: "¿Qué peso en quilates es ideal para un anillo de compromiso?",
		answer:
			"Para un anillo solitario, el rango más popular es 1–2 quilates. Esto ofrece buena presencia visual sin el salto de precio que ocurre por encima de 2 quilates (donde las piedras finas se vuelven exponencialmente más raras). Una esmeralda de 1 quilate AAA de Muzo en montura de oro 18K típicamente luce más impresionante que una de 2 quilates grado B. Para un anillo de tres piedras o con laterales, piedras centrales de 0.5–0.8 quilates en grado AAA son también muy populares. Recuerda: la calidad supera al tamaño.",
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
					certificaciones, inversión y más.
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
							Si es tu primera vez comprando una esmeralda, estos son los 6
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

			{/* FAQ — grouped by category */}
			<section className="py-16 sm:py-24 bg-white">
				<div className="max-w-3xl mx-auto px-6 sm:px-8">
					{faqGroups.map((group) => (
						<div key={group.label} className="mb-12">
							<div className="flex items-center gap-3 mb-6">
								<div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-primary-lighter flex-shrink-0">
									<group.icon className="w-4 h-4 text-brand-secondary-terra" />
								</div>
								<h2 className="font-heading text-xl text-brand-primary-dark">
									{group.label}
								</h2>
							</div>
							<Accordion type="single" collapsible className="w-full">
								{group.items.map((faq, index) => (
									<AccordionItem
										key={faq.question}
										value={`${group.label}-${index}`}
										className="border-brand-primary-dark/10"
									>
										<AccordionTrigger className="text-left font-heading text-base sm:text-lg text-brand-primary-dark hover:no-underline">
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className="text-base text-brand-primary-dark/70 leading-relaxed">
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}

// Group FAQs by category for the UI
const faqGroups = [
	{
		label: "Autenticidad y certificación",
		icon: FlaskConical,
		items: faqs.slice(0, 4),
	},
	{
		label: "Calidad y origen",
		icon: Microscope,
		items: faqs.slice(4, 7),
	},
	{
		label: "Compras y mayoristas",
		icon: BadgeDollarSign,
		items: faqs.slice(7, 8),
	},
	{
		label: "Envíos y devoluciones",
		icon: Sparkles,
		items: faqs.slice(8, 10),
	},
	{
		label: "Joyería y monturas",
		icon: Gem,
		items: faqs.slice(10, 12),
	},
	{
		label: "Inversión y cuidados",
		icon: TrendingUp,
		items: faqs.slice(12, 15),
	},
];

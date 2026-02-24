export type Origin = "Muzo" | "Chivor" | "Coscuez" | "Gachala";
export type Clarity = "AAA" | "AA" | "A" | "B";
export type Cut = "Emerald" | "Oval" | "Pear" | "Round";

export interface Product {
	id: number;
	slug: string;
	image: string;
	name: string;
	price: number;
	carat: number;
	origin: Origin;
	clarity: Clarity;
	cut: Cut;
	description?: string;
	certifiedBy?: string;
	dimensions?: string;
	color?: string;
}

export const origins: Origin[] = ["Muzo", "Chivor", "Coscuez", "Gachala"];
export const clarities: Clarity[] = ["AAA", "AA", "A", "B"];
export const cuts: Cut[] = ["Emerald", "Oval", "Pear", "Round"];

export const demoProducts: Product[] = [
	{
		id: 1,
		slug: "esmeralda-muzo-premium",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Premium",
		price: 4500,
		carat: 2.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde intenso con tinte azulado",
		dimensions: "9.2 × 7.1 × 4.8 mm",
		certifiedBy: "GIA",
		description:
			"Magnífica esmeralda de la región de Muzo con el característico verde intenso y profundo que define las gemas de esta mina. Incluye trazas de jadinería natural que certifican su origen colombiano. Sin tratamiento de aceite significativo.",
	},
	{
		id: 2,
		slug: "esmeralda-chivor-brillante",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Brillante",
		price: 3200,
		carat: 2.1,
		origin: "Chivor",
		clarity: "AAA",
		cut: "Oval",
		color: "Verde medio con destellos azules",
		dimensions: "8.8 × 6.9 × 4.5 mm",
		certifiedBy: "Gübelin",
		description:
			"Esmeralda de Chivor con el inconfundible tono verde-azul que distingue las piedras de esta región. Claridad excepcional con inclusiones mínimas visibles solo bajo lupa. Corte oval que maximiza la luminosidad de la gema.",
	},
	{
		id: 3,
		slug: "esmeralda-coscuez-clasica",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Clásica",
		price: 1800,
		carat: 1.2,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Pear",
		color: "Verde vivo con ligero tinte amarillo",
		dimensions: "7.4 × 5.2 × 3.6 mm",
		certifiedBy: "CDT Bogotá",
		description:
			"Esmeralda de Coscuez con el vibrante color verde intenso típico de esta mina boyacense. Corte pera elegante ideal para colgantes y aretes. Incluye certificado de origen colombiano y jadinería auténtica.",
	},
	{
		id: 4,
		slug: "esmeralda-gachala-selecta",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Selecta",
		price: 5500,
		carat: 3.0,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Round",
		color: "Verde oscuro con saturation excepcional",
		dimensions: "9.8 × 9.8 × 6.1 mm",
		certifiedBy: "SSEF",
		description:
			"Rarísima esmeralda de Gachalá, región con producción muy limitada. Verde oscuro y saturado que es altamente cotizado en el mercado internacional. Corte redondo perfecto con simetría excelente certificada por SSEF Suiza.",
	},
	{
		id: 5,
		slug: "esmeralda-muzo-natural",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Natural",
		price: 2800,
		carat: 1.8,
		origin: "Muzo",
		clarity: "AA",
		cut: "Emerald",
		color: "Verde puro sin tratamiento",
		dimensions: "8.1 × 6.3 × 4.2 mm",
		certifiedBy: "GIA",
		description:
			"Esmeralda de Muzo con el codiciado color verde puro, sin aceite ni tratamiento significativo. La jadinería interna confirma su origen y autenticidad. Corte esmeralda clásico que resalta la profundidad del color.",
	},
	{
		id: 6,
		slug: "esmeralda-chivor-elegante",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Elegante",
		price: 1500,
		carat: 0.9,
		origin: "Chivor",
		clarity: "A",
		cut: "Oval",
		color: "Verde medio brillante",
		dimensions: "6.8 × 5.1 × 3.3 mm",
		certifiedBy: "CDT Bogotá",
		description:
			"Esmeralda de Chivor de tamaño ideal para joyería fina. Color verde medio con el característico brillo de la región. Corte oval de proporciones perfectas, ideal para anillos o colgantes en oro 18k.",
	},
	{
		id: 7,
		slug: "esmeralda-coscuez-vintage",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Vintage",
		price: 2200,
		carat: 1.5,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Round",
		color: "Verde cálido con tonos dorados",
		dimensions: "7.2 × 7.2 × 4.6 mm",
		certifiedBy: "Gübelin",
		description:
			"Esmeralda de Coscuez con el singular tono verde cálido que recuerda las gemas de épocas pasadas. Su aspecto vintage la hace perfecta para joyería artesanal de estilo retro o bohemio. Redonda y simétrica con buen fuego interno.",
	},
	{
		id: 8,
		slug: "esmeralda-gachala-especial",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Especial",
		price: 3800,
		carat: 2.3,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Pear",
		color: "Verde intenso con alta luminosidad",
		dimensions: "9.0 × 6.5 × 4.4 mm",
		certifiedBy: "SSEF",
		description:
			"Esmeralda especial de Gachalá con una claridad sobresaliente que permite ver el color en toda su profundidad. El corte pera accentúa la luminosidad y crea un efecto visual único bajo la luz natural y artificial.",
	},
	{
		id: 9,
		slug: "esmeralda-muzo-exclusiva",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Exclusiva",
		price: 6200,
		carat: 3.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde real — la más alta expresión del color Muzo",
		dimensions: "10.5 × 8.2 × 5.3 mm",
		certifiedBy: "GIA",
		description:
			"Una de las esmeraldas más excepcionales de nuestra colección. El verde profundo y vivo de Muzo en su máxima expresión, con una saturación y tono que raramente se encuentran en el mercado. Pieza de colección o inversión segura a largo plazo.",
	},
	{
		id: 10,
		slug: "esmeralda-chivor-delicada",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Delicada",
		price: 950,
		carat: 0.6,
		origin: "Chivor",
		clarity: "B",
		cut: "Round",
		color: "Verde suave con destellos plateados",
		dimensions: "5.4 × 5.4 × 3.5 mm",
		certifiedBy: "CDT Bogotá",
		description:
			"Esmeralda delicada de Chivor, ideal para quien busca su primera pieza colombiana. Pequeña pero auténtica, con el encanto verde suave típico de la región. Perfecta como regalo o para montar en un anillo minimalista.",
	},
	{
		id: 11,
		slug: "esmeralda-coscuez-moderna",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Moderna",
		price: 2600,
		carat: 1.7,
		origin: "Coscuez",
		clarity: "A",
		cut: "Oval",
		color: "Verde brillante con tonos vivos",
		dimensions: "8.4 × 6.2 × 4.0 mm",
		certifiedBy: "CDT Bogotá",
		description:
			"Esmeralda de Coscuez con un corte oval moderno que refleja la luz de forma uniforme. Color verde vivo y brillante que destaca tanto en joyería clásica como contemporánea. Excelente relación calidad-precio.",
	},
	{
		id: 12,
		slug: "esmeralda-gachala-imperial",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Imperial",
		price: 7500,
		carat: 4.2,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde imperial — color de colección",
		dimensions: "12.1 × 9.4 × 6.2 mm",
		certifiedBy: "Gübelin",
		description:
			"La joya de nuestra colección. Esta esmeralda imperial de Gachalá es una pieza única con un color verde de una profundidad y saturación que solo se consigue en una de cada mil piedras. Certificada por Gübelin, el laboratorio más prestigioso del mundo para esmeraldas.",
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return demoProducts.find((p) => p.slug === slug);
}

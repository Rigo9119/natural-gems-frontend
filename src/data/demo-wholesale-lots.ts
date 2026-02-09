import type { Clarity, Cut, Origin } from "./demo-products";

export type { Clarity, Cut, Origin };
export { clarities, cuts, origins } from "./demo-products";

export interface WholesaleLot {
	id: number;
	image: string;
	name: string;
	description: string;
	totalPrice: number;
	totalCarats: number;
	stoneCount: number;
	origin: Origin;
	clarity: Clarity;
	cut: Cut;
}

export const demoWholesaleLots: WholesaleLot[] = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Muzo Premium AAA",
		description:
			"Selección premium de esmeraldas AAA de la mina de Muzo, corte esmeralda uniforme",
		totalPrice: 45000,
		totalCarats: 25.0,
		stoneCount: 10,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Chivor Brillante",
		description:
			"Conjunto de esmeraldas de Chivor con excelente brillo y corte oval",
		totalPrice: 28000,
		totalCarats: 18.5,
		stoneCount: 12,
		origin: "Chivor",
		clarity: "AA",
		cut: "Oval",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Coscuez Clásico",
		description:
			"Esmeraldas clásicas de Coscuez, ideales para joyería artesanal",
		totalPrice: 15000,
		totalCarats: 12.0,
		stoneCount: 8,
		origin: "Coscuez",
		clarity: "A",
		cut: "Pear",
	},
	{
		id: 4,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Gachalá Imperial",
		description:
			"Piedras excepcionales de Gachalá con la mejor claridad del mercado",
		totalPrice: 72000,
		totalCarats: 35.0,
		stoneCount: 15,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Round",
	},
	{
		id: 5,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Muzo Natural",
		description: "Esmeraldas naturales sin tratamiento de la región de Muzo",
		totalPrice: 32000,
		totalCarats: 20.0,
		stoneCount: 14,
		origin: "Muzo",
		clarity: "AA",
		cut: "Emerald",
	},
	{
		id: 6,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Chivor Delicado",
		description:
			"Piedras pequeñas de alta calidad, perfectas para diseños delicados",
		totalPrice: 9500,
		totalCarats: 6.0,
		stoneCount: 20,
		origin: "Chivor",
		clarity: "A",
		cut: "Round",
	},
	{
		id: 7,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Coscuez Volumen",
		description:
			"Lote grande de esmeraldas de Coscuez para producción en serie",
		totalPrice: 18000,
		totalCarats: 30.0,
		stoneCount: 25,
		origin: "Coscuez",
		clarity: "B",
		cut: "Oval",
	},
	{
		id: 8,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Gachalá Selecta",
		description: "Selección exclusiva de esmeraldas de Gachalá con corte pera",
		totalPrice: 55000,
		totalCarats: 28.0,
		stoneCount: 10,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Pear",
	},
	{
		id: 9,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Muzo Mixto AA",
		description:
			"Variedad de cortes en esmeraldas AA de Muzo, ideal para colecciones",
		totalPrice: 22000,
		totalCarats: 15.0,
		stoneCount: 10,
		origin: "Muzo",
		clarity: "AA",
		cut: "Pear",
	},
	{
		id: 10,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Lote Chivor Económico",
		description:
			"Lote accesible de esmeraldas de Chivor para mercado mayorista",
		totalPrice: 7500,
		totalCarats: 10.0,
		stoneCount: 18,
		origin: "Chivor",
		clarity: "B",
		cut: "Emerald",
	},
];

export type Origin = "Muzo" | "Chivor" | "Coscuez" | "Gachala";
export type Clarity = "AAA" | "AA" | "A" | "B";
export type Cut = "Emerald" | "Oval" | "Pear" | "Round";

export interface Product {
	id: number;
	image: string;
	name: string;
	price: number;
	carat: number;
	origin: Origin;
	clarity: Clarity;
	cut: Cut;
}

export const origins: Origin[] = ["Muzo", "Chivor", "Coscuez", "Gachala"];
export const clarities: Clarity[] = ["AAA", "AA", "A", "B"];
export const cuts: Cut[] = ["Emerald", "Oval", "Pear", "Round"];

export const demoProducts: Product[] = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Premium",
		price: 4500,
		carat: 2.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Brillante",
		price: 3200,
		carat: 2.1,
		origin: "Chivor",
		clarity: "AAA",
		cut: "Oval",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Clásica",
		price: 1800,
		carat: 1.2,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Pear",
	},
	{
		id: 4,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Selecta",
		price: 5500,
		carat: 3.0,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Round",
	},
	{
		id: 5,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Natural",
		price: 2800,
		carat: 1.8,
		origin: "Muzo",
		clarity: "AA",
		cut: "Emerald",
	},
	{
		id: 6,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Elegante",
		price: 1500,
		carat: 0.9,
		origin: "Chivor",
		clarity: "A",
		cut: "Oval",
	},
	{
		id: 7,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Vintage",
		price: 2200,
		carat: 1.5,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Round",
	},
	{
		id: 8,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Especial",
		price: 3800,
		carat: 2.3,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Pear",
	},
	{
		id: 9,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Muzo Exclusiva",
		price: 6200,
		carat: 3.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
	},
	{
		id: 10,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Chivor Delicada",
		price: 950,
		carat: 0.6,
		origin: "Chivor",
		clarity: "B",
		cut: "Round",
	},
	{
		id: 11,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Coscuez Moderna",
		price: 2600,
		carat: 1.7,
		origin: "Coscuez",
		clarity: "A",
		cut: "Oval",
	},
	{
		id: 12,
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
		name: "Esmeralda Gachalá Imperial",
		price: 7500,
		carat: 4.2,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Emerald",
	},
];

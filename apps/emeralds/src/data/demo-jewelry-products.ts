export type JewelryCategory = "Anillos" | "Collares" | "Pulseras" | "Aretes" | "Dijes";
export type JewelryMaterial = "Oro 18k" | "Plata 925" | "Oro Rosa" | "Platino";
export type JewelryCollection = "Clásica" | "Moderna" | "Bohemia" | "Elegante";

export interface JewelryProduct {
	id: number;
	image: string;
	name: string;
	price: number;
	category: JewelryCategory;
	material: JewelryMaterial;
	collection: JewelryCollection;
	isNew?: boolean;
	isBestSeller?: boolean;
}

export const jewelryCategories: JewelryCategory[] = [
	"Anillos",
	"Collares",
	"Pulseras",
	"Aretes",
	"Dijes",
];

export const jewelryMaterials: JewelryMaterial[] = [
	"Oro 18k",
	"Plata 925",
	"Oro Rosa",
	"Platino",
];

export const jewelryCollections: JewelryCollection[] = [
	"Clásica",
	"Moderna",
	"Bohemia",
	"Elegante",
];

export const demoJewelryProducts: JewelryProduct[] = [
	// Anillos
	{
		id: 1,
		image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
		name: "Anillo Solitario Esmeralda",
		price: 2850000,
		category: "Anillos",
		material: "Oro 18k",
		collection: "Elegante",
		isBestSeller: true,
	},
	{
		id: 2,
		image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&h=400&fit=crop",
		name: "Anillo Infinito",
		price: 1250000,
		category: "Anillos",
		material: "Plata 925",
		collection: "Moderna",
		isNew: true,
	},
	{
		id: 3,
		image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=400&fit=crop",
		name: "Anillo Flor de Loto",
		price: 1890000,
		category: "Anillos",
		material: "Oro Rosa",
		collection: "Bohemia",
	},
	{
		id: 4,
		image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&h=400&fit=crop",
		name: "Anillo Clásico Banda",
		price: 980000,
		category: "Anillos",
		material: "Plata 925",
		collection: "Clásica",
	},

	// Collares
	{
		id: 5,
		image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
		name: "Collar Gota Esmeralda",
		price: 3450000,
		category: "Collares",
		material: "Oro 18k",
		collection: "Elegante",
		isBestSeller: true,
	},
	{
		id: 6,
		image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
		name: "Collar Cadena Delicada",
		price: 750000,
		category: "Collares",
		material: "Plata 925",
		collection: "Moderna",
		isNew: true,
	},
	{
		id: 7,
		image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
		name: "Collar Choker Elegante",
		price: 1650000,
		category: "Collares",
		material: "Oro Rosa",
		collection: "Moderna",
	},
	{
		id: 8,
		image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop",
		name: "Collar Perlas Naturales",
		price: 2100000,
		category: "Collares",
		material: "Oro 18k",
		collection: "Clásica",
	},

	// Pulseras
	{
		id: 9,
		image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
		name: "Pulsera Charm Esmeralda",
		price: 1890000,
		category: "Pulseras",
		material: "Plata 925",
		collection: "Bohemia",
		isBestSeller: true,
	},
	{
		id: 10,
		image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
		name: "Pulsera Eslabones",
		price: 2350000,
		category: "Pulseras",
		material: "Oro 18k",
		collection: "Moderna",
		isNew: true,
	},
	{
		id: 11,
		image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
		name: "Pulsera Rígida Elegante",
		price: 1450000,
		category: "Pulseras",
		material: "Oro Rosa",
		collection: "Elegante",
	},
	{
		id: 12,
		image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
		name: "Pulsera Tennis",
		price: 4200000,
		category: "Pulseras",
		material: "Platino",
		collection: "Elegante",
	},

	// Aretes
	{
		id: 13,
		image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop",
		name: "Aretes Gota Esmeralda",
		price: 2650000,
		category: "Aretes",
		material: "Oro 18k",
		collection: "Elegante",
		isBestSeller: true,
	},
	{
		id: 14,
		image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=400&fit=crop",
		name: "Aretes Argolla Pequeña",
		price: 580000,
		category: "Aretes",
		material: "Plata 925",
		collection: "Moderna",
		isNew: true,
	},
	{
		id: 15,
		image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop",
		name: "Aretes Flor",
		price: 1350000,
		category: "Aretes",
		material: "Oro Rosa",
		collection: "Bohemia",
	},
	{
		id: 16,
		image: "https://images.unsplash.com/photo-1588444650733-d0b9cd59d883?w=400&h=400&fit=crop",
		name: "Aretes Perla Clásica",
		price: 890000,
		category: "Aretes",
		material: "Oro 18k",
		collection: "Clásica",
	},

	// Dijes
	{
		id: 17,
		image: "https://images.unsplash.com/photo-1576022162028-22f12f9ed217?w=400&h=400&fit=crop",
		name: "Dije Corazón Esmeralda",
		price: 1250000,
		category: "Dijes",
		material: "Oro 18k",
		collection: "Elegante",
		isBestSeller: true,
	},
	{
		id: 18,
		image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=400&h=400&fit=crop",
		name: "Dije Estrella",
		price: 450000,
		category: "Dijes",
		material: "Plata 925",
		collection: "Moderna",
		isNew: true,
	},
	{
		id: 19,
		image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
		name: "Dije Luna Creciente",
		price: 680000,
		category: "Dijes",
		material: "Oro Rosa",
		collection: "Bohemia",
	},
	{
		id: 20,
		image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
		name: "Dije Inicial Personalizado",
		price: 520000,
		category: "Dijes",
		material: "Plata 925",
		collection: "Moderna",
		isNew: true,
	},
];

// Helper functions
export const getProductsByCategory = (category: JewelryCategory) =>
	demoJewelryProducts.filter((p) => p.category === category);

export const getNewArrivals = () =>
	demoJewelryProducts.filter((p) => p.isNew);

export const getBestSellers = () =>
	demoJewelryProducts.filter((p) => p.isBestSeller);

export const getProductsByCollection = (collection: JewelryCollection) =>
	demoJewelryProducts.filter((p) => p.collection === collection);

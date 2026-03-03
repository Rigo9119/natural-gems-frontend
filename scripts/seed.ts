/**
 * Seed script — populates `emeralds` + `emerald_images` from demo data.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (service role bypasses RLS).
 *
 * Run with:
 *   bun --bun run scripts/seed.ts
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/lib/database.types";

// Load env manually (Bun reads .env.local automatically)
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
	console.error(
		"Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
	);
	process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceRoleKey);

// ─── Demo data (inline to avoid import issues in script context) ──────────────

const singleStones = [
	{
		slug: "esmeralda-muzo-premium",
		name: "Esmeralda Muzo Premium",
		price: 4500,
		carats: 2.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde intenso con tinte azulado",
		dimensions: "9.2 × 7.1 × 4.8 mm",
		certified_by: "GIA",
		description:
			"Magnífica esmeralda de la región de Muzo con el característico verde intenso y profundo que define las gemas de esta mina. Incluye trazas de jadinería natural que certifican su origen colombiano. Sin tratamiento de aceite significativo.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-chivor-brillante",
		name: "Esmeralda Chivor Brillante",
		price: 3200,
		carats: 2.1,
		origin: "Chivor",
		clarity: "AAA",
		cut: "Oval",
		color: "Verde medio con destellos azules",
		dimensions: "8.8 × 6.9 × 4.5 mm",
		certified_by: "Gübelin",
		description:
			"Esmeralda de Chivor con el inconfundible tono verde-azul que distingue las piedras de esta región. Claridad excepcional con inclusiones mínimas visibles solo bajo lupa. Corte oval que maximiza la luminosidad de la gema.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-coscuez-clasica",
		name: "Esmeralda Coscuez Clásica",
		price: 1800,
		carats: 1.2,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Pear",
		color: "Verde vivo con ligero tinte amarillo",
		dimensions: "7.4 × 5.2 × 3.6 mm",
		certified_by: "CDT Bogotá",
		description:
			"Esmeralda de Coscuez con el vibrante color verde intenso típico de esta mina boyacense. Corte pera elegante ideal para colgantes y aretes. Incluye certificado de origen colombiano y jadinería auténtica.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-gachala-selecta",
		name: "Esmeralda Gachalá Selecta",
		price: 5500,
		carats: 3.0,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Round",
		color: "Verde oscuro con saturation excepcional",
		dimensions: "9.8 × 9.8 × 6.1 mm",
		certified_by: "SSEF",
		description:
			"Rarísima esmeralda de Gachalá, región con producción muy limitada. Verde oscuro y saturado que es altamente cotizado en el mercado internacional. Corte redondo perfecto con simetría excelente certificada por SSEF Suiza.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-muzo-natural",
		name: "Esmeralda Muzo Natural",
		price: 2800,
		carats: 1.8,
		origin: "Muzo",
		clarity: "AA",
		cut: "Emerald",
		color: "Verde puro sin tratamiento",
		dimensions: "8.1 × 6.3 × 4.2 mm",
		certified_by: "GIA",
		description:
			"Esmeralda de Muzo con el codiciado color verde puro, sin aceite ni tratamiento significativo. La jadinería interna confirma su origen y autenticidad. Corte esmeralda clásico que resalta la profundidad del color.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-chivor-elegante",
		name: "Esmeralda Chivor Elegante",
		price: 1500,
		carats: 0.9,
		origin: "Chivor",
		clarity: "A",
		cut: "Oval",
		color: "Verde medio brillante",
		dimensions: "6.8 × 5.1 × 3.3 mm",
		certified_by: "CDT Bogotá",
		description:
			"Esmeralda de Chivor de tamaño ideal para joyería fina. Color verde medio con el característico brillo de la región. Corte oval de proporciones perfectas, ideal para anillos o colgantes en oro 18k.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-coscuez-vintage",
		name: "Esmeralda Coscuez Vintage",
		price: 2200,
		carats: 1.5,
		origin: "Coscuez",
		clarity: "AA",
		cut: "Round",
		color: "Verde cálido con tonos dorados",
		dimensions: "7.2 × 7.2 × 4.6 mm",
		certified_by: "Gübelin",
		description:
			"Esmeralda de Coscuez con el singular tono verde cálido que recuerda las gemas de épocas pasadas. Su aspecto vintage la hace perfecta para joyería artesanal de estilo retro o bohemio. Redonda y simétrica con buen fuego interno.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-gachala-especial",
		name: "Esmeralda Gachalá Especial",
		price: 3800,
		carats: 2.3,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Pear",
		color: "Verde intenso con alta luminosidad",
		dimensions: "9.0 × 6.5 × 4.4 mm",
		certified_by: "SSEF",
		description:
			"Esmeralda especial de Gachalá con una claridad sobresaliente que permite ver el color en toda su profundidad. El corte pera accentúa la luminosidad y crea un efecto visual único bajo la luz natural y artificial.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-muzo-exclusiva",
		name: "Esmeralda Muzo Exclusiva",
		price: 6200,
		carats: 3.5,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde real — la más alta expresión del color Muzo",
		dimensions: "10.5 × 8.2 × 5.3 mm",
		certified_by: "GIA",
		description:
			"Una de las esmeraldas más excepcionales de nuestra colección. El verde profundo y vivo de Muzo en su máxima expresión, con una saturación y tono que raramente se encuentran en el mercado. Pieza de colección o inversión segura a largo plazo.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-chivor-delicada",
		name: "Esmeralda Chivor Delicada",
		price: 950,
		carats: 0.6,
		origin: "Chivor",
		clarity: "B",
		cut: "Round",
		color: "Verde suave con destellos plateados",
		dimensions: "5.4 × 5.4 × 3.5 mm",
		certified_by: "CDT Bogotá",
		description:
			"Esmeralda delicada de Chivor, ideal para quien busca su primera pieza colombiana. Pequeña pero auténtica, con el encanto verde suave típico de la región. Perfecta como regalo o para montar en un anillo minimalista.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-coscuez-moderna",
		name: "Esmeralda Coscuez Moderna",
		price: 2600,
		carats: 1.7,
		origin: "Coscuez",
		clarity: "A",
		cut: "Oval",
		color: "Verde brillante con tonos vivos",
		dimensions: "8.4 × 6.2 × 4.0 mm",
		certified_by: "CDT Bogotá",
		description:
			"Esmeralda de Coscuez con un corte oval moderno que refleja la luz de forma uniforme. Color verde vivo y brillante que destaca tanto en joyería clásica como contemporánea. Excelente relación calidad-precio.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "esmeralda-gachala-imperial",
		name: "Esmeralda Gachalá Imperial",
		price: 7500,
		carats: 4.2,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Emerald",
		color: "Verde imperial — color de colección",
		dimensions: "12.1 × 9.4 × 6.2 mm",
		certified_by: "Gübelin",
		description:
			"La joya de nuestra colección. Esta esmeralda imperial de Gachalá es una pieza única con un color verde de una profundidad y saturación que solo se consigue en una de cada mil piedras. Certificada por Gübelin, el laboratorio más prestigioso del mundo para esmeraldas.",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
];

const wholesaleLots = [
	{
		slug: "lote-muzo-premium-aaa",
		name: "Lote Muzo Premium AAA",
		price: 45000,
		carats: 25.0,
		stone_count: 10,
		origin: "Muzo",
		clarity: "AAA",
		cut: "Emerald",
		description:
			"Selección premium de esmeraldas AAA de la mina de Muzo, corte esmeralda uniforme",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-chivor-brillante",
		name: "Lote Chivor Brillante",
		price: 28000,
		carats: 18.5,
		stone_count: 12,
		origin: "Chivor",
		clarity: "AA",
		cut: "Oval",
		description:
			"Conjunto de esmeraldas de Chivor con excelente brillo y corte oval",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-coscuez-clasico",
		name: "Lote Coscuez Clásico",
		price: 15000,
		carats: 12.0,
		stone_count: 8,
		origin: "Coscuez",
		clarity: "A",
		cut: "Pear",
		description:
			"Esmeraldas clásicas de Coscuez, ideales para joyería artesanal",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-gachala-imperial",
		name: "Lote Gachalá Imperial",
		price: 72000,
		carats: 35.0,
		stone_count: 15,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Round",
		description:
			"Piedras excepcionales de Gachalá con la mejor claridad del mercado",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-muzo-natural",
		name: "Lote Muzo Natural",
		price: 32000,
		carats: 20.0,
		stone_count: 14,
		origin: "Muzo",
		clarity: "AA",
		cut: "Emerald",
		description: "Esmeraldas naturales sin tratamiento de la región de Muzo",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-chivor-delicado",
		name: "Lote Chivor Delicado",
		price: 9500,
		carats: 6.0,
		stone_count: 20,
		origin: "Chivor",
		clarity: "A",
		cut: "Round",
		description:
			"Piedras pequeñas de alta calidad, perfectas para diseños delicados",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-coscuez-volumen",
		name: "Lote Coscuez Volumen",
		price: 18000,
		carats: 30.0,
		stone_count: 25,
		origin: "Coscuez",
		clarity: "B",
		cut: "Oval",
		description:
			"Lote grande de esmeraldas de Coscuez para producción en serie",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-gachala-selecta",
		name: "Lote Gachalá Selecta",
		price: 55000,
		carats: 28.0,
		stone_count: 10,
		origin: "Gachala",
		clarity: "AAA",
		cut: "Pear",
		description: "Selección exclusiva de esmeraldas de Gachalá con corte pera",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-muzo-mixto-aa",
		name: "Lote Muzo Mixto AA",
		price: 22000,
		carats: 15.0,
		stone_count: 10,
		origin: "Muzo",
		clarity: "AA",
		cut: "Pear",
		description:
			"Variedad de cortes en esmeraldas AA de Muzo, ideal para colecciones",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
	{
		slug: "lote-chivor-economico",
		name: "Lote Chivor Económico",
		price: 7500,
		carats: 10.0,
		stone_count: 18,
		origin: "Chivor",
		clarity: "B",
		cut: "Emerald",
		description:
			"Lote accesible de esmeraldas de Chivor para mercado mayorista",
		image:
			"https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=800&fit=crop",
	},
];

// ─── Seed ────────────────────────────────────────────────────────────────────

async function seed() {
	console.log("🌱 Seeding emeralds...");

	// Build all emerald rows
	const emeraldRows = [
		...singleStones.map(({ image: _, ...stone }) => ({
			...stone,
			total_grams: Math.round(stone.carats * 0.2 * 1000) / 1000,
			stone_count: 1,
			min_order_quantity: 1,
			status: "available" as const,
		})),
		...wholesaleLots.map(({ image: _, ...lot }) => ({
			...lot,
			total_grams: Math.round(lot.carats * 0.2 * 1000) / 1000,
			min_order_quantity: 1,
			status: "available" as const,
		})),
	];

	const { data: insertedEmeralds, error: emeraldError } = await supabase
		.from("emeralds")
		.insert(emeraldRows)
		.select("id, slug");

	if (emeraldError) {
		console.error("❌ Failed to insert emeralds:", emeraldError.message);
		process.exit(1);
	}

	console.log(`✅ Inserted ${insertedEmeralds.length} emeralds`);

	// Build slug → id map
	const slugToId = Object.fromEntries(
		insertedEmeralds.map((e) => [e.slug, e.id]),
	);

	// Build image rows
	const allProducts = [...singleStones, ...wholesaleLots];
	const imageRows = allProducts
		.filter((p) => slugToId[p.slug])
		.map((p) => ({
			emerald_id: slugToId[p.slug],
			url: p.image,
			position: 0,
		}));

	const { error: imageError } = await supabase
		.from("emerald_images")
		.insert(imageRows);

	if (imageError) {
		console.error("❌ Failed to insert images:", imageError.message);
		process.exit(1);
	}

	console.log(`✅ Inserted ${imageRows.length} images`);
	console.log("🎉 Seed complete");
}

seed();

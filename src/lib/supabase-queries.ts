import { queryOptions } from "@tanstack/react-query"
import type { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"

// ── Types ─────────────────────────────────────────────────────────────────────

export type Emerald = Database["public"]["Tables"]["emeralds"]["Row"]
export type EmeraldImage = Database["public"]["Tables"]["emerald_images"]["Row"]
export type EmeraldWithImage = Emerald & { image_url: string | null }

// ── Filter constants (replaces demo-products.ts + demo-wholesale-lots.ts) ─────

export const origins = ["Muzo", "Chivor", "Coscuez", "Gachala"] as const
export type Origin = (typeof origins)[number]

export const clarities = ["AAA", "AA", "A", "B"] as const
export type Clarity = (typeof clarities)[number]

export const cuts = ["Emerald", "Oval", "Pear", "Round"] as const
export type Cut = (typeof cuts)[number]

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveImageUrl(
	images: { url: string; position: number }[] | null,
): string | null {
	if (!images || images.length === 0) return null
	return [...images].sort((a, b) => a.position - b.position)[0].url
}

type RawRow = Emerald & {
	emerald_images: { url: string; position: number }[] | null
}

function mapRow(row: RawRow): EmeraldWithImage {
	const { emerald_images, ...emerald } = row
	return { ...emerald, image_url: resolveImageUrl(emerald_images) }
}

// ── Query options ─────────────────────────────────────────────────────────────

/** Single retail stones: stone_count = 1 AND status = available */
export function retailEmeraldsQueryOptions() {
	return queryOptions({
		queryKey: ["emeralds", "retail"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.eq("stone_count", 1)
				.eq("status", "available")
			if (error) throw error
			return (data as unknown as RawRow[]).map(mapRow)
		},
	})
}

/** Wholesale lots: stone_count > 1 AND status = available */
export function wholesaleEmeraldsQueryOptions() {
	return queryOptions({
		queryKey: ["emeralds", "wholesale"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.gt("stone_count", 1)
				.eq("status", "available")
			if (error) throw error
			return (data as unknown as RawRow[]).map(mapRow)
		},
	})
}

/** Single emerald by slug (returns null if not found) */
export function emeraldBySlugQueryOptions(slug: string) {
	return queryOptions({
		queryKey: ["emeralds", "slug", slug],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("emeralds")
				.select("*, emerald_images(url, position)")
				.eq("slug", slug)
				.maybeSingle()
			if (error) throw error
			if (!data) return null
			return mapRow(data as unknown as RawRow)
		},
	})
}

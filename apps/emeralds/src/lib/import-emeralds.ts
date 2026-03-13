import * as XLSX from "xlsx"
import { supabase } from "@/lib/supabase"
import { origins, clarities, cuts } from "@/lib/supabase-queries"

// ── Types ─────────────────────────────────────────────────────────────────────

export type RowError = { row: number; field: string; message: string }

export type ValidImportRow = {
	name: string
	slug: string
	carats: number
	clarity: string
	cut: string
	origin: string
	price: number
	currency: string
	stone_count: number
	status: string
	description?: string | null
	dimensions?: string | null
	color?: string | null
	certificate_url?: string | null
	certified_by?: string | null
	min_order_quantity?: number
	total_grams?: number | null
}

export type ErrorRow = {
	rowIndex: number
	data: Record<string, string>
	errors: RowError[]
}

export type ParseResult = {
	validRows: ValidImportRow[]
	errorRows: ErrorRow[]
	totalRows: number
}

export type ImportResult = {
	inserted: number
	errors: { row: number; error: string }[]
}

// ── Column map (bilingual) ────────────────────────────────────────────────────

type DbField = keyof ValidImportRow

const COLUMN_MAP: Record<string, DbField> = {
	nombre: "name",
	name: "name",
	quilates: "carats",
	carats: "carats",
	claridad: "clarity",
	clarity: "clarity",
	corte: "cut",
	cut: "cut",
	origen: "origin",
	origin: "origin",
	precio: "price",
	price: "price",
	moneda: "currency",
	currency: "currency",
	cantidad_piedras: "stone_count",
	stone_count: "stone_count",
	estado: "status",
	status: "status",
	descripcion: "description",
	description: "description",
	dimensiones: "dimensions",
	dimensions: "dimensions",
	color: "color",
	url_certificado: "certificate_url",
	certificate_url: "certificate_url",
	certificado_por: "certified_by",
	certified_by: "certified_by",
	cantidad_minima: "min_order_quantity",
	min_order_quantity: "min_order_quantity",
	gramos_totales: "total_grams",
	total_grams: "total_grams",
}

// ── Slug generation ───────────────────────────────────────────────────────────

export function generateSlug(name: string): string {
	const base = name
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "")
	return `${base}-${Date.now().toString(36)}`
}

// ── Template download ─────────────────────────────────────────────────────────

export function downloadTemplate(): void {
	const headers = [
		"nombre",
		"quilates",
		"claridad",
		"corte",
		"origen",
		"precio",
		"moneda",
		"cantidad_piedras",
		"estado",
		"descripcion",
		"dimensiones",
		"color",
		"url_certificado",
		"certificado_por",
		"cantidad_minima",
		"gramos_totales",
	]

	const examples = [
		[
			"Esmeralda Muzo Premium",
			"2.5",
			"AAA",
			"Emerald",
			"Muzo",
			"4500",
			"USD",
			"1",
			"available",
			"Esmeralda de alta claridad con inclusiones mínimas",
			"10x8x5mm",
			"Verde intenso",
			"",
			"",
			"",
			"",
		],
		[
			"Lote Esmeraldas Chivor",
			"18.0",
			"AA",
			"Oval",
			"Chivor",
			"12000",
			"USD",
			"10",
			"available",
			"Lote mayorista de esmeraldas ovales",
			"",
			"Verde medio",
			"",
			"",
			"5",
			"3.6",
		],
		[
			"Esmeralda Certificada Coscuez",
			"1.8",
			"AAA",
			"Pear",
			"Coscuez",
			"3200",
			"USD",
			"1",
			"available",
			"Esmeralda pera con certificado GIA",
			"9x6x4mm",
			"Verde vívido",
			"https://example.com/cert/12345",
			"GIA",
			"",
			"",
		],
	]

	const ws = XLSX.utils.aoa_to_sheet([headers, ...examples])
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Esmeraldas")
	XLSX.writeFile(wb, "plantilla_esmeraldas.xlsx")
}

// ── Parse spreadsheet ─────────────────────────────────────────────────────────

function mapRow(
	raw: Record<string, string>,
): Record<DbField, string> {
	const mapped: Partial<Record<DbField, string>> = {}
	for (const [key, value] of Object.entries(raw)) {
		const dbField = COLUMN_MAP[key.toLowerCase().trim()]
		if (dbField) {
			mapped[dbField] = value ?? ""
		}
	}
	return mapped as Record<DbField, string>
}

function capitalize(str: string): string {
	if (!str) return str
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function validateRow(
	mapped: Record<DbField, string>,
	rowIndex: number,
): { errors: RowError[]; row: ValidImportRow | null } {
	const errors: RowError[] = []

	// name
	const name = (mapped.name ?? "").trim()
	if (!name) {
		errors.push({ row: rowIndex, field: "nombre", message: "El nombre es requerido" })
	}

	// carats
	const caratsRaw = (mapped.carats ?? "").replace(",", ".")
	const carats = Number.parseFloat(caratsRaw)
	if (!caratsRaw || Number.isNaN(carats) || carats <= 0) {
		errors.push({ row: rowIndex, field: "quilates", message: "Los quilates deben ser un número positivo" })
	}

	// clarity
	const clarityRaw = (mapped.clarity ?? "").trim().toUpperCase()
	const clarityValid = (clarities as readonly string[]).includes(clarityRaw)
	if (!clarityRaw || !clarityValid) {
		errors.push({ row: rowIndex, field: "claridad", message: `Claridad inválida. Valores válidos: ${clarities.join(", ")}` })
	}

	// cut
	const cutRaw = (mapped.cut ?? "").trim()
	const cutNorm = capitalize(cutRaw)
	const cutValid = (cuts as readonly string[]).includes(cutNorm)
	if (!cutRaw || !cutValid) {
		errors.push({ row: rowIndex, field: "corte", message: `Corte inválido. Valores válidos: ${cuts.join(", ")}` })
	}

	// origin
	const originRaw = (mapped.origin ?? "").trim()
	const originNorm = capitalize(originRaw)
	const originValid = (origins as readonly string[]).includes(originNorm)
	if (!originRaw || !originValid) {
		errors.push({ row: rowIndex, field: "origen", message: `Origen inválido. Valores válidos: ${origins.join(", ")}` })
	}

	// price
	const priceRaw = (mapped.price ?? "").replace(",", ".")
	const price = Number.parseFloat(priceRaw)
	if (!priceRaw || Number.isNaN(price) || price <= 0) {
		errors.push({ row: rowIndex, field: "precio", message: "El precio debe ser un número positivo" })
	}

	if (errors.length > 0) {
		return { errors, row: null }
	}

	// optional fields
	const currency = (mapped.currency ?? "").trim() || "USD"
	const stoneCountRaw = (mapped.stone_count ?? "").trim()
	const stoneCount = stoneCountRaw ? Number.parseInt(stoneCountRaw, 10) : 1
	const status = (mapped.status ?? "").trim().toLowerCase() || "available"
	const validStatuses = ["available", "reserved", "sold"]
	const finalStatus = validStatuses.includes(status) ? status : "available"

	const minOrderRaw = (mapped.min_order_quantity ?? "").trim()
	const minOrder = minOrderRaw ? Number.parseInt(minOrderRaw, 10) : undefined

	const totalGramsRaw = (mapped.total_grams ?? "").replace(",", ".").trim()
	const totalGrams = totalGramsRaw ? Number.parseFloat(totalGramsRaw) : null

	const row: ValidImportRow = {
		name,
		slug: generateSlug(name),
		carats,
		clarity: clarityRaw,
		cut: cutNorm,
		origin: originNorm,
		price,
		currency,
		stone_count: Number.isNaN(stoneCount) || stoneCount < 1 ? 1 : stoneCount,
		status: finalStatus,
		description: (mapped.description ?? "").trim() || null,
		dimensions: (mapped.dimensions ?? "").trim() || null,
		color: (mapped.color ?? "").trim() || null,
		certificate_url: (mapped.certificate_url ?? "").trim() || null,
		certified_by: (mapped.certified_by ?? "").trim() || null,
		min_order_quantity: minOrder && !Number.isNaN(minOrder) ? minOrder : undefined,
		total_grams: totalGrams && !Number.isNaN(totalGrams) ? totalGrams : null,
	}

	return { errors: [], row }
}

export async function parseSpreadsheetFile(file: File): Promise<ParseResult> {
	const buffer = await file.arrayBuffer()
	const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" })
	const sheetName = workbook.SheetNames[0]
	const sheet = workbook.Sheets[sheetName]
	const rawRows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, {
		raw: false,
		defval: "",
	})

	const validRows: ValidImportRow[] = []
	const errorRows: ErrorRow[] = []

	for (let i = 0; i < rawRows.length; i++) {
		const raw = rawRows[i]
		const mapped = mapRow(raw)
		const { errors, row } = validateRow(mapped, i + 2) // row 1 is header
		if (row) {
			validRows.push(row)
		} else {
			errorRows.push({ rowIndex: i + 2, data: raw, errors })
		}
	}

	return { validRows, errorRows, totalRows: rawRows.length }
}

// ── Batch insert ──────────────────────────────────────────────────────────────

const BATCH_SIZE = 25

export async function batchInsertEmeralds(
	validRows: ValidImportRow[],
	onProgress: (inserted: number, total: number) => void,
): Promise<ImportResult> {
	let inserted = 0
	const errors: { row: number; error: string }[] = []
	const total = validRows.length

	for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
		const chunk = validRows.slice(i, i + BATCH_SIZE)
		const { error } = await supabase.from("emeralds").insert(chunk as any)
		if (error) {
			for (let j = 0; j < chunk.length; j++) {
				errors.push({ row: i + j + 2, error: error.message })
			}
		} else {
			inserted += chunk.length
		}
		onProgress(inserted, total)
	}

	return { inserted, errors }
}

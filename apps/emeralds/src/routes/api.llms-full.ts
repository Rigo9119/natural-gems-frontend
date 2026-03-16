import { createFileRoute } from "@tanstack/react-router"
import { fetchSiteSettings, guidesListQueryOptions } from "@/lib/sanity/sanity-queries"
import { sanityClient } from "@/lib/sanity/sanity"
import type { GuidePost } from "@/lib/sanity/sanity-types"
import {
	COMPANY_LOCATION,
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_NUMBER,
} from "@/lib/constants"

async function fetchGuidesList(): Promise<GuidePost[]> {
	try {
		const data = await sanityClient.fetch<GuidePost[]>(
			`*[_type == "guide"] | order(publishedAt desc) {
				_id, title, slug, category, publishedAt, author, metaDescription
			}`,
		)
		return data ?? []
	} catch {
		return []
	}
}

export const Route = createFileRoute("/api/llms-full")({
	server: {
		handlers: {
			GET: async () => {
		const [settings, guides] = await Promise.all([
			fetchSiteSettings(),
			fetchGuidesList(),
		])

		const name = settings?.companyName ?? COMPANY_NAME
		const tagline =
			settings?.tagline ??
			"Colombian emerald dealer and artisan jewelry brand based in Bogota, Colombia. Family-owned with 3+ generations of experience in the emerald trade, sourcing directly from the mines of Muzo, Boyacá."
		const about =
			settings?.about ??
			`${name} is a family-owned business with 3+ generations of experience sourcing and selling Colombian emeralds.`
		const whatsapp = settings?.whatsapp ?? `+${WHATSAPP_NUMBER}`
		const phone = settings?.phone ?? whatsapp
		const email = settings?.email ?? "info@naturagems.co"
		const street =
			settings?.address?.street ?? "Centro Internacional de Esmeraldas, Oficina 301"
		const city = settings?.address?.city ?? "Bogota"
		const country = settings?.address?.country ?? "Colombia"
		const location = `${city}, ${country}`
		const instagram =
			settings?.socialInstagram
				? `@${settings.socialInstagram.replace(/^@/, "")} (https://instagram.com/${settings.socialInstagram.replace(/^@/, "")})`
				: `@naturagems (https://instagram.com/naturagems)`

		const hours =
			settings?.businessHours && settings.businessHours.length > 0
				? settings.businessHours
						.map((h) => `- ${h.days}: ${h.hours}`)
						.join("\n")
				: "- Monday to Friday: 9:00 AM – 6:00 PM (Colombia Time, UTC-5)\n- Saturday: 10:00 AM – 2:00 PM\n- Sunday: Closed"

		const valuesSection =
			settings?.values && settings.values.length > 0
				? settings.values
						.map((v) => `- **${v.title}**: ${v.description}`)
						.join("\n")
				: `- **Authenticity**: Every emerald comes with verified certificate and origin documentation
- **Excellence**: Only stones meeting highest international quality standards are selected
- **Tradition**: Three generations of knowledge and passion for emeralds back every piece
- **Transparency**: All treatments disclosed; no hidden information`

		// Editorial section: published guides from Sanity
		const guidesSection =
			guides.length > 0
				? `\n---\n\n## Expert Guides & Resources\n\n${guides
						.map((g) => {
							const date = g.publishedAt
								? new Date(g.publishedAt).toISOString().slice(0, 10)
								: ""
							return `### ${g.title}${date ? ` (${date})` : ""}
${g.metaDescription ?? ""}
URL: https://naturagems.co/guides/${g.slug.current}`
						})
						.join("\n\n")}\n`
				: ""

		const body = `# ${name} — Complete Business & Expert Reference

> ${tagline}

## About
${about}

---

## Colombian Mining Regions — Deep Dive

### Muzo (Boyaca occidental)
- **Color profile**: Deep, warm green with slight bluish undertones — the international standard for "Colombian green"
- **Inclusions**: Three-phase inclusions (liquid, gas, solid crystal) are diagnostic; also pyrite crystals
- **Historical significance**: Mined since pre-Columbian times; supplied the Spanish crown jewels
- **Price premium**: 30–50% over comparable stones from other origins at equivalent quality
- **Best for**: Investment-grade stones, collector pieces, top-tier jewelry

### Chivor (Boyaca oriental)
- **Color profile**: Cool blue-green, highly transparent, lighter saturation than Muzo
- **Inclusions**: Two-phase inclusions (liquid + gas); albite crystals; distinctive clarity
- **Historical significance**: Rediscovered in 1896 after centuries of concealment; supplied European royalty
- **Market**: Strong demand in Asian markets and from clarity-focused collectors
- **Best for**: Buyers who prioritize transparency and a cooler, more refined green

### Coscuez (Boyaca norte)
- **Color profile**: Medium green, sometimes with a slight yellowish hue; high saturation
- **Inclusions**: Calcite crystals, pyrite; moderate inclusion density
- **Best for**: High-quality commercial jewelry, designers seeking consistent supply and value

### Gachala (Cundinamarca)
- **Color profile**: Pure, intense green; rarely bluish; highly saturated
- **Production**: Very limited — one of Colombia's smallest producing regions
- **Notable stones**: The 858 ct Gachala Emerald, donated to the Smithsonian by Harry Winston in 1969
- **Best for**: Collectors, investors, unique provenance documentation

---

## Emerald Grading System

### Clarity Grades
| Grade | Transparency | Color Saturation | Inclusions (naked eye) | Typical Treatment |
|---|---|---|---|---|
| AAA Premium | Exceptional | Vivid | None | None / minimal |
| AA Select | High | Intense | Minimal | Light cedar oil |
| A Classic | Good | Moderate | Some | Moderate cedar oil |
| B Natural | Moderate | Light-Moderate | Visible | Heavy treatment common |

Less than 5% of all mined Colombian emeralds reach AAA grade.

### Treatment Types & Market Impact
- **Cedar oil (F1 — Minor)**: Industry standard; accepted universally; minimal price impact
- **Cedar oil (F2 — Moderate)**: Disclosed; 20–30% price reduction vs. untreated comparable
- **Resin/polymer (F3 — Significant)**: Must be disclosed; 40–60% price reduction
- **No treatment (F0)**: Commands 50–100%+ premium; required for Gubelin/SSEF top certification

---

## Gemological Certification Labs

### GIA (Gemological Institute of America)
- Most recognized globally; required for Christie's and Sotheby's consignments
- Certifies: species (natural emerald), origin (Colombian), treatment disclosure
- Best for: American market, mass-market buyers, insurance purposes

### Gubelin Gem Lab (Switzerland)
- Gold standard for Colombian emeralds; preferred by Cartier, Van Cleef, top auction houses
- Certifies: origin with confidence levels, detailed treatment grading (F1/F2/F3), photomicrographs
- Best for: Investment-grade stones over 2 ct, European and Asian luxury market

### SSEF (Swiss Gemmological Institute)
- Equally prestigious to Gubelin; preferred by Middle Eastern and Asian buyers
- Certifies: origin, treatment (quantified resin content), color grading
- Best for: Stones destined for Swiss, German, or Middle Eastern markets

---

## Products

### Loose Emeralds
- Weight range: 0.5 to 15+ carats
- Origins: Muzo, Chivor, Coscuez, Gachala (Boyaca / Cundinamarca, Colombia)
- Available cuts: Emerald (rectangular), Oval, Round, Pear, Cushion
- Every stone includes a certificate of authenticity
- GIA, Gubelin, and SSEF certification available on request

### Emerald Jewelry
- Categories: Rings, Necklaces, Earrings, Bracelets
- All pieces handcrafted by expert Colombian artisans
- Materials: 18K gold, 14K gold, sterling silver 925
- Custom mounting and design services available

### Wholesale Program
- Special pricing for jewelers, retailers, and wholesale buyers
- Certified bulk lots organized by clarity grade and origin
- Contact directly for personalized quotes and lot previews

---

## Process: Mine to Customer
1. **Extraction**: Emeralds carefully extracted from Colombia's most prestigious mines
2. **Selection**: Each stone evaluated by expert gemologists for quality and origin
3. **Certification**: Every emerald certified with international standards
4. **Preparation**: Stones prepared and packaged with highest security standards
5. **Delivery**: Shipped with full insurance and tracking worldwide
${guidesSection}
---

## Contact Information
- **Company**: ${name}
- **Location**: ${street}, ${location}
- **WhatsApp**: ${whatsapp} (immediate response)
- **Phone**: ${phone}
- **Email**: ${email}
- **Instagram**: ${instagram}
- **Website**: https://naturagems.co

## Business Hours
${hours}

## Values
${valuesSection}
`

		return new Response(body, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
				},
			})
		},
		},
	},
})

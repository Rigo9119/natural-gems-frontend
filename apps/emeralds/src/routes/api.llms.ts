import { createFileRoute } from "@tanstack/react-router"
import { fetchSiteSettings } from "@/lib/sanity/sanity-queries"
import {
	COMPANY_LOCATION,
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_NUMBER,
} from "@/lib/constants"

export const Route = createFileRoute("/api/llms")({
	server: {
		handlers: {
			GET: async () => {
		const settings = await fetchSiteSettings()

		const name = settings?.companyName ?? COMPANY_NAME
		const tagline =
			settings?.tagline ??
			"Colombian emerald dealer and artisan jewelry brand based in Bogotá, Colombia."
		const about =
			settings?.about ??
			`${name} is a family-owned business with 3+ generations of experience sourcing and selling Colombian emeralds. We operate directly from the emerald mines of Muzo, Chivor, and Coscuez in Boyacá, Colombia — the world's most prestigious emerald-producing region.`
		const whatsapp = settings?.whatsapp ?? `+${WHATSAPP_NUMBER}`
		const phone = settings?.phone ?? whatsapp
		const email = settings?.email ?? "info@naturagems.co"
		const location = settings?.address?.city
			? `${settings.address.city}, ${settings.address.country ?? "Colombia"}`
			: COMPANY_LOCATION
		const instagram =
			settings?.socialInstagram
				? `@${settings.socialInstagram.replace(/^@/, "")}`
				: `@naturagems`

		const hours =
			settings?.businessHours && settings.businessHours.length > 0
				? settings.businessHours
						.map((h) => `- ${h.days}: ${h.hours}`)
						.join("\n")
				: "- Monday to Friday: 9:00 AM - 6:00 PM (COT)\n- Saturday: 10:00 AM - 2:00 PM (COT)\n- Sunday: Closed"

		const body = `# ${name}

> ${tagline}

## About
${about}

## Products

### Loose Emeralds
- Clarity grades: AAA (Premium), AA (Select), A (Classic), B (Natural)
- Weight range: 0.5 to 15+ carats
- Origins: Muzo, Chivor, Coscuez (Boyacá, Colombia)
- Cuts: Emerald, Oval, Round, Pear, Cushion
- All stones include certificate of authenticity

### Emerald Jewelry
- Rings, necklaces, earrings, bracelets
- Handcrafted by expert Colombian artisans
- Set in gold and silver
- Custom mounting services available

### Wholesale
- Special pricing for jewelers and wholesale buyers
- Bulk lots available by clarity grade
- Custom selection and sourcing

## Certifications & Guarantees
- GIA (Gemological Institute of America) certification available
- Full origin traceability from mine to customer
- 30-day satisfaction guarantee with full refund
- Insured worldwide shipping

## Contact
- Location: ${location}
- WhatsApp: ${whatsapp}
- Phone: ${phone}
- Email: ${email}
- Instagram: ${instagram}
- Website: https://naturagems.co

## Business Hours
${hours}
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

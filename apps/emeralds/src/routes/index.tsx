import { createFileRoute, Link } from "@tanstack/react-router"
import { Globe } from "lucide-react"
import { getLocale, locales, setLocale } from "@/paraglide/runtime"
import { buildMeta } from "@/lib/seo"

const jewelryUrl =
	import.meta.env.VITE_JEWELRY_URL ?? "https://joyeria.naturagems.com"

export const Route = createFileRoute("/")({
	head: () =>
		buildMeta({
			title: "Natura Gems",
			description:
				"Esmeraldas colombianas certificadas y joyería artesanal de la más alta calidad. Selecciona tu destino.",
			path: "/",
			noIndex: true,
		}),
	component: PortalPage,
})

function LocaleSwitcher() {
	const currentLocale = getLocale()
	return (
		<div
			className="flex items-center gap-1.5"
			role="group"
			aria-label="Selector de idioma"
		>
			<Globe className="h-4 w-4 text-white/60" aria-hidden="true" />
			<div className="flex">
				{locales.map((locale, index) => (
					<span key={locale} className="flex items-center">
						{index > 0 && (
							<span className="mx-1 text-white/30" aria-hidden="true">
								/
							</span>
						)}
						<button
							type="button"
							onClick={() => setLocale(locale)}
							aria-pressed={locale === currentLocale}
							aria-label={locale === "es" ? "Español" : "English"}
							className={`text-sm font-medium uppercase transition-colors ${
								locale === currentLocale
									? "text-brand-secondary-golden"
									: "text-white/60 hover:text-white"
							}`}
						>
							{locale}
						</button>
					</span>
				))}
			</div>
		</div>
	)
}

function PortalPage() {
	return (
		<div className="relative flex h-screen w-full flex-col overflow-hidden md:flex-row">
			{/* Top bar */}
			<div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
				<span className="font-heading text-xl tracking-wide text-white">
					Natura Gems
				</span>
				<LocaleSwitcher />
			</div>

			{/* Esmeraldas panel */}
			<Link
				to="/home"
				className="group relative flex flex-1 flex-col items-center justify-center bg-brand-primary-dark px-6 pt-24 pb-12 transition-all duration-500 md:flex-[1] md:px-8 md:py-0 md:hover:flex-[1.15]"
				aria-label="Ir a Esmeraldas"
			>
				<div className="flex flex-col items-center text-center">
					<p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-brand-primary-lighter/60">
						Gemas certificadas
					</p>
					<h2 className="font-heading text-5xl font-light text-brand-primary-lighter md:text-7xl lg:text-8xl">
						Esmeraldas
					</h2>
					<p className="mt-4 max-w-xs font-body text-sm text-brand-primary-lighter/60 md:text-base">
						Directamente desde las minas de Muzo, Chivor y Coscuez
					</p>
					<span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-primary-lighter/30 px-6 py-2.5 font-body text-sm text-brand-primary-lighter transition-all duration-300 group-hover:border-brand-primary-lighter group-hover:bg-brand-primary-lighter/10">
						Explorar →
					</span>
				</div>
			</Link>

			{/* Mobile divider */}
			<div className="h-px w-full bg-transparent md:hidden" aria-hidden="true" />

			{/* Joyería panel */}
			<a
				href={jewelryUrl}
				className="group relative flex flex-1 flex-col items-center justify-center bg-brand-secondary-terra px-6 pb-24 pt-12 transition-all duration-500 md:flex-[1] md:px-8 md:py-0 md:hover:flex-[1.15]"
				aria-label="Ir a Joyería"
			>
				<div className="flex flex-col items-center text-center">
					<p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
						Artesanía colombiana
					</p>
					<h2 className="font-heading text-5xl font-light text-white md:text-7xl lg:text-8xl">
						Joyería
					</h2>
					<p className="mt-4 max-w-xs font-body text-sm text-white/60 md:text-base">
						Piezas únicas elaboradas a mano con gemas de origen colombiano
					</p>
					<span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 font-body text-sm text-white transition-all duration-300 group-hover:border-white group-hover:bg-white/10">
						Explorar →
					</span>
				</div>
			</a>
		</div>
	)
}

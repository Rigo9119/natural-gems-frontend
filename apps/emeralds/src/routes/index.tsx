import { createFileRoute } from "@tanstack/react-router";
import { Globe, ArrowRight } from "lucide-react";
import { getLocale, locales, setLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Natura Gems — Esmeraldas & Joyería Colombiana" },
			{
				name: "description",
				content:
					"Descubre nuestra colección de esmeraldas colombianas certificadas y joyería artesanal exclusiva, directamente desde las minas de Muzo.",
			},
		],
	}),
	component: LandingPage,
});

const jewelryUrl = import.meta.env.VITE_JEWELRY_URL ?? "https://joyeria.naturagems.com";

function LandingPage() {
	const currentLocale = getLocale();

	return (
		<div className="relative flex flex-col md:flex-row min-h-screen">

			{/* ── Top bar: wordmark + locale switcher ── */}
			<div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 pointer-events-none md:px-8">
				<span className="font-heading text-xl tracking-widest text-white/90 drop-shadow-lg select-none md:text-2xl">
					Natura Gems
				</span>

				<div
					className="pointer-events-auto flex items-center gap-1.5"
					role="group"
					aria-label="Selector de idioma"
				>
					<Globe className="h-4 w-4 text-white/60" aria-hidden="true" />
					<div className="flex">
						{locales.map((locale, index) => (
							<span key={locale} className="flex items-center">
								{index > 0 && (
									<span className="mx-1 text-white/30" aria-hidden="true">/</span>
								)}
								<button
									type="button"
									onClick={() => setLocale(locale)}
									aria-pressed={locale === currentLocale}
									aria-label={locale === "es" ? "Español" : "English"}
									className={`text-sm font-medium uppercase transition-colors ${
										locale === currentLocale
											? "text-white"
											: "text-white/50 hover:text-white/80"
									}`}
								>
									{locale}
								</button>
							</span>
						))}
					</div>
				</div>
			</div>

			{/* ── Panel: Esmeraldas ── */}
			<a
				href="/emeralds"
				className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-brand-primary-dark px-6 pt-24 pb-12 transition-all duration-500 md:min-h-screen md:px-8 md:py-0 md:hover:flex-[1.15]"
				aria-label="Ir a Esmeraldas"
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-left,rgba(247,209,126,0.08)_0%,transparent_60%)]" />
				<div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand-primary-light/10 transition-transform duration-700 group-hover:scale-110 md:-bottom-32 md:-left-32 md:h-96 md:w-96" />

				<div className="relative text-center">
					<span className="mb-4 inline-block rounded-full border border-brand-secondary-golden/40 bg-brand-secondary-golden/10 px-4 py-1 text-xs font-medium tracking-widest text-brand-secondary-golden uppercase md:mb-6">
						Gemas Certificadas
					</span>

					<h1 className="mb-4 font-heading text-5xl leading-none text-brand-primary-lighter sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
						Esmeraldas
					</h1>

					<p className="mx-auto mb-8 max-w-xs font-body text-sm leading-relaxed text-brand-primary-lighter/60 sm:text-base md:mb-10 md:text-lg">
						Esmeraldas colombianas de las minas de Muzo, con certificación internacional y envío asegurado a todo el mundo.
					</p>

					<span className="inline-flex items-center gap-2 rounded-full bg-brand-secondary-golden px-6 py-3.5 font-body text-sm font-medium tracking-wide text-brand-primary-dark transition-all duration-300 group-hover:gap-4 group-hover:bg-brand-secondary-golden/90 md:gap-3 md:px-8 md:py-4">
						Explorar colección
						<ArrowRight className="h-4 w-4" aria-hidden="true" />
					</span>
				</div>
			</a>

			{/* ── Panel: Joyería ── */}
			<a
				href={jewelryUrl}
				className="group relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-brand-secondary-terra px-6 pt-12 pb-24 transition-all duration-500 md:min-h-screen md:px-8 md:py-0 md:hover:flex-[1.15]"
				aria-label="Ir a Joyería"
			>
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
				<div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 transition-transform duration-700 group-hover:scale-110 md:-right-32 md:-top-32 md:h-96 md:w-96" />

				<div className="relative text-center">
					<span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium tracking-widest text-white/80 uppercase md:mb-6">
						Próximamente
					</span>

					<h2 className="mb-4 font-heading text-5xl leading-none text-white sm:text-6xl md:mb-6 md:text-7xl lg:text-8xl">
						Joyería
					</h2>

					<p className="mx-auto mb-8 max-w-xs font-body text-sm leading-relaxed text-white/60 sm:text-base md:mb-10 md:text-lg">
						Anillos, collares y aretes elaborados a mano con esmeraldas colombianas certificadas. Diseños exclusivos para cada ocasión.
					</p>

					<span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 font-body text-sm font-medium tracking-wide text-white transition-all duration-300 group-hover:gap-4 group-hover:bg-white/20 md:gap-3 md:px-8 md:py-4">
						Ver colección
						<ArrowRight className="h-4 w-4" aria-hidden="true" />
					</span>
				</div>
			</a>

		</div>
	);
}

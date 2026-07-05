import { createFileRoute } from "@tanstack/react-router";
import { Globe } from "lucide-react";
import Panel from "@/components/Panel";
import { buildMeta } from "@/lib/seo";
import { getLocale, locales, setLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
	head: () =>
		buildMeta({
			title: "Esmeraldas & Joyería Colombiana",
			description:
				"Descubre nuestra colección de esmeraldas colombianas certificadas y joyería artesanal exclusiva, directamente desde las minas de Muzo.",
			path: "/",
		}),
	component: LandingPage,
});

const jewelryUrl =
	import.meta.env.VITE_JEWELRY_URL ?? "https://joyeria.naturagems.com";

function LandingPage() {
	const currentLocale = getLocale();

	return (
		<div className="relative flex flex-col md:flex-row min-h-screen">
			{/* ── Top bar: wordmark + locale switcher ── */}
			<div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 pointer-events-none md:px-8">
				<span className="font-heading text-xl tracking-widest text-white/90 drop-shadow-lg select-none md:text-2xl">
					Natura Gems
				</span>

				{/* biome-ignore lint/a11y/useSemanticElements: no semantic HTML equivalent for a non-form group */}
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

			<Panel
				chipText="Gemas Certificadas"
				title="Esmeraldas"
				description="Esmeraldas colombianas de las minas de Muzo, con certificación internacional y envío asegurado a todo el mundo."
				href="/emeralds"
				linkText="Explorar colección"
			/>

			<Panel
				secondary
				chipText="Próximamente"
				title="Joyería"
				description="Anillos, collares y aretes elaborados a mano con esmeraldas
        colombianas certificadas. Diseños exclusivos para cada ocasión."
				href={jewelryUrl}
				linkText="Ver colección"
				disabled
				headingLevel="h2"
			/>
		</div>
	);
}

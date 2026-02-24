import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
	Award,
	Check,
	ChevronRight,
	Gem,
	MapPin,
	MessageCircle,
	ShieldCheck,
	ShoppingCart,
	Sparkles,
	Truck,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { demoProducts, getProductBySlug } from "@/data/demo-products";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";
import { useCartStore } from "@/store/cartStore";

export const Route = createFileRoute("/emeralds/tienda/$slug")({
	head: ({ loaderData }) => {
		const p = loaderData as
			| { name?: string; description?: string; slug?: string }
			| undefined;
		return buildMeta({
			title: p?.name,
			description: p?.description,
			path: `/emeralds/tienda/${p?.slug ?? ""}`,
			ogType: "website",
			jsonLd: p?.name
				? [
						breadcrumbJsonLd([
							{ name: "Inicio", path: "/" },
							{ name: "Esmeraldas", path: "/emeralds" },
							{ name: "Tienda", path: "/emeralds/tienda" },
							{ name: p.name, path: `/emeralds/tienda/${p.slug}` },
						]),
					]
				: [],
		});
	},
	loader: ({ params }) => {
		const product = getProductBySlug(params.slug);
		if (!product) throw notFound();
		return {
			name: product.name,
			description: product.description,
			slug: product.slug,
		};
	},
	component: EmeraldDetailPage,
});

// ── Clarity descriptions ──────────────────────────────────────────────────────

const clarityMeaning: Record<string, string> = {
	AAA: "Gema de colección — la más alta claridad posible",
	AA: "Claridad excepcional — inclusiones mínimas bajo lupa",
	A: "Claridad muy buena — inclusiones leves no visibles a simple vista",
	B: "Claridad estándar — inclusiones características del origen",
};

const cutMeaning: Record<string, string> = {
	Emerald: "Corte esmeralda — rectángulo escalonado, resalta el color profundo",
	Oval: "Corte oval — equilibrio entre brillo y tamaño aparente",
	Pear: "Corte pera — elegante, ideal para colgantes y aretes",
	Round: "Corte redondo — máxima simetría y luminosidad",
};

const originDetail: Record<string, { region: string; characteristic: string }> =
	{
		Muzo: {
			region: "Boyacá, Colombia",
			characteristic: "Verde intenso y profundo con jadinería característica",
		},
		Chivor: {
			region: "Boyacá, Colombia",
			characteristic: "Verde-azul inconfundible, alta transparencia",
		},
		Coscuez: {
			region: "Boyacá, Colombia",
			characteristic: "Verde vivo con matices cálidos, alta saturación",
		},
		Gachala: {
			region: "Cundinamarca, Colombia",
			characteristic: "Verde oscuro excepcional, producción muy limitada",
		},
	};

// ── Component ─────────────────────────────────────────────────────────────────

function EmeraldDetailPage() {
	const { slug } = Route.useParams();
	const product = getProductBySlug(slug);
	const { addToCart, removeFromCart, isInCart } = useCartStore();

	// notFound() in loader already handles missing slugs, but TS needs the guard
	if (!product) return null;

	const inCart = isInCart(product.id);

	const origin = originDetail[product.origin];
	const related = demoProducts
		.filter((p) => p.id !== product.id && p.origin === product.origin)
		.slice(0, 4);

	const waMessage = encodeURIComponent(
		`Hola, me interesa la ${product.name} (${product.carat} ct, ${product.clarity}) que vi en su tienda. ¿Podría darme más información?`,
	);
	const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

	return (
		<div className="min-h-screen bg-brand-surface">
			{/* ── Breadcrumb ── */}
			<nav
				aria-label="Breadcrumb"
				className="border-b border-brand-primary-dark/10 bg-white"
			>
				<ol className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 py-3 text-xs text-brand-primary-dark/60 md:px-6 lg:px-8">
					<li>
						<Link
							to="/"
							className="hover:text-brand-primary-dark transition-colors"
						>
							Inicio
						</Link>
					</li>
					<li aria-hidden="true">
						<ChevronRight className="h-3 w-3" />
					</li>
					<li>
						<Link
							to="/emeralds"
							className="hover:text-brand-primary-dark transition-colors"
						>
							Esmeraldas
						</Link>
					</li>
					<li aria-hidden="true">
						<ChevronRight className="h-3 w-3" />
					</li>
					<li>
						<Link
							to="/emeralds/tienda"
							className="hover:text-brand-primary-dark transition-colors"
						>
							Tienda
						</Link>
					</li>
					<li aria-hidden="true">
						<ChevronRight className="h-3 w-3" />
					</li>
					<li
						className="truncate font-medium text-brand-primary-dark"
						aria-current="page"
					>
						{product.name}
					</li>
				</ol>
			</nav>

			{/* ── Main grid: image + info ── */}
			<section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
					{/* Left — image */}
					<div className="space-y-4">
						<div className="relative overflow-hidden rounded-2xl bg-brand-primary-lighter aspect-square">
							<OptimizedImage
								src={product.image}
								alt={product.name}
								width={800}
								height={800}
								priority
								className="h-full w-full object-cover"
							/>
							{/* Clarity badge */}
							<span className="absolute left-4 top-4 rounded-full bg-brand-primary-dark/80 px-4 py-1.5 text-xs font-semibold text-brand-secondary-golden backdrop-blur-sm">
								{product.clarity} · {product.carat} ct
							</span>
						</div>

						{/* Trust pills */}
						<div className="flex flex-wrap gap-2">
							{[
								{ icon: ShieldCheck, label: "Certificado auténtico" },
								{ icon: Truck, label: "Envío asegurado" },
								{ icon: Award, label: "30 días devolución" },
							].map(({ icon: Icon, label }) => (
								<span
									key={label}
									className="flex items-center gap-1.5 rounded-full border border-brand-primary-dark/20 bg-white px-3 py-1.5 text-xs text-brand-primary-dark/80"
								>
									<Icon className="h-3.5 w-3.5 text-brand-secondary-terra" />
									{label}
								</span>
							))}
						</div>
					</div>

					{/* Right — product info */}
					<div className="flex flex-col">
						{/* Origin tag */}
						<p className="mb-2 text-xs font-medium tracking-widest uppercase text-brand-secondary-terra">
							Esmeralda de {product.origin}
						</p>

						<h1 className="font-heading text-3xl text-brand-primary-dark md:text-4xl">
							{product.name}
						</h1>

						{/* Price */}
						<p className="mt-4 font-heading text-4xl text-brand-primary-dark">
							<span className="text-2xl">$</span>
							{product.price.toLocaleString()}
							<span className="ml-2 text-base font-body font-normal text-brand-primary-dark/50">
								USD
							</span>
						</p>

						<hr className="my-6 border-brand-primary-dark/10" />

						{/* Description */}
						{product.description && (
							<p className="font-body leading-relaxed text-brand-primary-dark/80">
								{product.description}
							</p>
						)}

						{/* Color */}
						{product.color && (
							<div className="mt-4 flex items-start gap-2">
								<Gem className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary-terra" />
								<p className="text-sm text-brand-primary-dark/70">
									<span className="font-medium text-brand-primary-dark">
										Color:{" "}
									</span>
									{product.color}
								</p>
							</div>
						)}

						{/* Origin detail */}
						{origin && (
							<div className="mt-3 flex items-start gap-2">
								<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary-terra" />
								<p className="text-sm text-brand-primary-dark/70">
									<span className="font-medium text-brand-primary-dark">
										Origen:{" "}
									</span>
									{origin.region} — {origin.characteristic}
								</p>
							</div>
						)}

						<hr className="my-6 border-brand-primary-dark/10" />

						{/* Specs table */}
						<dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
							{[
								{ label: "Quilates", value: `${product.carat} ct` },
								{ label: "Corte", value: product.cut },
								{ label: "Claridad", value: product.clarity },
								{ label: "Origen", value: product.origin },
								{
									label: "Dimensiones",
									value: product.dimensions ?? "—",
								},
								{
									label: "Certificado",
									value: product.certifiedBy ?? "—",
								},
							].map(({ label, value }) => (
								<div key={label}>
									<dt className="text-xs uppercase tracking-wider text-brand-primary-dark/50">
										{label}
									</dt>
									<dd className="mt-1 font-medium text-brand-primary-dark">
										{value}
									</dd>
								</div>
							))}
						</dl>

						<hr className="my-6 border-brand-primary-dark/10" />

						{/* CTA buttons */}
						<div className="flex flex-col gap-3 sm:flex-row">
							{/* Add to cart */}
							<button
								type="button"
								onClick={() =>
									inCart ? removeFromCart(product.id) : addToCart(product)
								}
								className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium transition-colors ${
									inCart
										? "bg-emerald-700 text-white hover:bg-emerald-800"
										: "bg-brand-secondary-terra text-white hover:bg-brand-secondary-terra/85"
								}`}
							>
								{inCart ? (
									<>
										<Check className="h-5 w-5" />
										En el carrito
									</>
								) : (
									<>
										<ShoppingCart className="h-5 w-5" />
										Añadir al carrito
									</>
								)}
							</button>

							{/* WhatsApp */}
							<a
								href={waUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3.5 font-medium text-brand-primary-lighter transition-colors hover:bg-brand-primary-dark/85"
							>
								<MessageCircle className="h-5 w-5" />
								Consultar por WhatsApp
							</a>
						</div>

						{/* Clarity & cut explainer */}
						<div className="mt-6 space-y-2 rounded-xl bg-brand-primary-lighter/60 p-4 text-xs text-brand-primary-dark/70">
							<p>
								<span className="font-semibold text-brand-primary-dark">
									{product.clarity}
								</span>{" "}
								— {clarityMeaning[product.clarity]}
							</p>
							<p>
								<span className="font-semibold text-brand-primary-dark">
									{product.cut}
								</span>{" "}
								— {cutMeaning[product.cut]}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── Why buy from us ── */}
			<section className="bg-brand-primary-dark py-16">
				<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
					<h2 className="mb-10 text-center font-heading text-2xl text-brand-primary-lighter md:text-3xl">
						Por qué elegir Natura Gems
					</h2>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: ShieldCheck,
								title: "Autenticidad garantizada",
								body: "Cada esmeralda viene con certificado de laboratorio y trazabilidad desde la mina.",
							},
							{
								icon: Sparkles,
								title: "Selección experta",
								body: "Nuestros gemólogos evalúan cada piedra bajo los estándares internacionales más exigentes.",
							},
							{
								icon: Truck,
								title: "Envío asegurado",
								body: "Enviamos a todo el mundo con seguro completo, empaque seguro y seguimiento en tiempo real.",
							},
							{
								icon: Award,
								title: "30 días de garantía",
								body: "Si no estás satisfecho, devuelves la esmeralda sin preguntas en los primeros 30 días.",
							},
						].map(({ icon: Icon, title, body }) => (
							<div key={title} className="text-center">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-lighter/10">
									<Icon className="h-6 w-6 text-brand-secondary-golden" />
								</div>
								<h3 className="mb-2 font-heading text-base text-brand-primary-lighter">
									{title}
								</h3>
								<p className="text-sm leading-relaxed text-brand-primary-lighter/60">
									{body}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Related products ── */}
			{related.length > 0 && (
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
						<div className="mb-8 flex items-end justify-between">
							<div>
								<p className="mb-1 text-xs uppercase tracking-widest text-brand-secondary-terra">
									Misma región
								</p>
								<h2 className="font-heading text-2xl text-brand-primary-dark md:text-3xl">
									También de {product.origin}
								</h2>
							</div>
							<Link
								to="/emeralds/tienda"
								className="hidden text-sm font-medium text-brand-primary-dark underline-offset-4 hover:underline sm:block"
							>
								Ver todas
							</Link>
						</div>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:gap-6">
							{related.map((p) => (
								<ProductCard key={p.id} product={p} />
							))}
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

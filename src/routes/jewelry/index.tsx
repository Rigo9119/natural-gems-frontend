import { createFileRoute } from "@tanstack/react-router";
import { Gem, MessageCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/jewelry/")({
	head: () =>
		buildMeta({
			title: "Joyería con Esmeraldas — Próximamente",
			description:
				"Nuestra colección de joyería artesanal con esmeraldas colombianas certificadas llega pronto. Anillos, collares, aretes y pulseras elaborados a mano.",
			path: "/jewelry",
			jsonLd: [
				breadcrumbJsonLd([
					{ name: "Inicio", path: "/" },
					{ name: "Joyería", path: "/jewelry" },
				]),
			],
		}),
	component: JewelryTeaserPage,
});

// Category preview data — images only, no links
const categoryPreviews = [
	{
		name: "Anillos",
		image:
			"https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop",
	},
	{
		name: "Collares",
		image:
			"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop",
	},
	{
		name: "Pulseras",
		image:
			"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop",
	},
	{
		name: "Aretes",
		image:
			"https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&h=600&fit=crop",
	},
	{
		name: "Dijes",
		image:
			"https://images.unsplash.com/photo-1576022162028-22f12f9ed217?w=600&h=600&fit=crop",
	},
];

function JewelryTeaserPage() {
	const [email, setEmail] = useState("");

	const waConsultUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
		"Hola, me interesa la colección de joyería con esmeraldas colombianas. ¿Cuándo estará disponible?",
	)}`;

	function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!email.trim()) return;
		const msg = encodeURIComponent(
			`Hola, quiero recibir novedades sobre la colección de joyería cuando esté disponible. Mi correo es: ${email.trim()}`,
		);
		window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
		setEmail("");
	}

	return (
		<div className="min-h-screen">
			{/* ── Hero ── */}
			<section className="relative bg-brand-secondary-terra overflow-hidden">
				{/* Background image pair */}
				<div className="absolute inset-0 grid grid-cols-2 opacity-20 pointer-events-none">
					<OptimizedImage
						src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=900&fit=crop"
						alt=""
						width={800}
						height={900}
						priority
						className="h-full w-full object-cover"
					/>
					<OptimizedImage
						src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=900&fit=crop"
						alt=""
						width={800}
						height={900}
						priority
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32 lg:py-40">
					{/* Badge */}
					<span className="inline-flex items-center gap-2 rounded-full border border-brand-secondary-golden/40 bg-brand-secondary-golden/10 px-4 py-1.5 text-xs font-medium tracking-widest text-brand-secondary-golden uppercase mb-6">
						<Sparkles className="h-3.5 w-3.5" />
						Próximamente
					</span>

					<h1 className="font-heading text-5xl text-white sm:text-6xl md:text-7xl leading-tight">
						Joyería con
						<br />
						Esmeraldas
					</h1>

					<p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
						Piezas únicas elaboradas a mano con esmeraldas colombianas
						certificadas. Nuestra tienda de joyería llega pronto.
					</p>

					{/* Feature pills */}
					<div className="mt-8 flex flex-wrap justify-center gap-3">
						{[
							"Oro 18k & Plata 925",
							"Esmeraldas certificadas",
							"Envío asegurado mundial",
						].map((f) => (
							<span
								key={f}
								className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80"
							>
								<Gem className="h-3 w-3 text-brand-secondary-golden" />
								{f}
							</span>
						))}
					</div>

					{/* CTA row */}
					<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
						<a
							href={waConsultUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-brand-secondary-terra transition-colors hover:bg-white/90"
						>
							<MessageCircle className="h-5 w-5" />
							Consultar disponibilidad
						</a>
					</div>
				</div>
			</section>

			{/* ── Category preview ── */}
			<section className="bg-brand-primary-lighter py-16 sm:py-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8">
					<div className="mb-10 text-center">
						<p className="mb-3 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-terra">
							Lo que viene
						</p>
						<h2 className="font-heading text-3xl text-brand-secondary-terra sm:text-4xl">
							Nuestras Categorías
						</h2>
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-5 sm:gap-6">
						{categoryPreviews.map((cat) => (
							<div
								key={cat.name}
								className="group relative aspect-square overflow-hidden rounded-2xl"
							>
								<OptimizedImage
									src={cat.image}
									alt={cat.name}
									width={600}
									height={600}
									className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								{/* Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
								{/* "Próximamente" pill */}
								<span className="absolute right-2 top-2 rounded-full bg-brand-secondary-golden/90 px-2 py-0.5 text-[10px] font-medium text-brand-secondary-terra">
									Próximamente
								</span>
								<div className="absolute bottom-0 left-0 right-0 p-4 text-center">
									<h3 className="font-heading text-lg text-white sm:text-xl">
										{cat.name}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Email + WhatsApp CTA ── */}
			<section className="bg-brand-secondary-terra py-16 sm:py-24">
				<div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
					<Sparkles className="mx-auto mb-4 h-8 w-8 text-brand-secondary-golden" />
					<h2 className="font-heading text-3xl text-white sm:text-4xl">
						Sé el primero en enterarte
					</h2>
					<p className="mt-3 text-white/70">
						Déjanos tu correo y te avisamos el día que abramos la tienda de
						joyería.
					</p>

					{/* Email form → WhatsApp */}
					<form
						onSubmit={handleEmailSubmit}
						className="mt-8 flex flex-col gap-3 sm:flex-row sm:max-w-md sm:mx-auto"
					>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Tu correo electrónico"
							className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 focus:border-brand-secondary-golden focus:outline-none"
						/>
						<button
							type="submit"
							className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary-golden px-6 py-3 font-medium text-brand-secondary-terra transition-colors hover:bg-brand-secondary-golden/90 shrink-0"
						>
							<MessageCircle className="h-4 w-4" />
							Avisar por WhatsApp
						</button>
					</form>

					<p className="mt-4 text-xs text-white/40">
						Al enviar, se abrirá WhatsApp con tu correo incluido en el mensaje.
					</p>

					{/* Direct WhatsApp fallback */}
					<a
						href={waConsultUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-block text-sm text-white/60 underline underline-offset-4 hover:text-white transition-colors"
					>
						O escríbenos directamente por WhatsApp
					</a>
				</div>
			</section>
		</div>
	);
}

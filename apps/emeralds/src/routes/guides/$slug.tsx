import type { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { prefetchGuideBySlug, useGuideBySlug } from "@/data/page-data";
import { urlFor } from "@/lib/sanity/sanity";
import { articleJsonLd, breadcrumbJsonLd, buildMeta } from "@/lib/seo";

export const Route = createFileRoute("/guides/$slug")({
	head: ({ loaderData }) => {
		const guide = loaderData as
			| {
					title?: string;
					metaDescription?: string;
					publishedAt?: string;
					author?: string;
					coverImageUrl?: string;
			  }
			| undefined;
		return buildMeta({
			title: guide?.title,
			description: guide?.metaDescription,
			path: `/guides/${guide?.title ?? ""}`,
			ogType: "article",
			ogImage: guide?.coverImageUrl,
			jsonLd: guide?.title
				? [
						articleJsonLd({
							title: guide.title,
							description: guide.metaDescription,
							publishedAt: guide.publishedAt ?? new Date().toISOString(),
							author: guide.author,
							coverImageUrl: guide.coverImageUrl,
							path: `/guides/${guide.title}`,
						}),
						breadcrumbJsonLd([
							{ name: "Inicio", path: "/" },
							{ name: "Guias", path: "/guides" },
							{ name: guide.title, path: `/guides/${guide.title}` },
						]),
					]
				: [],
		});
	},
	loader: async ({ context, params }) => {
		await prefetchGuideBySlug(context.queryClient, params.slug);
		const guide = context.queryClient.getQueryData<{
			title?: string;
			metaDescription?: string;
			publishedAt?: string;
			author?: string;
			coverImage?: { asset?: { url?: string } };
		} | null>(["sanity", "guide", params.slug]);
		if (!guide) throw notFound();
		const coverImageUrl = guide.coverImage?.asset?.url ?? undefined;
		return {
			title: guide.title,
			metaDescription: guide.metaDescription,
			publishedAt: guide.publishedAt,
			author: guide.author,
			coverImageUrl,
		};
	},
	component: GuideDetailPage,
});

// ── Portable Text components ──────────────────────────────────────────────────

const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="mb-4 font-body text-base leading-relaxed text-brand-primary-dark/80">
				{children}
			</p>
		),
		h2: ({ children }) => (
			<h2 className="mb-4 mt-10 font-heading text-2xl text-brand-primary-dark md:text-3xl">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="mb-3 mt-8 font-heading text-xl text-brand-primary-dark md:text-2xl">
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className="mb-2 mt-6 font-heading text-lg text-brand-primary-dark md:text-xl">
				{children}
			</h4>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-6 border-l-4 border-brand-secondary-golden pl-5 font-body text-base italic text-brand-primary-dark/70">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="mb-4 list-disc space-y-2 pl-6 font-body text-base text-brand-primary-dark/80">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="mb-4 list-decimal space-y-2 pl-6 font-body text-base text-brand-primary-dark/80">
				{children}
			</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
		number: ({ children }) => <li className="leading-relaxed">{children}</li>,
	},
	marks: {
		strong: ({ children }) => (
			<strong className="font-semibold text-brand-primary-dark">
				{children}
			</strong>
		),
		em: ({ children }) => <em className="italic">{children}</em>,
		underline: ({ children }) => <span className="underline">{children}</span>,
		code: ({ children }) => (
			<code className="rounded bg-brand-primary-lighter px-1.5 py-0.5 font-mono text-sm text-brand-primary-dark">
				{children}
			</code>
		),
		link: ({ value, children }) => {
			const href = value?.href ?? "#";
			const isExternal = href.startsWith("http");
			return (
				<a
					href={href}
					target={isExternal ? "_blank" : undefined}
					rel={isExternal ? "noopener noreferrer" : undefined}
					className="text-brand-secondary-golden underline underline-offset-2 hover:text-brand-primary-dark"
				>
					{children}
				</a>
			);
		},
	},
	types: {
		image: ({ value }) => {
			const src = value?.asset?.url
				? value.asset.url
				: value?.asset
					? urlFor(value.asset).width(800).url()
					: null;

			if (!src) return null;

			return (
				<figure className="my-8">
					<OptimizedImage
						src={src}
						alt={value?.alt ?? ""}
						width={800}
						height={500}
						className="w-full rounded-2xl object-cover"
					/>
					{value?.caption && (
						<figcaption className="mt-2 text-center text-xs text-brand-primary-dark/50">
							{value.caption}
						</figcaption>
					)}
				</figure>
			);
		},
	},
};

// ── Page component ────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("es-CO", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function GuideDetailPage() {
	const { slug } = Route.useParams();
	const guide = useGuideBySlug(slug);

	if (!guide) return null;

	const coverUrl = guide.coverImage?.asset?.url
		? guide.coverImage.asset.url
		: guide.coverImage
			? urlFor(guide.coverImage).width(1200).height(630).url()
			: null;

	return (
		<div className="min-h-screen bg-white">
			{/* Cover image hero */}
			{coverUrl && (
				<div className="relative h-64 w-full overflow-hidden bg-brand-primary-lighter sm:h-96 lg:h-[28rem]">
					<OptimizedImage
						src={coverUrl}
						alt={guide.title}
						width={1200}
						height={630}
						className="h-full w-full object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/60 to-transparent" />
				</div>
			)}

			{/* Article header */}
			<div className="mx-auto max-w-3xl px-4 py-10 md:px-6 lg:px-8">
				{/* Back link */}
				<Link
					to="/guides"
					className="mb-6 inline-flex items-center gap-2 text-sm text-brand-primary-dark/50 transition-colors hover:text-brand-primary-dark"
				>
					<ArrowLeft className="h-4 w-4" />
					Todas las guias
				</Link>

				{/* Meta row */}
				<div className="mb-4 flex flex-wrap items-center gap-3">
					{guide.category && (
						<span className="flex items-center gap-1 rounded-full bg-brand-secondary-golden/20 px-3 py-1 text-xs font-medium text-brand-primary-dark">
							<Tag className="h-3 w-3" />
							{guide.category}
						</span>
					)}
					{guide.publishedAt && (
						<span className="flex items-center gap-1 text-xs text-brand-primary-dark/40">
							<Calendar className="h-3 w-3" />
							{formatDate(guide.publishedAt)}
						</span>
					)}
					{guide.author && (
						<span className="flex items-center gap-1 text-xs text-brand-primary-dark/40">
							<User className="h-3 w-3" />
							{guide.author}
						</span>
					)}
				</div>

				<h1 className="mb-6 font-heading text-3xl text-brand-primary-dark md:text-4xl lg:text-5xl">
					{guide.title}
				</h1>

				{guide.metaDescription && (
					<p className="mb-10 border-b border-brand-primary-dark/10 pb-10 font-body text-lg leading-relaxed text-brand-primary-dark/60">
						{guide.metaDescription}
					</p>
				)}

				{/* Portable Text body */}
				{guide.body && guide.body.length > 0 ? (
					<div className="prose-custom">
						<PortableText
							value={guide.body}
							components={portableTextComponents}
						/>
					</div>
				) : (
					<p className="text-center text-brand-primary-dark/40 py-16">
						Contenido proximamente.
					</p>
				)}
			</div>

			{/* Footer CTA */}
			<div className="border-t border-brand-primary-dark/10 bg-brand-surface py-12">
				<div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
					<p className="mb-2 font-body text-sm text-brand-primary-dark/50">
						Siguiente paso
					</p>
					<h2 className="mb-4 font-heading text-2xl text-brand-primary-dark">
						Explora nuestras esmeraldas
					</h2>
					<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
						<Link
							to="/emeralds/tienda"
							className="inline-flex items-center gap-2 rounded-full bg-brand-primary-dark px-6 py-3 font-body font-medium text-brand-primary-lighter transition-all hover:scale-105"
						>
							Ver Tienda
							<ArrowLeft className="h-4 w-4 rotate-180" />
						</Link>
						<Link
							to="/guides"
							className="inline-flex items-center gap-2 rounded-full border border-brand-primary-dark/20 px-6 py-3 font-body text-brand-primary-dark transition-all hover:border-brand-primary-dark"
						>
							Mas Guias
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

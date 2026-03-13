export interface FooterLink {
	label: string;
	href: string;
}

export interface FooterSocialLink {
	icon: React.ReactNode;
	label: string;
	href: string;
}

export interface FooterProps {
	companyName: string;
	tagline: string;
	location: string;
	exploreLinks: FooterLink[];
	socialLinks: FooterSocialLink[];
}

export function Footer({
	companyName,
	tagline,
	location,
	exploreLinks,
	socialLinks,
}: FooterProps) {
	return (
		<footer className="bg-brand-primary-dark text-brand-primary-lighter">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
					{/* Brand */}
					<div>
						<p className="font-heading text-3xl mb-4">{companyName}</p>
						<p className="text-brand-primary-lighter/70 text-sm leading-relaxed max-w-xs">
							{tagline}
						</p>
					</div>

					{/* Explore links */}
					<nav aria-label="Enlaces del pie de página">
						<p className="font-body text-sm tracking-[0.2em] uppercase text-brand-secondary-golden mb-6">
							Explorar
						</p>
						<ul className="space-y-3">
							{exploreLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Social / contact links */}
					<div>
						<p className="font-body text-sm tracking-[0.2em] uppercase text-brand-secondary-golden mb-6">
							Contacto
						</p>
						<ul className="space-y-3">
							{socialLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
									>
										{link.icon}
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-brand-primary-lighter/20 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left sm:gap-4">
					<p className="text-brand-primary-lighter/50 text-sm">
						© {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
					</p>
					<p className="text-brand-primary-lighter/50 text-sm">
						Hecho por{" "}
						<a
							href="https://blyts.co"
							target="_blank"
							rel="noopener noreferrer"
							className="text-brand-secondary-golden hover:text-brand-primary-lighter transition-colors"
						>
							Blyts SAS
						</a>
					</p>
					<p className="text-brand-primary-lighter/50 text-sm">{location}</p>
				</div>
			</div>
		</footer>
	);
}

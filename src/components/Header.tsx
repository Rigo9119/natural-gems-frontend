import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { COMPANY_NAME, WHATSAPP_URL } from "@/lib/constants";

export interface NavItem {
	label: string;
	href: string;
}

export interface HeaderProps {
	navItems: NavItem[];
	subNavItems?: NavItem[];
	variant?: "transparent" | "solid";
}

export default function Header({
	navItems,
	subNavItems,
	variant = "transparent",
}: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const routerState = useRouterState();
	const currentPath =
		routerState.location.pathname + routerState.location.searchStr;

	const isSolid = variant === "solid";

	useEffect(() => {
		if (isSolid) return;

		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isSolid]);

	const showSolidBg = isSolid || isScrolled || isMobileMenuOpen;

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				showSolidBg
					? "bg-brand-primary-dark/95 backdrop-blur-md shadow-lg"
					: "bg-transparent"
			}`}
		>
			{/* Skip to content link for accessibility */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-secondary-golden focus:text-brand-primary-dark focus:rounded"
			>
				Saltar al contenido
			</a>
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link
						to="/"
						className="font-heading text-2xl text-brand-primary-lighter hover:text-brand-secondary-golden transition-colors"
						aria-label={`${COMPANY_NAME} - Ir al inicio`}
					>
						{COMPANY_NAME}
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8">
						{navItems?.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-sm tracking-wide transition-colors"
							>
								{item.label}
							</a>
						))}
						<LocaleSwitcher />
						<a
							href={WHATSAPP_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 bg-brand-secondary-golden text-brand-primary-dark px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-primary-lighter hover:scale-105"
						>
							<SiWhatsapp className="w-4 h-4" aria-hidden="true" />
							<span className="sr-only">Contactar por </span>WhatsApp
						</a>
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 text-brand-primary-lighter"
						aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
						aria-expanded={isMobileMenuOpen}
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" aria-hidden="true" />
						) : (
							<Menu className="w-6 h-6" aria-hidden="true" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				<nav
					className={`md:hidden overflow-hidden transition-all duration-300 ${
						isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
					}`}
				>
					<div className="flex flex-col gap-4 pt-4 border-t border-brand-primary-lighter/20">
						{navItems?.map((item, index) => (
							<a
								key={index}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-lg transition-colors"
							>
								{item.label}
							</a>
						))}
						<div className="py-2">
							<LocaleSwitcher />
						</div>
						<a
							href={WHATSAPP_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center gap-2 bg-brand-secondary-golden text-brand-primary-dark px-5 py-3 rounded-full font-medium transition-all duration-300 hover:bg-brand-primary-lighter mt-2"
						>
							<SiWhatsapp className="w-4 h-4" aria-hidden="true" />
							<span className="sr-only">Contactar por </span>WhatsApp
						</a>
					</div>
				</nav>
			</div>
			{subNavItems && subNavItems.length > 0 && (
				<div className="border-t border-brand-primary-lighter/10">
					<div className="max-w-7xl mx-auto px-6 md:px-8">
						<ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
							{subNavItems.map((item) => {
								const isActive =
									currentPath === item.href ||
									currentPath.startsWith(`${item.href}?`) ||
									currentPath.startsWith(`${item.href}/`);

								return (
									<li key={item.href}>
										<Link
											to={item.href}
											className={`inline-flex items-center min-h-[44px] px-4 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
												isActive
													? "text-brand-secondary-golden font-medium"
													: "text-brand-secondary-golden/50 hover:text-brand-secondary-golden hover:bg-brand-secondary-golden/10"
											}`}
										>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			)}
		</header>
	);
}

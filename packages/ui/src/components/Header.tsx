import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export interface NavItem {
	label: string;
	href: string;
}

export interface HeaderProps {
	navItems: NavItem[];
	subNavItems?: NavItem[];
	companyName: string;
	/** Renders the locale switcher — pass <LocaleSwitcher /> from the app */
	localeSwitcherSlot?: React.ReactNode;
	/** Number of items in the cart. If undefined, cart button is hidden. */
	cartCount?: number;
	/** Called when the cart button is clicked. If undefined, cart button is hidden. */
	onCartOpen?: () => void;
}

export function Header({
	navItems,
	subNavItems,
	companyName,
	localeSwitcherSlot,
	cartCount,
	onCartOpen,
}: HeaderProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const routerState = useRouterState();
	const currentPath =
		routerState.location.pathname + routerState.location.searchStr;

	const showCart = onCartOpen !== undefined;
	const cartLabel = `Carrito de compras${cartCount && cartCount > 0 ? ` (${cartCount} ${cartCount === 1 ? "ítem" : "ítems"})` : ""}`;

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-brand-primary-dark shadow-lg">
			{/* Skip to content */}
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
						aria-label={`${companyName} - Ir al inicio`}
					>
						{companyName}
					</Link>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-8">
						{navItems?.map((item, index) =>
							item.href.startsWith("http") ? (
								<a
									key={index}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-sm tracking-wide transition-colors"
								>
									{item.label}
								</a>
							) : (
								<Link
									key={index}
									to={item.href}
									className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-sm tracking-wide transition-colors"
								>
									{item.label}
								</Link>
							),
						)}

						{localeSwitcherSlot}

						{showCart && (
							<button
								type="button"
								onClick={onCartOpen}
								aria-label={cartLabel}
								className="relative p-2 text-brand-primary-lighter/80 hover:text-brand-primary-lighter transition-colors"
							>
								<ShoppingCart className="w-5 h-5" aria-hidden="true" />
								{cartCount != null && cartCount > 0 && (
									<span
										aria-hidden="true"
										className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary-golden text-brand-primary-dark text-[10px] font-bold leading-none"
									>
										{cartCount > 9 ? "9+" : cartCount}
									</span>
								)}
							</button>
						)}
					</nav>

					{/* Mobile right side */}
					<div className="flex md:hidden items-center gap-1">
						{showCart && (
							<button
								type="button"
								onClick={onCartOpen}
								aria-label={`Carrito${cartCount && cartCount > 0 ? ` (${cartCount})` : ""}`}
								className="relative p-2 text-brand-primary-lighter"
							>
								<ShoppingCart className="w-5 h-5" aria-hidden="true" />
								{cartCount != null && cartCount > 0 && (
									<span
										aria-hidden="true"
										className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary-golden text-brand-primary-dark text-[10px] font-bold leading-none"
									>
										{cartCount > 9 ? "9+" : cartCount}
									</span>
								)}
							</button>
						)}

						<button
							type="button"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 text-brand-primary-lighter"
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
				</div>

				{/* Mobile nav */}
				<nav
					className={`md:hidden overflow-hidden transition-all duration-300 ${
						isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
					}`}
				>
					<div className="flex flex-col gap-4 pt-4 border-t border-brand-primary-lighter/20">
						{navItems?.map((item, index) =>
							item.href.startsWith("http") ? (
								<a
									key={index}
									href={item.href}
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => setIsMobileMenuOpen(false)}
									className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-lg transition-colors"
								>
									{item.label}
								</a>
							) : (
								<Link
									key={index}
									to={item.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className="text-brand-primary-lighter/80 hover:text-brand-primary-lighter text-lg transition-colors"
								>
									{item.label}
								</Link>
							),
						)}
						{localeSwitcherSlot && (
							<div className="py-2">{localeSwitcherSlot}</div>
						)}
					</div>
				</nav>
			</div>

			{/* SubNav */}
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

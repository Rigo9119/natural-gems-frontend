import { Link, useRouterState } from "@tanstack/react-router";

export interface SubNavItem {
	label: string;
	href: string;
}

interface SubNavProps {
	items: SubNavItem[];
}

export default function SubNav({ items }: SubNavProps) {
	const routerState = useRouterState();
	const currentPath =
		routerState.location.pathname + routerState.location.searchStr;

	return (
		<nav className="relative bg-brand-primary-light border-b border-brand-primary-dark/5">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<ul className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide -mb-px">
					{items.map((item) => {
						const isActive =
							currentPath === item.href ||
							currentPath.startsWith(`${item.href}?`) ||
							currentPath.startsWith(`${item.href}/`);

						return (
							<li key={item.href}>
								<Link
									to={item.href}
									className={`relative inline-flex items-center px-5 py-3 text-sm tracking-wide whitespace-nowrap transition-all duration-200 ${
										isActive
											? "text-brand-primary-lighter font-medium"
											: "text-brand-primary-lighter/50 hover:text-brand-primary-lighter/80"
									}`}
								>
									{item.label}
									{isActive && (
										<span className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-secondary-terra rounded-full" />
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

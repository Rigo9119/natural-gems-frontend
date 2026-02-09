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
		<nav className="bg-brand-primary-dark/80 backdrop-blur-sm border-t border-brand-primary-lighter/10">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
					{items.map((item) => {
						const isActive =
							currentPath === item.href ||
							currentPath.startsWith(`${item.href}?`) ||
							currentPath.startsWith(`${item.href}/`);

						return (
							<li key={item.href}>
								<Link
									to={item.href}
									className={`inline-block px-4 py-1.5 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
										isActive
											? "bg-brand-secondary-golden text-brand-primary-dark font-medium"
											: "text-brand-primary-lighter/70 hover:text-brand-primary-lighter hover:bg-brand-primary-lighter/10"
									}`}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

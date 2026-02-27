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
		<nav className="sticky top-20 z-40 bg-brand-primary-dark border-b border-brand-primary-lighter/10">
			<div className="max-w-7xl mx-auto px-6 md:px-8">
				<ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide -mb-px">
					{items.map((item) => {
						const isActive =
							currentPath === item.href ||
							currentPath.startsWith(`${item.href}?`) ||
							currentPath.startsWith(`${item.href}/`);

						return (
							<li key={item.href}>
								<Link
									to={item.href}
									className={`relative inline-flex items-center px-6 py-4 text-sm font-medium tracking-widest uppercase whitespace-nowrap transition-all duration-200 ${
										isActive
											? "text-brand-primary-lighter"
											: "text-brand-primary-lighter/40 hover:text-brand-primary-lighter/70"
									}`}
								>
									{item.label}
									<span
										className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${
											isActive
												? "bg-brand-secondary-terra opacity-100"
												: "bg-transparent opacity-0"
										}`}
									/>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

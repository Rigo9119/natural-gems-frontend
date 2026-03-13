import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbEntry {
	label: string;
	/** Omit for the current (last) page */
	href?: string;
}

interface AppBreadcrumbProps {
	items: BreadcrumbEntry[];
}

export function AppBreadcrumb({ items }: AppBreadcrumbProps) {
	return (
		<div className="border-b border-brand-primary-dark/10 bg-white">
			<div className="mx-auto max-w-7xl px-4 py-3 md:px-6 lg:px-8">
				<Breadcrumb>
					<BreadcrumbList className="text-xs text-brand-primary-dark/60 sm:gap-2">
						{items.map((item, index) => {
							const isLast = index === items.length - 1;
							return (
								<Fragment key={item.label}>
									<BreadcrumbItem>
										{isLast || !item.href ? (
											<BreadcrumbPage className="font-medium text-brand-primary-dark">
												{item.label}
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink
												asChild
												className="text-brand-primary-dark/60 hover:text-brand-primary-dark"
											>
												<Link to={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</div>
	);
}

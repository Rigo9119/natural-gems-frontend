import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/jewelry")({
	component: RouteComponent,
});

function RouteComponent() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;

	// Main index page has the hero, so it needs transparent header and no top padding
	const isHeroPage = pathname === "/jewelry" || pathname === "/jewelry/";
	const headerVariant = isHeroPage ? "transparent" : "solid";

	return (
		<>
			<Header
				variant={headerVariant}
				navItems={[
					{ label: "Anillos", href: "/jewelry/tienda?category=Anillos" },
					{ label: "Collares", href: "/jewelry/tienda?category=Collares" },
					{ label: "Pulseras", href: "/jewelry/tienda?category=Pulseras" },
					{ label: "Aretes", href: "/jewelry/tienda?category=Aretes" },
					{ label: "Dijes", href: "/jewelry/tienda?category=Dijes" },
				]}
			/>
			<main id="main-content" className={`flex-1 ${isHeroPage ? "" : "pt-20"}`}>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

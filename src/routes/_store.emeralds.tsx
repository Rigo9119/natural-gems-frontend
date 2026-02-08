import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CompareProvider } from "@/context/CompareContext";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/emeralds")({
  component: RouteComponent,
});

function RouteComponent() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  // Main index page has the hero, so it needs transparent header and no top padding
  const isHeroPage = pathname === "/emeralds" || pathname === "/emeralds/";
  const headerVariant = isHeroPage ? "transparent" : "solid";

  return (
    <CompareProvider>
      <Header
        variant={headerVariant}
        navItems={[
          { label: "Tienda", href: "/emeralds/tienda" },
          { label: "Mayoristas", href: "/emeralds/mayoristas" },
          { label: "Colección", href: "#collections" },
          { label: "Nosotros", href: "#who-we-are" },
          { label: "Contacto", href: "#contact" },
        ]}
      />
      <main id="main-content" className={`flex-1 ${isHeroPage ? "" : "pt-20"}`}>
        <Outlet />
      </main>
      <Footer />
    </CompareProvider>
  );
}

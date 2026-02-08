import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_store")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header
        navItems={[
          { label: "Tienda", href: "/emeralds/tienda" },
          { label: "Mayoristas", href: "/emeralds/mayoristas" },
          { label: "Colección", href: "#collections" },
          { label: "Nosotros", href: "#who-we-are" },
          { label: "Contacto", href: "#contact" },
        ]}
      />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

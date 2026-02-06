import Footer from "@/components/footer";
import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_store")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header navItems={["index-1", "index-2", "index-3", "index-4"]} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

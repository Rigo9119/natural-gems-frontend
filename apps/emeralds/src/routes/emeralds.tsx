import { createFileRoute, Outlet } from "@tanstack/react-router";
import SubNav from "@/components/SubNav";

export const Route = createFileRoute("/emeralds")({
  component: EmeraldsLayout,
});

const emeraldsSubNav = [
  { label: "Tienda", href: "/emeralds/tienda" },
  { label: "Mayoristas", href: "/emeralds/mayoristas" },
  { label: "Colección", href: "/emeralds/collection" },
];

function EmeraldsLayout() {
  return (
    <>
      <SubNav items={emeraldsSubNav} />
      <Outlet />
    </>
  );
}

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/jewelry")({
	component: JewelryLayout,
});

function JewelryLayout() {
	return <Outlet />;
}

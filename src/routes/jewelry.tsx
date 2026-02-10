import { createFileRoute, Outlet } from "@tanstack/react-router";
import SubNav from "@/components/SubNav";

export const Route = createFileRoute("/jewelry")({
	component: JewelryLayout,
});

const jewelrySubNav = [
	{ label: "Anillos", href: "/jewelry?category=Anillos" },
	{ label: "Collares", href: "/jewelry?category=Collares" },
	{ label: "Pulseras", href: "/jewelry?category=Pulseras" },
	{ label: "Aretes", href: "/jewelry?category=Aretes" },
	{ label: "Dijes", href: "/jewelry?category=Dijes" },
];

function JewelryLayout() {
	return (
		<>
			<SubNav items={jewelrySubNav} />
			<Outlet />
		</>
	);
}

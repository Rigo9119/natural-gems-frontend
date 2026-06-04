import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useRouter,
	useRouterState,
} from "@tanstack/react-router";
import {
	ArrowLeft,
	Gem,
	LayoutDashboard,
	LogOut,
	Package,
	ShoppingBag,
	Tag,
	Upload,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ location }) => {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
		const role = session.user.app_metadata?.role;
		if (role !== "admin") {
			await supabase.auth.signOut();
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},
	component: AdminLayout,
});

const navItems = [
	{ label: "Dashboard", href: "/", icon: LayoutDashboard, exact: true },
	{ label: "Órdenes", href: "/orders", icon: ShoppingBag },
	{ label: "Esmeraldas", href: "/emeralds", icon: Gem },
	{ label: "Lotes Mayoristas", href: "/wholesale", icon: Package },
	{ label: "Promociones", href: "/promotions", icon: Tag },
	{ label: "Importar", href: "/import", icon: Upload },
];

const storeUrl = import.meta.env.VITE_STORE_URL ?? "https://naturagems.com";

function AdminLayout() {
	const routerState = useRouterState();
	const router = useRouter();
	const pathname = routerState.location.pathname;

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.navigate({ to: "/login" });
	};

	return (
		<div className="flex min-h-screen bg-[#F4F6F8]">
			<aside className="flex w-64 shrink-0 flex-col bg-brand-primary-dark">
				<div className="flex h-16 items-center gap-3 px-6">
					<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-secondary-golden/20">
						<Gem className="h-4 w-4 text-brand-secondary-golden" />
					</span>
					<div className="leading-tight">
						<p className="font-heading text-base text-brand-primary-lighter">
							Natura Gems
						</p>
						<p className="font-body text-[10px] tracking-widest uppercase text-brand-primary-lighter/40">
							Admin
						</p>
					</div>
				</div>

				<Separator className="bg-brand-primary-lighter/10" />

				<nav className="flex-1 px-3 py-4">
					<ul className="space-y-1">
						{navItems.map((item) => {
							const isActive = item.exact
								? pathname === "/" || pathname === ""
								: pathname.startsWith(item.href);
							const Icon = item.icon;
							return (
								<li key={item.href}>
									<Link
										to={item.href as "/"}
										className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
											isActive
												? "bg-brand-primary-lighter/10 text-brand-primary-lighter"
												: "text-brand-primary-lighter/50 hover:bg-brand-primary-lighter/5 hover:text-brand-primary-lighter/80"
										}`}
									>
										<Icon
											className={`h-4 w-4 shrink-0 ${isActive ? "text-brand-secondary-golden" : ""}`}
										/>
										{item.label}
										{isActive && (
											<span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-secondary-golden" />
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<Separator className="bg-brand-primary-lighter/10" />

				<div className="space-y-1 p-3">
					<a
						href={storeUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-brand-primary-lighter/40 transition-all hover:bg-brand-primary-lighter/5 hover:text-brand-primary-lighter/70"
					>
						<ArrowLeft className="h-4 w-4" />
						Ir a la tienda
					</a>
					<button
						type="button"
						onClick={handleSignOut}
						className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-brand-primary-lighter/40 transition-all hover:bg-brand-primary-lighter/5 hover:text-red-400"
					>
						<LogOut className="h-4 w-4" />
						Cerrar sesión
					</button>
				</div>
			</aside>

			<div className="flex flex-1 flex-col overflow-hidden">
				<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
					<h1 className="font-heading text-xl text-brand-primary-dark">
						{navItems.find((i) =>
							i.exact
								? pathname === "/" || pathname === ""
								: pathname.startsWith(i.href),
						)?.label ?? "Admin"}
					</h1>
					<div className="flex items-center gap-2">
						<span className="rounded-full bg-brand-primary-dark/5 px-3 py-1 font-body text-xs text-brand-primary-dark/60">
							natura-gems
						</span>
					</div>
				</header>

				<main className="flex-1 overflow-y-auto p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

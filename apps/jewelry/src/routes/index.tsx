import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-brand-primary-lighter">
			<div className="text-center space-y-4 p-8">
				<h1 className="font-heading text-5xl text-brand-primary-dark">
					Natura Gems Joyería
				</h1>
				<p className="font-body text-brand-primary-dark/70 text-lg">
					Próximamente — colecciones de joyería fina con esmeraldas colombianas.
				</p>
			</div>
		</main>
	);
}

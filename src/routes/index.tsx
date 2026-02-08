import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row w-full">
      <Link
        to={"/emeralds"}
        className="flex flex-1 items-center justify-center w-full md:w-1/2 md:h-screen bg-brand-primary-dark transition-all duration-500 ease-in-out hover:flex-3"
      >
        <h2 className="text-brand-primary-lighter font-heading text-6xl md:text-8xl">
          Esmeraldas
        </h2>
      </Link>
      <Link
        to={"/jewelry"}
        className="flex flex-1 items-center justify-center w-full md:w-1/2 md:h-screen bg-brand-secondary-terra transition-all duration-500 ease-in-out hover:flex-3"
      >
        <h2 className="text-brand-primary-lighter font-heading text-6xl md:text-8xl">
          Joyería
        </h2>
      </Link>
    </main>
  );
}

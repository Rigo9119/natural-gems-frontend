import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/emeralds/tienda")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Tienda</h1>
    </div>
  );
}

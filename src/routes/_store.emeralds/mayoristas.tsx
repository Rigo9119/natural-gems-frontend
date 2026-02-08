import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/emeralds/mayoristas")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Mayoristas</h1>
    </div>
  );
}

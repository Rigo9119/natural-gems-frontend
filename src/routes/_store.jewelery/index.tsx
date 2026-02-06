import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_store/jewelery/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>joyeria</div>;
}

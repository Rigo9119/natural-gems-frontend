import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/emeralds")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/emeralds" || location.pathname === "/emeralds/") {
      throw redirect({ to: "/emeralds/shop", replace: true });
    }
  },
  component: EmeraldsLayout,
});

function EmeraldsLayout() {
  return <Outlet />;
}

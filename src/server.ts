import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

// Paraglide handles locale detection and AsyncLocalStorage context.
// TanStack Router handles URL delocalization itself via rewrite.input/output,
// so we pass the original `req` — not the middleware-delocalized `request` —
// to avoid TanStack Router issuing self-referential 307 redirects on /en/* routes.
export default {
	fetch(req: Request): Promise<Response> {
		return paraglideMiddleware(req, () => handler.fetch(req));
	},
};

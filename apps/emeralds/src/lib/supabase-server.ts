import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Server-only admin client — bypasses Row Level Security.
// NEVER import this file from client components or routes.
// Only use in API routes (src/routes/api.*.ts) and server functions.
export const supabaseAdmin = createClient<Database>(
	// biome-ignore lint/style/noNonNullAssertion: server env vars must be set
	process.env.VITE_SUPABASE_URL!,
	// biome-ignore lint/style/noNonNullAssertion: server env vars must be set
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	},
);

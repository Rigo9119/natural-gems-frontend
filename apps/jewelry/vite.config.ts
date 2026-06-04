import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "url";

import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";

const config = defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [
		devtools(),
		paraglideVitePlugin({
			project: "../../project.inlang",
			outdir: "./src/paraglide",
			strategy: ["url"],
		}),
		netlify(),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart({
			router: {
				routeFileIgnorePattern: "api\\.",
			},
		}),
		viteReact(),
		// must be last — uploads source maps and wraps the build
		sentryTanstackStart({
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,
			authToken: process.env.SENTRY_AUTH_TOKEN,
			silent: !process.env.SENTRY_AUTH_TOKEN,
		}),
	],
});

export default config;

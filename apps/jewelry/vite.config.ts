import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "url";

import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

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
	],
});

export default config;

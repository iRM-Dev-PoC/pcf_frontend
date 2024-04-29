import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
	],
	optimizeDeps: {
		esbuildOptions: {
			target: "esnext",
		},
	}
});

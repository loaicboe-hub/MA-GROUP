process.env.NODE_ENV = "production";

if (!process.env.NITRO_PRESET) {
  process.env.NITRO_PRESET = "node-server";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
  },
  vite: {
    mode: "production",
    oxc: {
      jsx: {
        development: false,
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

/**
 * This codebase was exported with "package@version" import specifiers
 * (e.g. "lucide-react@0.487.0"). Vite/Node don't resolve those by default,
 * so we rewrite them to the bare package name at dev/build time.
 */
function stripVersionSuffixImports() {
  const versionSuffix = /^(.*)@(\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/;

  return {
    name: "strip-version-suffix-imports",
    enforce: "pre" as const,
    async resolveId(source: string, importer?: string) {
      const match = source.match(versionSuffix);
      if (!match) return null;

      const stripped = match[1];
      const resolved = await this.resolve(stripped, importer, { skipSelf: true });
      return resolved ?? null;
    },
  };
}

export default defineConfig({
  plugins: [stripVersionSuffixImports(), tailwind(), react()],
});


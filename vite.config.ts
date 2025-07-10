import { defineConfig } from "vite";
import pluginChecker from "vite-plugin-checker";

export default defineConfig({
    plugins: [
        pluginChecker({typescript: true})
    ]
});
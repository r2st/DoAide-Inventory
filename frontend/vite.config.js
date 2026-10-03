import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "http://localhost:8000",
      "/health": "http://localhost:8000",
      "/products": "http://localhost:8000",
      "/categories": "http://localhost:8000",
      "/warehouses": "http://localhost:8000",
      "/stock": "http://localhost:8000",
      "/suppliers": "http://localhost:8000",
      "/customers": "http://localhost:8000",
      "/purchase-orders": "http://localhost:8000",
      "/sales-orders": "http://localhost:8000",
      "/stock-adjustments": "http://localhost:8000",
      "/reports": "http://localhost:8000",
      "/barcode": "http://localhost:8000",
    },
  },
});

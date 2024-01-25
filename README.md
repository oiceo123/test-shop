<h2>Dockerize React (Vite)</h2>

<p>1. Set vite.config</p>

```bash
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
});
```

<p>2. Build React App</p>

```bash
npm run build
```

<p>3. Check React App</p>

```bash
npm run preview
```

<p>4. Add Dockerfile</p>

```bash
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
```

<h2>Build Docker Image</h2>

```bash
docker build -t test-shop:v1.0 .
```

<h2>Run Docker Image</h2>

```bash
docker run -p 8080:8080 --name test-shop test-shop:v1.0
```

# Frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install && npm run build

# Usamos un servidor estático para servir el frontend
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist"]

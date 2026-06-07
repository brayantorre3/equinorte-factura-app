# Etapa 1 - Compilar el proyecto Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2 - Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/equinorte-factura-app/browser /usr/share/nginx/html
EXPOSE 80
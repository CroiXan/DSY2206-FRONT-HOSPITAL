FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:stable-alpine

COPY --from=build /app/dist/dsy2206-front-hospital/browser /usr/share/nginx/html

# Sobreescribir index.html default de nginx
COPY --from=build /app/dist/dsy2206-front-hospital/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/dsy2206-front-hospital/browser /usr/share/nginx/html

# Sobreescribir index.html default de nginx
COPY --from=build /app/dist/dsy2206-front-hospital/browser/index.html /usr/share/nginx/html/index.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY certs/ /etc/nginx/certs/

EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
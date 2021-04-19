FROM node:15.14.0-alpine3.10 AS build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.19.10-alpine
USER nginx
WORKDIR /etc/nginx/html
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /build/dist .

FROM node:15.14.0-alpine3.10 AS build
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.19.10-alpine AS web
ENV GRAPHQL_BACKEND=http://localhost:4000/graphql
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
COPY --from=build /build/default.conf.template /etc/nginx/templates/default.conf.template
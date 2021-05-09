FROM node:15.14.0-alpine3.10 AS build-base
WORKDIR /build
COPY package-lock.json package.json ./

FROM build-base AS build-prod
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build

FROM build-base AS build-dev
ENV NODE_ENV=development
RUN npm i

FROM nginx:1.19.10-alpine AS web-prod
WORKDIR /usr/share/nginx/html
COPY --from=build-prod /build/dist .
COPY --from=build-prod /build/default.conf.template /etc/nginx/templates/default.conf.template

FROM nginx:1.19.10-alpine AS nginx-dev
WORKDIR /usr/share/nginx/html
COPY ./default.dev.conf.template /etc/nginx/templates/default.conf.template


FROM build-dev AS web-dev
WORKDIR /build
CMD ["npm", "run", "dev"]

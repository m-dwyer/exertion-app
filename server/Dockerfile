FROM node:15.14.0-alpine3.10 AS backend-base
WORKDIR /app
COPY package-lock.json package.json /app/

FROM backend-base AS production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["node", "index.js"]

FROM backend-base AS dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
CMD ["nodemon", "index.js"]
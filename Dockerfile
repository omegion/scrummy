FROM node:19-alpine as build

ENV PORT 443

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:19-alpine

ENV PORT 443
ENV NODE_ENV production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

ENTRYPOINT ["npm", "run", "server"]


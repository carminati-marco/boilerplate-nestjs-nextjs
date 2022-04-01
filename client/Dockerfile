FROM node:17-alpine as dependencies-frontend
WORKDIR /my-project
COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:17-alpine as builder
WORKDIR /my-project
COPY client/ ./
COPY shared ./shared
COPY --from=dependencies-frontend /my-project/node_modules ./node_modules
RUN yarn build

FROM node:17-alpine as runner-frontend
WORKDIR /my-project
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
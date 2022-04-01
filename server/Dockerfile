# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 14 image. The multi-stage mechanism allows to build
# the application in a "builder-backend" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:17-alpine as dependencies-backend
WORKDIR /home/node
COPY server/package.json server/yarn.lock ./
COPY server/prisma/ .
RUN yarn install --frozen-lockfile

FROM node:17-alpine as builder-backend
WORKDIR /home/node
COPY server/ ./
COPY shared ./shared
COPY --from=dependencies-backend /home/node/node_modules ./node_modules
RUN yarn build

# ---

FROM node:17-alpine as runner

USER node
WORKDIR /home/node
ENV NODE_ENV production
ENV PORT=3001

COPY --from=builder-backend --chown=node:node /home/node/package*.json ./
COPY --from=builder-backend --chown=node:node /home/node/tsconfig*.json ./
COPY --from=builder-backend --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder-backend --chown=node:node /home/node/dist/ ./dist/
COPY --from=builder-backend --chown=node:node /home/node/prisma/ ./prisma/

ENV DATABASE_URL="postgresql://admin:admin@boilerplate-db:5432/boilerplate"
# RUN yarn prisma migrate deploy 
EXPOSE 3001
CMD ["yarn", "start:prisma"]
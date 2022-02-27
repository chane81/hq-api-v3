# step 1
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN cd /app && echo 'YARN VERSION IN BUILDER: ' && yarn --version
# --frozen-lockfile 은 deprecate 됨 대신 --immutable or --immutable-cache 를 쓸 것
# RUN YARN_ENABLE_SCRIPTS=0 yarn install --immutable-cache
RUN yarn install --immutable
RUN yarn rebuild && yarn build

# step 2
FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/.yarn/cache/ ./.yarn/cache/
COPY --from=builder /app/.yarn/unplugged/ ./.yarn/unplugged/
COPY --from=builder /app/.yarn/releases/ ./.yarn/releases/
COPY --from=builder /app/.yarn/sdks/ ./.yarn/sdks/
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.pnp.cjs ./.pnp.cjs
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./.env.production

# RUN yarn install
RUN echo "YARN VERSION IN RUNNER: " && yarn --version

EXPOSE 4000

CMD ["yarn", "start:prod"]
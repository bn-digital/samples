# syntax=docker/dockerfile:latest
ARG image="dcr.bndigital.dev/library"
ARG version="3.0.0"
FROM ${image}:${version}
FROM dcr.bndigital.dev/library/yarn:$version AS build
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/cms/package.json packages/cms/package.json
COPY packages/website/package.json packages/website/package.json
ENV YARN_CHECKSUM_BEHAVIOR=ignore
RUN yarn
COPY packages packages
RUN yarn build

FROM dcr.bndigital.dev/library/nodejs:2.12.0
WORKDIR /usr/local/src
COPY --from=build /usr/local/src/build .
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=5000
EXPOSE 5000

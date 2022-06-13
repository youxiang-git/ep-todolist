### REMOVE the \build and \node_module directories before building this locally! ###
FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY . .

ARG NPM_TOKEN

RUN if [ ! -z $NPM_TOKEN ] ; then npm config set '//npm.pkg.github.com/:_authToken' "${NPM_TOKEN}" ; fi

RUN npm install && \
    npm install ionic && \
    npm run build

FROM node:16-alpine AS production

ENV PORT 8080

WORKDIR /usr/src/app

# copy from build artifacts from development stage
COPY --from=development /usr/src/app/build ./

RUN chown -R node:node ./

USER node

RUN npm install serve

CMD npx serve -s . -l ${PORT}

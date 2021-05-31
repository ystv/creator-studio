# build environment
FROM node:alpine as build
LABEL site="creator-studio"
LABEL stage="builder"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
ARG BUILD_ID
LABEL build=$BUILD_ID
RUN yarn build

# production environment
FROM nginx:stable-alpine
LABEL site="creator-studio"
LABEL stage="final"
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
RUN apk add curl
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]
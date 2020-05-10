# build environment
FROM node:alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
RUN apk add curl
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]
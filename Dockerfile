# Build environment
FROM node:15-alpine as deps
RUN apk add --no-cache libc6-compat
LABEL site="creator-studio"
LABEL stage="builder"
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production environment
FROM nginx:stable-alpine
LABEL site="creator-studio"
LABEL stage="final"
COPY --from=deps /app/build /usr/share/nginx/html
EXPOSE 80
RUN apk add curl
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
CMD ["nginx", "-g", "daemon off;"]

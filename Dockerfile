# Build environment
FROM node:16-alpine as deps
RUN apk add --no-cache libc6-compat
LABEL site="creator-studio"
LABEL stage="builder"
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG GIT_REV_ARG="n/a"
ARG BUILD_ID_ARG="n/a"
ARG REACT_APP_DEBUG_ARG="n/a"
ARG REACT_APP_TITLE_ARG="n/a"
ARG REACT_APP_SECURITY_BASEURL_ARG="n/a"
ARG REACT_APP_SECURITY_TYPE_ARG="n/a"
ARG REACT_APP_PUBLIC_SITE_BASEURL_ARG="n/a"
ARG REACT_APP_MYTV_BASEURL_ARG="n/a"
ARG REACT_APP_UPLOAD_ENDPOINT_ARG="n/a"
ARG REACT_APP_API_BASEURL_ARG="n/a"
ENV SOURCE_ID=$GIT_REV_ARG
ENV BUILD_ID=$BUILD_ID_ARG
ENV REACT_APP_DEBUG=$REACT_APP_DEBUG_ARG
ENV REACT_APP_TITLE=$REACT_APP_TITLE_ARG
ENV REACT_APP_SECURITY_BASEURL=$REACT_APP_SECURITY_BASEURL_ARG
ENV REACT_APP_SECURITY_TYPE=$REACT_APP_SECURITY_TYPE_ARG
ENV REACT_APP_PUBLIC_SITE_BASEURL=$REACT_APP_PUBLIC_SITE_BASEURL_ARG
ENV REACT_APP_MYTV_BASEURL=$REACT_APP_MYTV_BASEURL_ARG
ENV REACT_APP_UPLOAD_ENDPOINT=$REACT_APP_UPLOAD_ENDPOINT_ARG
ENV REACT_APP_API_BASEURL=$REACT_APP_API_BASEURL_ARG

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

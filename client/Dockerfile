# Stage 1
FROM node:14 as build-stage

WORKDIR /client
COPY package*.json .
RUN npm install
COPY . .

ARG VITE_API_URL
ARG VITE_API_KEY
ARG VITE_UPLOAD_DIR

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_UPLOAD_DIR=$VITE_UPLOAD_DIR

RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine
COPY --from=build-stage /client/img /usr/share/nginx/html/img
COPY --from=build-stage /client/uploads /usr/share/nginx/html/uploads

COPY --from=build-stage /client/dist /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'
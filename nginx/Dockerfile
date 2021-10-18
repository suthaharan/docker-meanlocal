FROM node:14-alpine as build-step

USER root

RUN mkdir -p /app
WORKDIR /app
COPY ./angular-app/ /app/
RUN npm install
RUN npm run build --prod


FROM nginx:latest AS ngi
COPY --from=build-step /app/dist/ /usr/share/nginx/html
EXPOSE 80
# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]
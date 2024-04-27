FROM node:16.20.2-alpine3.18 as build-stage
WORKDIR /app
RUN npm install -g @angular/cli@15.0.5
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration=production

FROM nginx:stable-alpine3.19-perl as production-stage
COPY  --from=build-stage /app/dist/angular-jwt-auth/ /usr/share/nginx/html
COPY ./assets/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]

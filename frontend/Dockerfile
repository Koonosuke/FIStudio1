#FROM node:20-alpine AS build

#WORKDIR /app

#COPY package.json package-lock.json ./

#RUN apk add --no-cache bash git

#RUN npm install

#COPY . .

#RUN npm run build

FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
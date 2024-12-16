FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache bash git

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
FROM node:current-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "run" , "start:dist"]

EXPOSE 3000

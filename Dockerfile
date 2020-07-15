FROM node:current-alpine
WORKDIR /app
COPY . /app
CMD ["npm", "run" , "start:dist"]
EXPOSE 3000

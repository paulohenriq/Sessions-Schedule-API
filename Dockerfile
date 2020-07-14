FROM node:12.16.1
WORKDIR /app
COPY . /app
CMD ["npm", "run" , "start:dist"]
EXPOSE 80

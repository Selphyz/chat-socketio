FROM node:14-alpine
WORKDIR /server
COPY ["package.json", "./"]
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 4000
CMD ["npm", "start"]

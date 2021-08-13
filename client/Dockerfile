FROM node:14-alpine
WORKDIR /client
COPY ["package.json", "./"]
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

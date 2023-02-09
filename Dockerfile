FROM node:18.14

WORKDIR /app

COPY package*.json ./

USER root

RUN npm install --silent

COPY . .

RUN chown node:node /app

ENTRYPOINT ["npm", "start"]

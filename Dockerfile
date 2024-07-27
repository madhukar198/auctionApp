FROM node:lts-alpine
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]


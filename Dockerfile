FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3090

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]




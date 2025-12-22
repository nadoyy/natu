FROM node:20

WORKDIR /app

COPY package* .

RUN npm install --include=optional

COPY . .

CMD ["npm", "start"]

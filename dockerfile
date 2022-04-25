FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm installdock

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]

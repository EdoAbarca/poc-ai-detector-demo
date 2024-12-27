FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3333

CMD [ "sh", "-c", "npx prisma db push && npm run start:prod" ]
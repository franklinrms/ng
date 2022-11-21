FROM node:16.14-alpine

WORKDIR /app-backend

COPY . .

RUN npm install

RUN npx prisma generate

CMD ["npm", "run", "db:reset"]

ENTRYPOINT ["npm", "start"]
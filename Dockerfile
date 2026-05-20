FROM node:20-alpine
WORKDIR /app

RUN npm install redis
COPY app.js .
EXPOSE 3000
CMD ["node", "app.js"]
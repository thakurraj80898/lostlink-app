FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

RUN npm install -g typescript

COPY backend/ ./

RUN npm run build

EXPOSE 5000

ENV PORT=5000

CMD ["node", "dist/server.js"]

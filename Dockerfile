FROM node:16

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.build.json .env /app/
COPY src/ /app/src/

RUN npm install

EXPOSE 3000
EXPOSE 9229
CMD ["npm", "run", "start:debug"]
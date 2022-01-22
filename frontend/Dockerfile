FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN mkdir -p /app/node_modules  
RUN chown -R node:node node_modules
RUN npm install --silent

COPY . ./

CMD ["npm", "start"]
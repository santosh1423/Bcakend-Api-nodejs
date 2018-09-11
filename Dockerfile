FROM node:8-alpine

ENV NODE_ENV=prod MONGO_HOST=localhost MONGO_PORT=27017  \
    MONGO_ADMIN_DB=admin 
COPY package.json package-lock.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm i --only=production && mkdir /ng-app && cp -R ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
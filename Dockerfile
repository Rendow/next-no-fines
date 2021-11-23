FROM node

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .
EXPOSE 3000
RUN yarn install


CMD ["yarn", "start"]
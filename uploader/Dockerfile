FROM node:16.17.0
WORKDIR /app
COPY package.json /app/
RUN ["npm", "install"]
COPY . /app/
EXPOSE 3000

FROM node:16.18.0

RUN mkdir /app && cd ./app && mkdir /server
WORKDIR /app/server
COPY package*.json ./
RUN npm install
COPY . .

# RUN cd ./app/server && npm install
RUN npm install
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]

EXPOSE 5500 27017

CMD [ "npm", "start" ]


# FROM node:16.18.0

# # ENV NODE_ENV=production

# RUN mkdir /app && cd ./app && mkdir /client
# WORKDIR /app/client
# # COPY package*.json ./
# # RUN npm install
# COPY . .

# # RUN cd ./app/client && npm install
# RUN npm install
# RUN npm run build
# RUN ["apt-get", "update"]
# RUN ["apt-get", "-y", "install", "vim"]

# CMD [ "npm", "start" ]

# EXPOSE 3000


FROM node:16.18.0

# ENV NODE_ENV=production

RUN mkdir /app && cd ./app && mkdir /client
WORKDIR /app/client
# COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build


RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]

CMD [ "npm", "start" ]

EXPOSE 3000
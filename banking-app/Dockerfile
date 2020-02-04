FROM ultan/applied-projct
MAINTAINER Ultan Kearns
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]

# To build and run with Docker:
#
#  $ docker build -t dalanesoft/servedservice .
#  $ docker run -it --rm -p 8000:8000 dalanesoft/servedservice
#
FROM node:latest

RUN mkdir -p /code /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /code
COPY package.json /code/
RUN npm install --unsafe-perm=true

COPY . /code
RUN chown -R nodejs:nodejs /code
USER nodejs

CMD npm start

FROM node:0.10
WORKDIR /code
ADD . /code
RUN rm -rf /code/node_modules
RUN npm install
ENV PORT 3000
EXPOSE 3000
CMD [ "npm", "start" ]

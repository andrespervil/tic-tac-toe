FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install nodemon
RUN npm i nodemon -g --loglevel notice

# Remove logs
RUN rm -rf logs

# Port to expose
EXPOSE 3000

# Run app
CMD cd packages/frontend && yarn dev
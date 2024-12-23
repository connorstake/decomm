FROM node:16.16-alpine

RUN apk upgrade && apk add curl

WORKDIR /usr/src
EXPOSE 443

# Copy all files from current directory
COPY . .

# Start the application
CMD ["node", "./dist/main.js"]
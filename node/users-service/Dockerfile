FROM node:12

# Add everything in the current directory to our image, in the 'app' folder.
COPY ["package.json", "package-lock.json", "/app/"]

WORKDIR /app

RUN npm install

ADD . /app

# Install dependencies
RUN chmod +x ./wait-for-it.sh; \
    npm run build

# Expose our server port.
EXPOSE 4001 27017 5672

# Run our app.
CMD ["ls"]
CMD ["node", "dist/server.js"]

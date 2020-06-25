FROM node:12

# Add everything in the current directory to our image, in the 'app' folder.
COPY ["package.json", "package-lock.json", "/gateway/"]

WORKDIR /gateway

RUN npm install

ADD . /gateway

# Install dependencies
RUN chmod +x ./wait-for-it.sh; \
    npm run build

# Expose our server port.
EXPOSE 3000

# Run our app.
CMD ["ls"]
CMD ["node", "dist/server.js"]

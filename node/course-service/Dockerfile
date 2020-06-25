FROM node:12

# Add everything in the current directory to our image, in the 'app' folder.
COPY ["package.json", "package-lock.json", "/courses/"]

WORKDIR /courses

RUN npm install

ADD . /courses

# Install dependencies
RUN chmod +x ./wait-for-it.sh; \
    npm run build

# Expose our server port.
EXPOSE 4002 27017

# Run our app.
CMD ["ls"]
CMD ["node", "dist/server.js"]

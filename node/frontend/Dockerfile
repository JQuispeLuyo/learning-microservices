FROM node:12

# Add everything in the current directory to our image, in the 'app' folder.
COPY ["package.json", "package-lock.json", "/frontend/"]

WORKDIR /frontend

RUN npm install

ADD . /frontend

# Install dependencies
RUN chmod +x ./wait-for-it.sh;   

ENV PORT=3030

# Expose our server port.
EXPOSE 3030
EXPOSE 3031

# RUN cd /frontend; \        
#     npm start;    
# npm rebuild node-sass --force; 
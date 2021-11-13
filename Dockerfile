# https://mherman.org/blog/dockerizing-a-react-app/

# Pull base image
FROM node:14

# Add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# Create and set working directory
RUN mkdir /web
WORKDIR /web

# Add app
COPY ./web ./

EXPOSE 8080

# Install dependencies
RUN yarn install

# Finally runs the application
CMD ["yarn", "start"]

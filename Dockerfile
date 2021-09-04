# https://mherman.org/blog/dockerizing-a-react-app/

# Pull base image
FROM node:14

# Add `/app/node_modules/.bin` to $PATH
ENV PATH ./node_modules/.bin:$PATH

# Create and set working directory
RUN mkdir /app
WORKDIR /app

# Add app
COPY ./app ./

# Install dependencies
RUN yarn install

# Finally runs the application
CMD ["yarn", "start"]

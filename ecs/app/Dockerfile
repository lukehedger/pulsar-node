# Use an official Node.js runtime as the base image
FROM node:23-bullseye

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
# This is done separately from copying the rest of the code
# to take advantage of Docker's layer caching
COPY package*.json ./

# Install dependencies
# Use ci instead of install for more reliable builds
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Set environment variables
# TODO: Set the correct env vars
ENV NODE_ENV=production

# Define the command to run your app
CMD [ "node", "index.js" ]

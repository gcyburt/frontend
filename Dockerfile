# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /src

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the build
FROM nginx:alpine
COPY --from=0 /src/build /usr/share/nginx/html

# Expose the application port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
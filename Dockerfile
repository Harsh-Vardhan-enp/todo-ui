# Use the official Node.js image as a base
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Create a new stage for the final image
# FROM node:18

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the built application from the previous stage
# COPY --from=build /app /app

# # Install only production dependencies
# COPY package*.json ./
# RUN npm install --only=production

# Expose the port on which the app will run
EXPOSE 4173

# Command to run the app
CMD ["npm", "run", "preview"]

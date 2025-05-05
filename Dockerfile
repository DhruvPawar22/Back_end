# Use an official node js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the Prisma schema into the container
COPY prisma ./prisma

# Copy the rest of the application files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "./src/server.js"]

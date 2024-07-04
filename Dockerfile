# Stage 1: Build
FROM node:20-alpine AS build

# Create a non-root user and group
RUN addgroup app && adduser -S -G app app

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Change ownership to app user
RUN chown -R app:app /app

# Switch to the non-root user
USER app

# Install dependencies
RUN pnpm install

# Copy the source code and set ownership
COPY --chown=app:app . .

# Build the project
RUN pnpm run build

# Stage 2: Run
FROM node:20-alpine

# Create a non-root user and group
RUN addgroup app && adduser -S -G app app

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy only the build artifacts and dependencies from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the necessary port
EXPOSE 5001

# Switch to the non-root user
USER app

# Start the application
CMD ["pnpm", "run", "start"]

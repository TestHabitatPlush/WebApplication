FROM node:20-alpine

# Create expected folder structure
WORKDIR /usr/src

# Copy entire service folder INTO /usr/src/service
COPY . /usr/src/service

# Move into service directory
WORKDIR /usr/src/service

# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Environment
ENV NODE_ENV=production

# Start app
CMD ["npm", "run", "prod"]

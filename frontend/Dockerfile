###################
# BASE IMAGE
###################
FROM node:21.7-alpine AS base-image

# Create APP directory
WORKDIR /usr/src/app
ARG VITE_API_URL=http://localhost:3000

# Install Dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy Necessary Files (static/src etc)
COPY . . 

# Creates Production Bundle
RUN npm run build-only && npm prune --production


###################
# PROD IMAGE
###################
FROM python:3.10-alpine AS prod-image
WORKDIR /usr/src/app

# Needed Files
COPY --from=base-image /usr/src/app/dist ./dist
COPY --from=base-image /usr/src/app/start.sh ./
RUN chmod +x start.sh

EXPOSE 3010
CMD ["/bin/sh", "-c", "./start.sh"]

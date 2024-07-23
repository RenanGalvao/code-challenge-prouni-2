###################
# BASE IMAGE
###################
FROM node:21.7-alpine AS base-image

# Create APP directory
# be aware WORKDIR creates directories as root instead of USER 
# https://github.com/moby/moby/issues/36677
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy Necessary Files
COPY . . 

# Creates Production Bundle
RUN npx prisma generate && npm run build && npm prune --production

# Needed for seeding
RUN chown -R node:node ./node_modules/.prisma
RUN chown -R node:node ./node_modules/@prisma


###################
# PROD IMAGE
###################
FROM node:21.7-alpine AS prod-image
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV TZ=America/Sao_Paulo

# Needed Files
COPY --from=base-image --chown=node:node /usr/src/app/package.json ./
COPY --from=base-image --chown=node:node /usr/src/app/dist ./dist
COPY --from=base-image --chown=node:node /usr/src/app/prisma ./prisma
COPY --from=base-image --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=base-image --chown=node:node /usr/src/app/start.sh ./
RUN chmod +x start.sh

USER node:node
EXPOSE 3000
CMD ["/bin/sh", "-c", "./start.sh"]

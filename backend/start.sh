#!/bin/sh

# wait for db (service) to start
while ! nc -z db 5432; do sleep 1; done;

# since there's no way to use docker secret directly, pass content of file to ENV
# https://github.com/prisma/prisma/issues/4980
export DATABASE_URL=$(cat /run/secrets/database_url);

# setup database
npx prisma migrate deploy;
npx prisma db seed; 

npm run start;
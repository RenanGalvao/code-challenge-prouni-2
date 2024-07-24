#!/bin/sh

# wait for db (service) to start
while ! nc -z db 5432; do sleep 1; done;

npm run start;
# Required
1. docker
2. node.js

# Start
1. open your terminal, cd to this folder
1. copy and rename `.env.example` to `.env` and config it
1. build mysql: `docker-compose up -d`
1. install node.js modules: `npm i`
1. run db migration: `node_modules/.bin/sequelize db:migrate`
1. start server: `npm start`
1. test on swagger: [http://localhost:3000/swagger-html](http://localhost:3000/swagger-html)

# Stop
1. terminate the server: `ctrl+c`
1. mysql service: `docker-compose stop && docker-compose down`
1. drop migration: `node_modules/.bin/sequelize db:migrate:undo:all`

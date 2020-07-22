# Required
1. Require docker and node.js

# Start
1. open your terminal, cd to this folder
1. build mysql: `docker-compose up -d`
1. install node.js modules: `npm i`
1. run db migration: `node_modules/.bin/sequelize db:migrate`
1. start server: `npm start`

# Stop
1. mysql service: `docker-compose stop && docker-compose down`
1. drop migration: `node_modules/.bin/sequelize db:migrate:undo:all`

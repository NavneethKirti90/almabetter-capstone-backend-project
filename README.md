# almabetter-capstone-backend-project
get-youtube-subscriber-backend-project


Get YouTube Subscribers - Backend Capstone Project

1. First install npm dependencies of express and mongoose using npm install command.

2. Start the backend server using npm start or node src/index.js command.

3. We are using MONGODB CLOUD for database

HTTP request methods used in the project
GET http://localhost:3000/ → The client will see the “This capstone project is done by Navneeth kirti.” message which is used to verify that application is working properly.

GET http://localhost:3000/subscribers → When the user hit this, endpoint /subscribers, the client will get an array of all subscribers in JSON format from the database where the data is stored in local MongoDB database.

GET http://localhost:3000/subscribers/name →When the user hit this, endpoint /subscribers/names the client will to get an array of all subscribers in JSON format with only name and subscribed Channel fields from the database, where the data is stored in local MongoDB database.

GET http://localhost:3000/subscribers/:id → When the user hit this, endpoint /subscribers/:id in ID, the user needs to enter the USER’S ID which is stored in the database to get a particular user’s details like name, subscribed Channel and subscribed Date from the database, where the data is stored in local MongoDB database.


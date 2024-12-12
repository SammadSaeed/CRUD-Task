Project Setup
========================
1. VSCode as the IDE.
2. Install Node.JS and its framework Express
3. Setup the initial project to handle the dependencies
4. Install the framework Express.js for the backend API.
5. Test the server is running on the port e.g 3000.
6. Create a .gitignore file so that the files and directories that are not related to the project are ignored in the repository.
7. Create a .env file to store the sensitive URIs. 
7. Install nodemon so that we do not have to turn off the server to make view changes.
8. Connect a database (MongoDB). Using Atlas and Mongoose.

Models
========================
1. Use the proper naming convention. (users.js,tasks.js)
2. Create a User model (Schema) which contains: username, email, password, createdAt (optional)
3. Create a task model (Schema) which contains: title, description, completed, createdAt 

Index.js
========================
1. Provide all the requirements.
2. Contains the paths to routes, controllers, models and middleware
3. Data to be read in JSON format.

Routes
========================
1. Using all the methods for tasks. POST,GET,PUT,DELETE and only POST for users. (tasks.route.js, users.route.js)
2. Use the basic URI
/tasks
/users   

Controllers
========================
1. Populate the functions of POST, GET, PUT, DELETE in the controller. Used to not clutter the index. (tasks.controller.js, users.controller.js)
2. Controllers will be used by the route which would then be used in the index file. This keeps the code clean and readable.

Authentication
========================
1. Created a login system that will authenticate the user and after that let them do CRUD operations for the tasks.
2. Password Hashing using BcryptJS and authentication using JWT.

Middleware
========================
1. Created a middleware for authentication and pagination so the code is clean and modular, and can be modified without changing the main code.
2. authMiddleware.js and paginationMiddleware.js

config
========================
1. This contains validateEnv.js so that we can actually tell whether the stored variables in .env file works.

How to test
========================
1. use POSTMAN to test the results.
the following URIs are:
http://localhost:3000/users/register

the schema template is:

{
    "username":"",
    "email": "",
    "password": ""
}


http://localhost:3000/users/login

to login:
{
    
    "email": "",
    "password": ""
}
 
Make sure to use the token when creating the tasks in POST or updating in PATCH, or else you will get an error.
Use of pagination to view all the tasks.
http://localhost:3000 /tasks?limit=10                   
http://localhost:3000 /tasks?sort=createdAt&order=desc   

http://localhost:3000/tasks


{
    "title": "",
    "description": "",
    "completed":false
}

2. I have allowed all the IPs to access MongodDB Atlas, and already migrated some data in it, see the example PNG to verify it.

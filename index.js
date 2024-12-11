require('dotenv').config(); 
const validateEnv = require('./config/validateEnv');
const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/users')
const Task = require('./models/tasks')
const paginationMiddleware = require('./middleware/paginationMiddleware');
const tasksRouter = require('./routes/tasks.route')
const usersRouter = require('./routes/users.route')

const app = express()

// Validation 
validateEnv();

// Middleware
app.use(express.json());
app.use(paginationMiddleware());


// Routes
app.use('/tasks',tasksRouter)
app.use('/users',usersRouter)



app.get('/',(req,res)=>{
    res.send("Hello World from express.js :)")
})



// Connect Mongo Atlas.
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB")
    app.listen(3000,()=>{
        console.log("Server is running")
    })
})
.catch((err)=>{
    console.log(err)
})


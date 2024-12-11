const Task = require('../models/tasks');
const mongoose = require('mongoose');
const paginationMiddleware = require('../middleware/paginationMiddleware');



const getTasks= async(req,res)=>{

    try{
        const {limit,cursor,sort,order,filter}=req.pagination;

        let query={};
        if(cursor){
            try {
                query._id = { $gt: new mongoose.Types.ObjectId(cursor) };
            } catch (error) {
                return res.status(400).json({ 
                    error: "Invalid cursor format. Please use a valid MongoDB ObjectId" 
                });
            }
        }
        if(filter){
            query.title={$regex:filter,$options:'i'};

        }
        let sortObj={};
        sortObj[sort]=order;
        sortObj._id=order

        const tasks=await Task.find(query)
        .populate('user', 'username email')
        .sort(sortObj)
        .limit(limit-1);

        const total=await Task.countDocuments();

        res.status(200).json(res.paginate(tasks,total));
        
    } catch(err){

        res.status(500).json({ error: err.message });
    }
}


const getTask=async(req,res)=>{
    try{
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId)  
        .populate('user', 'username email');
        if (!task)
        {
            return res.status(404).json({message:'Task not found'})
        }
        res.status(200).json(task)

    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const createTask=async(req,res)=>{
    try{
        const task = new Task({
            ...req.body,
            user: req.user._id
        });
        
        const newTask = await task.save();
        await newTask.populate('user', 'username email');
        
        res.status(201).json(newTask);
    }catch(err){
        res.status(500).json({error:err.message})
    }

}

const updateTask=async(req,res)=>{
    try{
        const taskId = req.params.taskId;
        const task = await Task.findByIdAndUpdate(taskId,req.body,{new:true})
        .populate('user', 'username email');
        if (!task)
        {
            return res.status(404).json({message:'Task not found'})
        }
        const updatedTask= await Task.findById(taskId)
        res.status(200).json(updatedTask)
    }catch(err)
    {res.status(500).json({error:err.message})}
}

const deleteTask=async(req,res)=>{

    try{
        const taskId = req.params.taskId;
        const task = await Task.findByIdAndDelete(taskId)
        if (!task)
        {
            return res.status(404).json({message:'Task not found'})
        }
        res.status(200).json({message:'Task deleted successfully'})
    }catch(err)
    {res.status(500).json({error:err.message})}
 
}

module.exports={
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}
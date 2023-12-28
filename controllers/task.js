import {Task} from "../models/task.js"
export const createTask = async(req, res, next)=>{
    
    const {title, description} = req.body;

    await Task.create({title, description, user: req.user})

    res.status(200).json({
        success: true,
        message:"Task Created Successfully!!"
    });
}

export const getMyTasks = async(req, res, next)=>{
    
    const userId = req.user._id;

    const tasks = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        tasks
    });
}

export const updateTask = async(req, res, next)=>{

    const task = await Task.findById(req.params.id);
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success: true,
        message:`Your task name: ${task.title}, is updated and value of isCompleted is ${task.isCompleted}`
    });
}

export const deleteTask = async(req, res, next)=>{

    const task = await Task.findById(req.params.id);
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message:`Your task name: ${task.title}, is successfully deleted`
    });
}
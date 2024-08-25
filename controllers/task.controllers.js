const express = require("express")

const TaskModel = require("../models/task.model")

const taskcontrollerRoute = express.Router()

taskcontrollerRoute.get("/tasks",async(req,res)=>{
try {
    const page = parseInt(req.query.page)||1
    const limit = parseInt(req.query.limit)||10

    const task = await TaskModel.find().skip((page-1)*limit).limit(limit)

    const totaltasks = await TaskModel.countDocuments()
    const totalpages = Math.ceil(totaltasks/limit)

    res.status(200).json({message:"paginate data",task,totalpages,currentPage:page})
} catch (error) {
    res.status(403).json({message:"No found err"})
}

})


module.exports = taskcontrollerRoute
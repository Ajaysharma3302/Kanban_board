const express = require("express");

const TaskModel = require("../models/task.model");

const taskRouter = express.Router();

taskRouter.post("/add-task", async (req, res) => {
  const { title, description, duedate } = req.body;

  try {
    const task = new TaskModel({
      title,
      description,
      duedate,
    });

    await task.save();

    res.status(201).json({ message: "task create sucessfully" });
  } catch (error) {
    res.status(501).json({ message: "err in create task" });
  }
});

taskRouter.get("/view", async (req, res) => {
  try {
    const task = await TaskModel.find({});

    res.status(200).json({ message: "task fetch correctly", task });
  } catch (error) {
    res.status(403).json({ message: "task not found " });
  }
});

taskRouter.patch("/task-update/:id", async (req, res) => {
  const { id } = req.params;

  const updatedata = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(403).json({ message: "task not found" });
    }
    res.status(200).json({ message: "task found and update", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "error occured in updating task" });
  }
});

taskRouter.delete("/delete-task/:id", async (req, res) => {
  const { id } = req.params;
try {
    const deletetask = await TaskModel.findByIdAndDelete(id);

  if (!deletetask) {
    return res.status(500).json({ message: "task not deleted" });
  }
  res.status(200).json({ message: "task deleted" });

} catch (error) {
    res.status(403).json({ message: "err in delete task" });
}
  

});

module.exports = taskRouter;

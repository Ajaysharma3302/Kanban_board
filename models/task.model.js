const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duedate: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      enum:["to do","in Progess","done"]
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;

const express = require("express");
const app = express();

const userRoute = require("./Routes/user.route")
const authmiddleware = require("./middleware/auth.middleware")

const taskRouter = require("./Routes/task.route")
const dotenv = require("dotenv").config();
const connection = require("./Config/db");
const authorizemiddleware = require("./middleware/authorize.middleware");
const taskcontrollerRoute = require("./controllers/task.controllers")

const PORT = process.env.PORT || 3881;

app.use(express.json())

app.use("/users",userRoute)
app.use("/task",taskRouter)
app.use("/tasks",taskcontrollerRoute)
app.get("/hello",authmiddleware,authorizemiddleware("user"),(req,res)=>{
  res.send("hello")
})

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log(`server is connected on ${PORT} and connected to db`);
  } catch (error) {
    console.log(`err in connection ${error}`);
  }
});

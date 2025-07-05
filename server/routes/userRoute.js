/*For defining the endpoint of the application and also to map them to the specific controller method*/

import express from 'express';
import {create, deleteUser, getAllUsers, getUserById, updateUser, getTasksByGroup, updateTaskStatus} from "../controller/userController.js"
const route = express.Router();

route.post("/user",create)
route.get("/users",getAllUsers)
route.get("/user/:id",getUserById)
route.put("/update/user/:id",updateUser)
route.delete("/delete/user/:id",deleteUser)
route.get("/users/group/:group", getTasksByGroup)
route.patch("/update-task/:id", updateTaskStatus);


export default route;
/* For handelling the request, processing the data, also for generating reponses*/
/*now we have to import user model*/
import User from '../model/userModel.js';

export const create = async (req, res) => {
  try {
    const { assignee, created, dueBy, task, priority, group, status, response } = req.body;

    if (!assignee || !dueBy || !task || !group) {
      return res.status(400).json({
        message: "Assignee, Due By, Task, and Group are required.",
      });
    }

    const newUser = new User({
      assignee,
      created: created ? new Date(created) : undefined,
      dueBy: new Date(dueBy),
      task,
      priority,
      group,
      status,
      response
    });

    const savedData = await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
      savedData,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({
      errorMessage: error.message,
    });
  }
};



//code for getting all users from database

export const getAllUsers = async (req, res) => {
    try{
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({message: "No user found"});
    }
    res.status(200).json({message: "Users found successfully", userData});
} catch (error) {
    res.status(500).json({errorMessage:error.message});
}
};
//code to grt user with specific id

export const getUserById = async (req, res) =>{
    try {
        const id = req.params.id;
        const UserExist = await User.findById(id);
        if(!UserExist){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User found successfully", UserExist});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

//code to update user with specific id
export const updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, response } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Task not found" });
    }

    user.status = status || user.status;
    user.response = response || user.response;

    const updated = await user.save();

    res.status(200).json({
      message: "Task status updated",
      updated
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ errorMessage: error.message });
  }
};

//code to update user information
export const updateUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const UserExist = await User.findById(id);
        if(!UserExist){
            return res.status(404).json({message: "User not found"});
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json({ message:"User updated successfully", updatedData});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

export const getTasksByGroup = async (req, res) => {
  try {
    const groupName = req.params.group;
    const userData = await User.find({ group: groupName });
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching group tasks", error });
  }
};


//code for deleting user from database
export const deleteUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const UserExist = await User.findById(id);
        if(!UserExist){
            return res.status(404).json({message: "User not found"});
        }
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully", deletedUser});
    } catch (error) {
       res.status(500).json({errorMessage: error.message});
    }
}
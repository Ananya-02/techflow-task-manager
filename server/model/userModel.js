/*For managing the structure of data and intracion with database*/

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    assignee: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now // Automatically set to current date/time
  },
  dueBy: {
    type: Date,
    required: true
  },
  group: {
  type: String,
  required: true,
},
task: {
  type: String,
  required: true,
},
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium"
  },
  status: {
    type: String,
    enum: ["Not Started", "Viewed", "In Progress", "Completed", "Blocked"],
    default: "Not Started"
  },
  response: {
    type: String,
    default: ""
  }
});

export default mongoose.model("Users", userSchema);
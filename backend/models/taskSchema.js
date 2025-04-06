const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task:String,
    description:String,
    status:{
      type:String,
      enum:["Pending","completed"],
      default:"Pending"
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User's Login Credentials"
    },
    assignedTo:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User's Login Credentials"
    }
    
  },{timestamps:true}
)

const taskModel = mongoose.model("Tasks Information",taskSchema);

module.exports = taskModel;
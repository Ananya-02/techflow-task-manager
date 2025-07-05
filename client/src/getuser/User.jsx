import React, { useState, useEffect } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const User = () => {
//code for fetching the data from databse

const [users, setUser] = useState([])
useEffect(()=>{
  const fetchData = async () =>{
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUser(response.data.userData)
    } catch (error) {
      console.log("Error while fetching Data", error)
    }
  };
  fetchData();
},[]);

const deleteUser = async (userId) => {
  await axios.delete(`http://localhost:8000/api/delete/user/${userId}`)
  .then((response) =>{
    setUser((prevUser)=> prevUser.filter((user) => user._id !== userId))
    toast.success(response.data.message,{position: "top-right"})
  })
  .catch((error)=>{
    console.log("Error while deleting user", error)
  })
}

  return (
    <div className="userTable">
      <Link to="/add" type='button' class="btn btn-primary">Add Task <i class="fa-solid fa-user-plus"></i></Link>
      {users.length=== 0?(
        <div className='noData'>
          <h3>No Task to display.</h3>
          <p>Please add New Task</p>
          </div>
      ):(
        <table className = "table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Assignee</th>
            <th scope="col">Created</th>
            <th scope="col">Due by</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
            <th>Group</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>{
            return(
              <tr>
            <td>{index+1}</td>
            <td>{user.assignee}</td>       
      <td>{user.created}</td>       
      <td>{user.dueBy}</td>          
      <td>{user.status}</td>
      <td>{user.priority}</td>
      <td>{user.group}</td>

            <td className='actionButtons'>
              <Link to={`/update/` + user._id} type="button" class="btn btn-primary">
                <i class="fa-solid fa-pen-to-square"></i>
              </Link>
              <button onClick={()=>deleteUser(user._id)} type="button" class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
            )
          })}
        </tbody>
      </table>
      )}

        
    </div>
  )
}

export default User

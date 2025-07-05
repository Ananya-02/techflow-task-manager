import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './update.css';
import { Link, useNavigate , useParams} from 'react-router-dom';
import { toast } from 'react-hot-toast';

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    assignee: '',
    created: '',
    dueBy: '',
    status: 'Open',
    priority: 'Low'
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 useEffect (()=>{
    axios.get(`http://localhost:8000/api/user/${id}`)
    .then(response =>{
        const user = response.data.UserExist;
        user.created = user.created.split('T')[0];
      user.dueBy = user.dueBy.split('T')[0];

      setFormData(user);
    })
    .catch((error) =>{
        console.error(error);
    });
 },[id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Convert date strings to proper ISO format
    const payload = {
      assignee: formData.assignee,
      created: new Date(formData.created).toISOString(),
      dueBy: new Date(formData.dueBy).toISOString(),
      status: formData.status,
      priority: formData.priority
    };

    console.log("Final payload:", payload);

    try {
    await axios.put(`http://localhost:8000/api/update/user/${id}`, payload);
    toast.success('User updated successfully!');
    navigate("/");
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Failed to update user.');
  }
    /*try {
      await axios.put(`http://localhost:8000/api/user/${id}`, payload);
      toast .success('User added successfully!');
      navigate("/");
      setFormData({
        assignee: '',
        created: '',
        dueBy: '',
        status: 'Open',
        priority: 'Low'
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user.');
    }*/
  };

  return (
    <div className='addUser'>
        <Link to="/dashboard" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i> Back
        </Link>
      <h3>Update Task</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label htmlFor="assignee">Assignee:</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            placeholder='Enter your Name'
            value={formData.assignee}
            onChange={handleChange}
            required
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="created">Created Date:</label>
          <input
            type="date"
            id="created"
            name="created"
            value={formData.created}
            onChange={handleChange}
            required
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="dueBy">Due By:</label>
          <input
            type="date"
            id="dueBy"
            name="dueBy"
            value={formData.dueBy}
            onChange={handleChange}
            required
          />
        </div>

        <div className='inputGroup'>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className='inputGroup'>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

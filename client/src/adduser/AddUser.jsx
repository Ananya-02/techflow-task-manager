import React, { useState } from 'react';
import axios from 'axios';
import './adduser.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const AddUser = () => {
  const [formData, setFormData] = useState({
    assignee: '',
    created: '',
    dueBy: '',
    group: '',
    task: '',
    priority: 'Low',
    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Convert date strings to proper ISO format
    const payload = {
      assignee: formData.assignee,
      created: new Date(formData.created).toISOString(),
      dueBy: new Date(formData.dueBy).toISOString(),
      task: formData.task,
      priority: formData.priority,
      group: formData.group
    };

    console.log("Final payload:", payload);

    try {
      await axios.post('http://localhost:8000/api/user', payload);
      toast .success('User added successfully!');
      navigate("/dashboard");
      setFormData({
        assignee: '',
        created: '',
        dueBy: '',
        task: '',
        priority: 'Low'
      });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user.');
    }
  };

  return (
    <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i> Back
        </Link>
      <h3>Add New Task</h3>
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
          <label htmlFor="task">Task:</label>
<input
  type="text"
  id="task"
  name="task"
  value={formData.task}
  onChange={handleChange}
  placeholder="Enter task description"
  required
/>


        </div>

        <div className='inputGroup'>
  <label htmlFor="group">Assign to Team:</label>
  <select
    id="group"
    name="group"
    value={formData.group}
    onChange={handleChange}
    required
  >
    <option value="">--Select Team--</option>
    
               <option value="developer">Software Developer</option>
                            <option value="designer">UI/UX Designer</option>
                            <option value="analyst">Business Analyst</option>
                            <option value="tester">QA Tester</option>
                            <option value="intern">Intern</option>
                            <option value="consultant">Technical Consultant</option>
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
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddUser;

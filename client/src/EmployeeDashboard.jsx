import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { group } = useParams();
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/group/${group}`)
      .then(res => setTasks(res.data.userData))
      .catch(err => console.error('Error fetching tasks:', err));
  }, [group]);

  const handleInputChange = (taskId, field, value) => {
    setEditedTask(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  };

  const handleUpdate = (taskId) => {
    const updates = editedTask[taskId];
    axios.patch(`http://localhost:8000/api/update-task/${taskId}`, updates)
      .then(() => {
        alert("Task updated successfully");
        window.location.reload();
      })
      .catch(err => alert("Update failed"));
  };

  return (
    <div className="employee-dashboard">
      <h2>📋 Tasks Assigned to {group.charAt(0).toUpperCase() + group.slice(1)} Team</h2>
      <Link to="/" className="btn btn-secondary mb-3">🔙 Back to Home</Link>
      {tasks.length === 0 ? (
        <p>No tasks assigned to this group yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Assigned to:</th>
              <th>Created</th>
              <th>Due By</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx}>
                <td>{task.assignee}</td>
                <td>{new Date(task.created).toLocaleDateString()}</td>
                <td>{new Date(task.dueBy).toLocaleDateString()}</td>
                <td>{task.task}</td>
                <td>{task.priority}</td>
                <td>
                  <select
                    value={editedTask[task._id]?.status || task.status || ''}
                    onChange={(e) => handleInputChange(task._id, 'status', e.target.value)}
                  >
                    <option value="Viewed">Viewed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleUpdate(task._id)}>✅</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeDashboard;

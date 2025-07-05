import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ userType, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [group, setGroup] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    if (userType === 'manager') {
      alert('Logged in as Manager ✅');
      onLoginSuccess();                // Set manager login state
      navigate('/dashboard');         // Redirect to manager dashboard
    } else if (userType === 'employee') {
      if (!group) {
        alert('❌ Please select your team group');
        return;
      }
      alert(`Logged in as Employee of ${group} team ✅`);
      navigate(`/employee/dashboard/${group}`);  // Redirect to group dashboard
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>{userType === 'manager' ? '👔 Manager Portal' : '👨‍💻 Employee Portal'}</h2>
        <p>Access your {userType} dashboard</p>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder={`${userType}@techflow.com`}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {userType === 'employee' && (
          <div className="form-group">
            <label>Select Your Team</label>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
            >
              <option value="">--Select Group--</option>
               <option value="developer">Software Developer</option>
                            <option value="designer">UI/UX Designer</option>
                            <option value="analyst">Business Analyst</option>
                            <option value="tester">QA Tester</option>
                            <option value="intern">Intern</option>
                            <option value="consultant">Technical Consultant</option>
            </select>
          </div>
        )}

        <button type="submit" className="login-button">
          Access {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
        </button>
      </form>
    </div>
  );
};

export default Login;

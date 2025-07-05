// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import AddUser from './adduser/AddUser';
import Update from './updateuser/Update';
import User from './getuser/User';
import EmployeeDashboard from './EmployeeDashboard'; // ✅ Import

function App() {
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Manager Login */}
        <Route
          path="/login/manager"
          element={<Login userType="manager" onLoginSuccess={() => setIsManagerLoggedIn(true)} />}
        />

        {/* Employee Login */}
        <Route path="/login/employee" element={<Login userType="employee" />} />

        {/* Employee Dashboard - accessible after group selection */}
       <Route path="/employee/dashboard/:group" element={<EmployeeDashboard />} />

        {/* Manager Routes (Protected) */}
        {isManagerLoggedIn ? (
          <>
            <Route path="/dashboard" element={<User />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/update/:id" element={<Update />} />
          </>
        ) : (
          <Route path="/dashboard" element={<Navigate to="/login/manager" />} />
        )}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


/*
import AddUser from './adduser/AddUser';
import './App.css';
import User from "./getuser/User";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Update from './updateuser/Update';

function App() {
    const route = createBrowserRouter([
    {
        path:"/",
        element: <User/>
    },
    {
        path:"/add",
        element: <AddUser/>,
    },
    {
        path:"/update/:id",
        element: <Update/>
    }
]);
  return (
    <div className="App">
      <RouterProvider router = {route}></RouterProvider>
    </div>
  );
}

export default App;*/
/*
import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('home');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return <Home />;
            case 'manager':
                return <Login userType="manager" />;
            case 'employee':
                return <Login userType="employee" />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="App">
            <Navbar setActiveTab={setActiveTab} />
            {renderTabContent()}
        </div>
    );
}

export default App;
*/
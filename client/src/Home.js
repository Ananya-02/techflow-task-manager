import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // create or update this for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-hero">
        <h1>Welcome to TechFlow Solutions</h1>
        <p>Innovating Tomorrow's Technology Today</p>
        <Link to="/login/manager" className="hero-button">
          Discover Our Vision
        </Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose TechFlow Task Manager?</h2>
        <div className="feature-cards">
  <div className="card">
    <img src="/team-collaboration.jpg" alt="Teamwork" />
    <h3>Team Collaboration</h3>
    <p>Assign and track tasks by teams like Backend, Frontend, QA, and DevOps.</p>
  </div>
  <div className="card">
    <img src="/deadline.jpeg" alt="Deadline" />
    <h3>Deadline Reminders</h3>
    <p>Get notified of upcoming task deadlines to stay on track.</p>
  </div>
  <div className="card">
    <img src="/slides.png" alt="Security" />
    <h3>Secure Access</h3>
    <p>Separate dashboards and controls for managers and employees.</p>
  </div>
</div>

      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>TechFlow in Numbers</h2>
        <div className="stat-cards">
          <div className="stat">
            <h3>500+</h3>
            <p>Tasks Managed</p>
          </div>
          <div className="stat">
            <h3>120+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat">
            <h3>15+</h3>
            <p>Teams Onboarded</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"Our team productivity skyrocketed after using TechFlow Task Manager!"</p>
            <h4>– Sarah, Project Manager</h4>
          </div>
          <div className="testimonial">
            <p>"It’s simple, intuitive, and very effective. We love it!"</p>
            <h4>– Devansh, Frontend Developer</h4>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="app-footer">
        <h2>Ready to Organize Your Team?</h2>
        <p>Start managing tasks with TechFlow today.</p>
        <Link to="/login/manager" className="cta-button">
          Get Started
        </Link>
      </footer>
    </div>
  );
};

export default Home;

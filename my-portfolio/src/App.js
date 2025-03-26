import React from 'react';
import './App.css';

function App() {
  return (
    <div className="portfolio">
      <header className="portfolio-header">
        <div className="header-content">
          <div className="profile-icon">👨‍💻</div>
          <h1>Vaibhav</h1>
          <p>Information Science Engineering Student | Web Developer</p>
          <div className="contact-info">
            <p>📍 Kundapura, Karnataka</p>
            <p>📞 +91-7353354226</p>
            <p>✉️ vaibhavkharvi08@gmail.com</p>
          </div>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </header>

      <section className="education">
        <h2>Education</h2>
        <div className="education-details">
          <div className="education-item">
            <h3>Canara Engineering College, Mangalore</h3>
            <p>B.E. in Information Science and Engineering</p>
            <p>2021 - 2025 | CGPA: 7.4</p>
          </div>
          <div className="education-item">
            <h3>Sri Venkatramana PU College, Kundapur</h3>
            <p>PCMC</p>
            <p>2020 - 2021 | Percentage: 85.16%</p>
          </div>
        </div>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>E-commerce Website Testing</h3>
            <p>Tested product functionalities using:</p>
            <div className="tech-stack">
              <span>Google Sheet</span>
              <span>JIRA</span>
              <span>Postman</span>
              <span>MySQL</span>
            </div>
            <ul>
              <li>Performed functional, UI, regression, and boundary testing</li>
              <li>Logged defects using JIRA and validated order data</li>
            </ul>
          </div>
          <div className="project-card">
            <h3>PC Auto-Lock and Unlock System</h3>
            <div className="tech-stack">
              <span>Python</span>
              <span>OpenCV</span>
              <span>Flask</span>
            </div>
            <ul>
              <li>Developed face recognition-based PC security system</li>
              <li>Implemented real-time face detection and verification</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="skills">
        <h2>Technical Skills</h2>
        <div className="skill-list">
          <div className="skill-category">
            <h3>Programming</h3>
            <span>Python</span>
            <span>C</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
          </div>
          <div className="skill-category">
            <h3>Tools & Technologies</h3>
            <span>MySQL</span>
            <span>Eclipse</span>
            <span>VSCode</span>
            <span>Postman</span>
            <span>JIRA</span>
          </div>
        </div>
      </section>

      <section className="achievements">
        <h2>Achievements</h2>
        <div className="achievement-card">
          <h3>Web Development Internship</h3>
          <p>InternPe</p>
          <ul>
            <li>Completed four web development tasks</li>
            <li>Gained practical experience in designing responsive websites</li>
            <li>Applied web development knowledge to real-world projects</li>
          </ul>
        </div>
      </section>

      <section className="certifications">
        <h2>Certifications</h2>
        <div className="certification-list">
          <div className="certification-item">
            <h3>HTML, CSS, JavaScript</h3>
            <p>Coursera</p>
          </div>
          <div className="certification-item">
            <h3>Java Programming Fundamental</h3>
            <p>Spoken Tutorial</p>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2024 Vaibhav. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
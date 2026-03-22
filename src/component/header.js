import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import linkedin from "../assets/images/linkedin.svg";
import github from "../assets/images/github.svg";

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = React.useState({
    loadTime: 0,
    memoryUsage: 0,
  });

  React.useEffect(() => {
    if (window.performance) {
      const perfData = window.performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      setMetrics((prev) => ({ ...prev, loadTime }));
    }

    if (performance.memory) {
      const memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
      setMetrics((prev) => ({ ...prev, memoryUsage: memUsage }));
    }
  }, []);

  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-primary flex-wrap header-navbar">
      {/* Theme Toggle Button - Floating Orb Animation */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 1.15 }}
        className="theme-toggle-btn"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        data-tooltip={isDark ? "Light Mode" : "Dark Mode"}
      >
        {isDark ? (
          <span className="theme-icon">☀️</span>
        ) : (
          <span className="theme-icon">🌙</span>
        )}
      </motion.button>

      <div>
        <NavLink className="navbar-brand header-brand" to="/">
          Portfolio
        </NavLink>
      </div>
      <span className="navbar-text ms-auto md-lg-0">
        <div className="social-icon">
          <a
            href="https://www.linkedin.com/in/adeoye-semilore-343b89350/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <img
              className="social-icon-img"
              style={{ borderRadius: "50%", position: "static" }}
              src={linkedin}
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://github.com/Semzycoded"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <img
              className="social-icon-img"
              style={{ borderRadius: "50%", position: "static" }}
              src={github}
              alt="GitHub"
            />
          </a>
          <a
            href="https://www.instagram.com/semzy2007/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <svg
              className="social-icon-img instagram-icon"
              viewBox="0 0 16 16"
              aria-label="Instagram"
              role="img"
            >
              <path
                fill="currentColor"
                d="M8 0C5.829 0 5.556.01 4.703.048C3.85.087 3.269.223 2.76.42a3.95 3.95 0 0 0-1.428.93A3.95 3.95 0 0 0 .42 2.76c-.197.509-.333 1.09-.372 1.943C.01 5.556 0 5.829 0 8c0 2.171.01 2.444.048 3.297c.039.853.175 1.434.372 1.943c.205.53.48.98.912 1.412c.432.432.882.707 1.412.912c.509.197 1.09.333 1.943.372C5.556 15.99 5.829 16 8 16c2.171 0 2.444-.01 3.297-.048c.853-.039 1.434-.175 1.943-.372a3.95 3.95 0 0 0 1.412-.912c.432-.432.707-.882.912-1.412c.197-.509.333-1.09.372-1.943C15.99 10.444 16 10.171 16 8c0-2.171-.01-2.444-.048-3.297c-.039-.853-.175-1.434-.372-1.943a3.95 3.95 0 0 0-.912-1.412A3.95 3.95 0 0 0 13.24.42c-.509-.197-1.09-.333-1.943-.372C10.444.01 10.171 0 8 0zm0 1.441c2.134 0 2.387.008 3.231.046c.78.035 1.204.166 1.486.275c.373.145.639.318.918.597c.279.279.452.545.597.918c.109.282.24.706.275 1.486c.038.844.046 1.097.046 3.231s-.008 2.387-.046 3.231c-.035.78-.166 1.204-.275 1.486a2.51 2.51 0 0 1-.597.918a2.51 2.51 0 0 1-.918.597c-.282.109-.706.24-1.486.275c-.844.038-1.097.046-3.231.046s-2.387-.008-3.231-.046c-.78-.035-1.204-.166-1.486-.275a2.51 2.51 0 0 1-.918-.597a2.51 2.51 0 0 1-.597-.918c-.109-.282-.24-.706-.275-1.486C1.449 10.387 1.441 10.134 1.441 8s.008-2.387.046-3.231c.035-.78.166-1.204.275-1.486c.145-.373.318-.639.597-.918c.279-.279.545-.452.918-.597c.282-.109.706-.24 1.486-.275C5.613 1.449 5.866 1.441 8 1.441z"
              />
              <path
                fill="currentColor"
                d="M8 4.324A3.676 3.676 0 1 0 8 11.676A3.676 3.676 0 0 0 8 4.324zm0 5.911A2.235 2.235 0 1 1 8 5.765a2.235 2.235 0 0 1 0 4.47zM11.824 3.2a.86.86 0 1 0 0 1.72a.86.86 0 0 0 0-1.72z"
              />
            </svg>
          </a>
        </div>
      </span>
      <ul
        className="nav nav-pills ms-auto mb-2 md-lg-0 nav-links-desktop d-none d-lg-flex"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            to="/"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-profile-tab"
            data-toggle="pill"
            to="/about"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-contact-tab"
            data-toggle="pill"
            to="/services"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Services
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link active"
            id="pills-contact-tab"
            data-toggle="pill"
            to="/contact"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false"
          >
            Contact
          </NavLink>
        </li>
        <li className="nav-item">
          <motion.button
            onClick={() => setShowMetrics(!showMetrics)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-link active metrics-navbar-toggle"
            title="Show performance metrics"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            ⚡ Performance
          </motion.button>
          {showMetrics && (
            <div className="metrics-navbar-popup">
              <div className="metric-item-navbar">
                <span className="metric-label-navbar">Load Time:</span>
                <span className="metric-value-navbar">
                  {metrics.loadTime}ms
                </span>
              </div>
              <div className="metric-item-navbar">
                <span className="metric-label-navbar">Memory:</span>
                <span className="metric-value-navbar">
                  {metrics.memoryUsage}MB
                </span>
              </div>
            </div>
          )}
        </li>
      </ul>

      <div
        className="mobile-nav-links d-lg-none w-100"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <NavLink className="mobile-nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="mobile-nav-link" to="/about">
          About
        </NavLink>
        <NavLink className="mobile-nav-link" to="/services">
          Services
        </NavLink>
        <NavLink className="mobile-nav-link" to="/contact">
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Header;

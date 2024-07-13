import "./Navbar.css";
import React from "react";
import { FaLinesLeaning } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isPathActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Route</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaLinesLeaning />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={
                  isPathActive("/list-customers")
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/list-customers"
              >
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  isPathActive("/customer-chart")
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/customer-chart"
              >
                Chart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import './Navbar.css';
// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar >
      <BootstrapNavbar.Brand as={Link} to="/">
        My Wiki
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/articles">
            Articles
          </Nav.Link>
          <Nav.Link as={Link} to="/categories">
            Categories
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}

export default Navbar;

import React from 'react';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

/**
 * Will Return Bootstrap Navbar.
 *
 * Use Navlink to make Application SPA 
 */
const CmeNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">Assignment</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
          {/* Add More Navigation Links Here */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CmeNavBar;

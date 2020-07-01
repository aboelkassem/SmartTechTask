import React from 'react';
import {Link,NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return(
            <div style={{paddingBottom:'100px'}}>
                <Navbar bg="dark" variant="dark" fixed="top">
                    <Navbar.Brand><Link to="/" className="navbar-brand">Smart Tech Task</Link></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link><NavLink activeClassName="active" className="nav-link" to="/employees">Employees</NavLink></Nav.Link>
                        <Nav.Link><NavLink activeClassName="active" className="nav-link" to="/departments">Departments</NavLink></Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header;
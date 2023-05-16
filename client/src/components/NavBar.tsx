import React from "react"; 
import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/users"; 
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link } from 'react-router-dom';

interface NavBarProps{
    loggedInUser: User | null, 
    onSignUpClicked: () => void, 
    onLoggedInClicked: () => void, 
    onLogoutSuccessful: () => void, 

}

const  NavBar = ({loggedInUser, onSignUpClicked, onLoggedInClicked, onLogoutSuccessful}: NavBarProps ) => {
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Notes App 
                </Navbar.Brand>
                <Navbar.Toggle aria-aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                                Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser ? <NavBarLoggedInView user={loggedInUser} onLoggedOutSuccessful={onLogoutSuccessful} /> : <NavBarLoggedOutView onLoginClicked={onLoggedInClicked} onSignedUpClicked={onSignUpClicked} />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


      );
}
 
export default NavBar;
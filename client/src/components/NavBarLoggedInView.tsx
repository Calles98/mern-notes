import React from "react"; 
import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users"; 
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User, 
    onLoggedOutSuccessful: () => void
}

const NavBarLoggedInView = ({user, onLoggedOutSuccessful}: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await NotesApi.logout(); 
            onLoggedOutSuccessful();
        } catch (error) {
            alert(error); 
            console.log(error);
            
        }
        
    }
    return (  
        <>
        <Navbar.Text className="me-2">
            Signed in as : {user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log out</Button>
        </>


    );
}
 
export default NavBarLoggedInView;
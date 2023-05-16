import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignedUpClicked: () => void, 
    onLoginClicked: () => void,

}

const NavBarLoggedOutView = ({onSignedUpClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {

    return ( 
        <>
        <Button onClick={onSignedUpClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Log in</Button>
        </>
     );
}
 
export default NavBarLoggedOutView;
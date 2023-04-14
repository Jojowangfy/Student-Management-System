import React, {useState} from "react";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {Navbar} from "react-bootstrap";

const Logout = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    const handleLogout = () => {
        // Add your logout logic here, e.g. clearing session storage, redirecting, etc.
        // Example:
        sessionStorage.removeItem('userId');
        // Add additional logic as needed...
        // Navigate to '/login' route
        navigate('/login');
    }

    return (
        // Render your component JSX here
        <div>
            <Navbar>
                {/* Render your logout button */}
                <Button onClick={handleLogout} type="danger" size="large" block>
                    Logout
                </Button>
            </Navbar>
        </div>
    )
}

export default Logout;

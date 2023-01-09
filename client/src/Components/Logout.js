import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    const logoutUser = async () => {

        await fetch('/logout', {
            method:"GET",
            headers:{
                "Content-Type": "application/json"
            },
        });
        navigate('/');
    }

    useEffect(() => {
        logoutUser();
    }, []);
}

export default Logout
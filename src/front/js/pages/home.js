import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../component/userForm.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	
	const handleClick = () => {
		if (localStorage.getItem('token')) navigate('/profile') 
	}

	return (
		<div className="text-center mt-5">

			<h2>Register</h2>
			<UserForm type={'register'} />


			<h2>Login</h2>
			<UserForm type={'login'} />
			<p onClick={handleClick}>
				Go to profile!
			</p>

		</div>
	);
};

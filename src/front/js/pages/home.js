import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../component/userForm.jsx";

export const Home = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [errorMessage, setErrorMessage] = useState(""); // Para mostrar errores

    // Alternar entre Login y Register
    const toggleForm = () => setIsLogin(!isLogin);

    // Redirigir al perfil si está logueado
    const handleClick = () => {
        if (token) navigate("/profile");
    };

    // Manejar el envío del formulario
    const handleSubmit = async (formData) => {
        setErrorMessage(""); // Resetear mensaje de error
        let success;
        if (isLogin) {
            // Intentar iniciar sesión
            success = await actions.login(formData);
        } else {
            // Intentar registrar un nuevo usuario
            success = await actions.register(formData);
        }

        if (success) {
            setToken(localStorage.getItem("token")); // Actualiza el estado local con el nuevo token
        } 

        if (!isLogin) {
            // Si es un registro exitoso, cambiar automáticamente a login
            setIsLogin(true);
        }
    };

    useEffect(() => {
        console.log("isLogin state changed:", isLogin); // Verifica si el estado cambia correctamente
    }, [isLogin]);

    return (
        <div className="mt-5 container-fluid p-0">
            <div className="form-control d-flex border-0">
                <h2>{isLogin ? "Login" : "Register"}</h2>

                {/* Mostrar el formulario con la lógica de tipo login/register */}
                {isLogin ? 
                    <UserForm type={"login"} onSubmit={handleSubmit} />
                : 
                    <UserForm type={"register"} onSubmit={handleSubmit} />
                }

                {/* Mostrar mensaje de error si existe */}
                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                {/* Enlace para alternar entre login y register */}
                <p onClick={toggleForm}>
                    {isLogin
                        ? "Don't have an account? Register"
                        : "Already have an account? Login"}
                </p>

                {/* Mostrar botón de redirección si el token está presente */}
                {token && (
                    <>
                        <div className="separator" role="presentation" aria-hidden="true">
                            <hr className="separator__line" />
                            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.202 13.5H17.799C15.704 13.5 14 15.204 14 17.298C14 17.574 14.224 17.798 14.5 17.798C14.776 17.798 15 17.574 15 17.298C15 15.755 16.256 14.5 17.799 14.5H22.202C23.745 14.5 25 15.755 25 17.298C25 17.574 25.224 17.798 25.5 17.798C25.776 17.798 26 17.574 26 17.298C26 15.204 24.296 13.5 22.202 13.5Z" fill="#8A42FB" />
                                <path d="M20 12.5C21.93 12.5 23.5 10.93 23.5 9C23.5 7.07 21.93 5.5 20 5.5C18.07 5.5 16.5 7.07 16.5 9C16.5 10.93 18.07 12.5 20 12.5ZM20 6.5C21.379 6.5 22.5 7.622 22.5 9C22.5 10.378 21.379 11.5 20 11.5C18.621 11.5 17.5 10.378 17.5 9C17.5 7.622 18.621 6.5 20 6.5Z" fill="#8A42FB" />
                                <path d="M20 2C14.486 2 10 6.486 10 12C10 17.514 14.486 22 20 22C25.514 22 30 17.514 30 12C30 6.486 25.513 2 20 2ZM20 21C15.037 21 11 16.962 11 12C11 7.038 15.037 3 20 3C24.963 3 29 7.038 29 12C29 16.962 24.963 21 20 21Z" fill="#8A42FB" />
                            </svg>
                            <hr className="separator__line" />
                        </div>
                        <button className="button--primary button--custom mt-3" type="submit" onClick={handleClick}>
                            Go to profile
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.345 5.63429C15.15 5.43929 14.833 5.43929 14.638 5.63429C14.443 5.82929 14.443 6.14629 14.638 6.34129L19.795 11.4983H3.99805C3.72205 11.4983 3.49805 11.7223 3.49805 11.9983C3.49805 12.2743 3.72205 12.4983 3.99805 12.4983H19.795L14.638 17.6553C14.443 17.8503 14.443 18.1673 14.638 18.3623C14.736 18.4603 14.864 18.5083 14.992 18.5083C15.12 18.5083 15.248 18.4593 15.346 18.3623L21.357 12.3513C21.451 12.2573 21.503 12.1303 21.503 11.9973C21.503 11.8643 21.45 11.7373 21.357 11.6433L15.346 5.63329L15.345 5.63429Z" fill="white" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

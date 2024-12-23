import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const UserForm = ({ type, onSubmit }) => {

    const {store, actions} = useContext(Context)
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: type === "register" ? "" : undefined,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form__form row gap-3">
            <div className="contact-form__field p-0">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contact-form__input"
                />
            </div>
            <div className="contact-form__field p-0">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="contact-form__input"
                />
            </div>
            <button className="button--primary" type="submit">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5363 21.1729C17.3563 21.1729 17.1563 21.1529 16.9463 21.1029C16.9063 21.0929 16.8563 21.0829 16.8163 21.0629L3.10629 15.1829C3.10629 15.1829 3.02629 15.1429 2.98629 15.1229C2.87629 15.0529 2.32629 14.6329 2.32629 13.6329C2.32629 12.6929 2.91629 12.0829 2.98629 12.0129C3.03629 11.9629 3.08629 11.9229 3.14629 11.8929L19.0263 2.85287C19.0263 2.85287 19.1263 2.80287 19.1863 2.78287C19.7863 2.60287 21.0563 2.59287 21.6063 3.85287C21.6663 3.98287 21.6863 4.12287 21.6663 4.26287L19.4863 19.4929C19.4663 19.6029 19.3163 20.3929 18.6263 20.8529C18.3863 21.0129 18.0363 21.1629 17.5363 21.1629V21.1729ZM17.3363 19.6529C17.4863 19.6829 17.6663 19.6929 17.7863 19.6129C17.9263 19.5229 17.9963 19.3229 18.0063 19.2529L20.1363 4.32287C19.9863 4.17287 19.7863 4.19287 19.6763 4.21287L3.99629 13.1229C3.92629 13.2129 3.82629 13.4029 3.82629 13.6229C3.82629 13.7529 3.84629 13.8329 3.86629 13.8729L17.3363 19.6429V19.6529Z" fill="white"/>
                    <path d="M10.0363 22.2029C8.87629 22.2029 8.17629 21.3029 7.93629 20.7829C7.89629 20.6929 7.87629 20.5929 7.87629 20.5029L7.76629 16.6929C7.76629 16.5029 7.82629 16.3129 7.96629 16.1629L19.5263 3.45287C19.8063 3.14287 20.2763 3.12287 20.5863 3.40287C20.8963 3.68287 20.9163 4.15287 20.6363 4.46287L9.27629 16.9529L9.36629 20.2729C9.46629 20.4329 9.69629 20.7029 10.0363 20.7029C10.5563 20.7029 10.7963 20.3229 10.7963 20.3229C10.8163 20.2929 10.8363 20.2629 10.8563 20.2329L12.3763 18.2729C12.6263 17.9429 13.0963 17.8829 13.4263 18.1429C13.7563 18.3929 13.8163 18.8729 13.5563 19.1929L12.0563 21.1129C11.7863 21.5429 11.0963 22.2029 10.0263 22.2029H10.0363Z" fill="white"/>
                </svg>
                {type === "login" ? "Login" : "Register"}
            </button>
        </form>
    )
}
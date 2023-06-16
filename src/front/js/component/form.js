import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom"
const Form = () => {
    const [email, setEmail] = useState("")    
    const [password, setPassword] = useState("")
    const {actions, store} = useContext(Context)

    function sendData(e) {
        e.preventDefault()
        console.log("send data")
        console.log(email, password)
        actions.login(email, password)

        // const requestOptions = {
        //     method: "POST",
        //     headers: {"Content-type": "application/json"},
        //     body: JSON.stringify(
        //        {
        //         "email":email,
        //         "password":password
        //        } 
        //     )
        // };
        // fetch("https://deborahdobles-curly-sniffle-44xr9gxrwjxf7vvw-3001.preview.app.github.dev/api/login", requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    }
    return (
        <>
            <div>
                { store.auth === true ? <Navigate to="/demo"/> :
                    <form className="w-50 mx-auto" onSubmit={sendData}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email Address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-warning">Login</button>
                    </form> 
                }
            </div>
        </>
    )

};

export default Form;
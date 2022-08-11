import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ userid, setUserID }) => {
    const [signIn, setSignIn] = useState({
        username: "",
        password: "",
    });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(signIn);
        e.preventDefault();
        if (signIn.username == "" || signIn.password == "") {
            setMsg("Both fields are required.");
        } else {
            axios({
                method: "post",
                url: "http://localhost:5000/api/authentication/signin",
                data: signIn,
            })
                .then((res) => {
                    console.log(res.data);
                    setUserID(res.data);
                    sessionStorage.setItem("userID", res.data);
                    if (res.status === 200) navigate("./transfer");
                })
                .catch((err) => {
                    console.log(err);
                    setMsg("Invalid combination of username and password.");
                });
        }
    };

    return (
        <>
            <div>
                <h1 className="text-center bg-primary text-white p-2 mb-4">
                    Team Tendies Banking App
                </h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="offset-3 col-sm-6">
                        <div className="col bg-light p-4 border border-success rounded">
                            <h2>Login to your bank account</h2>
                            <div className="form-group">
                                <label htmlFor="userName">username:</label>
                                <input
                                    className="form-control"
                                    value={signIn.userName}
                                    onChange={(e) =>
                                        setSignIn({
                                            ...signIn,
                                            username: e.target.value,
                                        })
                                    }
                                    type="text"
                                    name="username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pwd">Password:</label>
                                <input
                                    value={signIn.password}
                                    type="password"
                                    onChange={(e) =>
                                        setSignIn({
                                            ...signIn,
                                            password: e.target.value,
                                        })
                                    }
                                    className="form-control"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="btn btn-primary mt-2"
                            >
                                Login
                            </button>
                            <div className="alert-danger mt-3">{msg}</div>
                            <div className="bottom-text mt-3">
                                Don't have an account?
                                <Link to="/signup">Sign up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginForm;

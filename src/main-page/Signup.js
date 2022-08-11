import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SignUpForm = ({ userid, setUserID }) => {
    const navigate = useNavigate();
    const REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [userExist, setUserExist] = useState("false");

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            axios({
                method: "post",
                url: `http://localhost:5000/api/authentication/${user}`,
            })
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data) {
                            setUserExist(true);
                            setMsg("That username is already taken.");
                        }
                        if (!res.data) {
                            setUserExist(false);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        if (user == "" || password == "" || confirmPassword == "") {
            setMsg("All fields are required.");
        } else if (password != confirmPassword) {
            setMsg("Your passwords don't match.");
        } else if (!password.match(REGEX)) {
            setMsg("Your password doesn't meet the minimum requirements");
        } else {
            if (!userExist) {
                axios({
                    method: "post",
                    url: "http://localhost:5000/api/authentication/create",
                    data: { username: user, password },
                })
                    .then((res) => {
                        if (res.status === 200) navigate("../deposit");
                        sessionStorage.setItem("userID", res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
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
                            <h2>Sign up for an Account</h2>
                            <form onSubmit={HandleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="userName">Username:</label>
                                    <input
                                        className="form-control"
                                        onChange={(e) =>
                                            setUser(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPwd">
                                        {" "}
                                        Confirm Password:
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <button className="btn btn-primary mt-2">
                                    Sign up
                                </button>
                            </form>
                            <div className="alert-danger mt-3">{msg}</div>
                            <div className="bottom-text mt-3">
                                Already have an account?
                                <Link to="/">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SignUpForm;

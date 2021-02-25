// registration.js
import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            dbError: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        axios
            .post("/registration", this.state)
            .then((response) => {
                // console.log("response from server: ", response);

                if (!response.data.success) {
                    //handle error
                    this.setState({
                        error: true,
                    });
                } else {
                    // if everything goes well redirect the user to "/" route
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log("error in axios post registration: ", err);
            });
    }

    render() {
        return (
            <div className="right-box">
                <div className="reg-box">
                    <h2>Sign up</h2>

                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                    ></input>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                    ></input>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                    ></input>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>
                    <button className="btn" onClick={() => this.handleClick()}>
                        Submit
                    </button>
                    <Link className="link-log" to="/login">
                        Already have an account? Click here to log in
                    </Link>

                    {this.state.error && (
                        <p className="error-msg">
                            Oops something went wrong! Please try again.
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

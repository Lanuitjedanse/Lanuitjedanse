// reset password
import React from "react";
import axios from "./Axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            renderView: 1,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleClick() {
        let route = [
            "none",
            "/password/reset/start",
            "/password/reset/verify",
            "/password/reset/verify",
        ];

        axios
            .post(route[this.state.renderView], this.state)
            .then((response) => {
                // console.log("respon/se from server: ", response);

                if (!response.data.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.setState({
                        error: false,
                        renderView: this.state.renderView === 1 ? 2 : 3,
                    });
                }
            })
            .catch((err) => {
                console.log("error in axios post login: ", err);
            });
    }

    determineView() {
        if (this.state.renderView === 1) {
            return (
                <div className="reg-box">
                    <h2>Reset password</h2>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                        type="email"
                        placeholder="Email"
                    ></input>
                    <button
                        className="btn white"
                        onClick={() => this.handleClick()}
                    >
                        Reset Password
                    </button>
                </div>
            );
        } else if (this.state.renderView === 2) {
            return (
                <div className="reg-box">
                    <h2 className="reset-title">Reset password</h2>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        type="text"
                        key={1}
                        placeholder="Code"
                    ></input>
                    <input
                        className="reg-field"
                        onChange={(e) => this.handleChange(e)}
                        name="password"
                        type="password"
                        placeholder="Password"
                    ></input>
                    <button
                        className="btn white"
                        onClick={() => this.handleClick()}
                    >
                        Confirm
                    </button>
                </div>
            );
        } else if (this.state.renderView === 3) {
            return (
                <div className="reg-box">
                    <h2 className="reset-title">
                        Yay your password was updated!
                    </h2>
                    <Link className="link-log" to="/login">
                        You can now log in with your new password!{" "}
                    </Link>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="right-box">
                {this.determineView()}
                {this.state.error && (
                    <p className="error-msg">Oops something went wrong.</p>
                )}
            </div>
        );
    }
}

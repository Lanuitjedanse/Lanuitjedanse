import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Logo from "./logo";

import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <div className="super-container">
            <div className="welcome-box">
                <Logo className="logo-welcome" />
                <h1 className="brand-title">Lanuitjedanse</h1>
                <p className="reg-text">
                    Find a bar or a club that plays the music you like!
                </p>
            </div>
            <HashRouter>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/password/reset/start" component={ResetPassword} />
            </HashRouter>
        </div>
    );
}

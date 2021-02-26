import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <>
            <NavLink exact to="/profile" activeClassName="active">
                <p>Profile</p>
            </NavLink>
            <NavLink to="/map" activeClassName="active">
                <p>Map</p>
            </NavLink>
            <NavLink to="/feed" activeClassName="active">
                <p>Feed</p>
            </NavLink>

            <a href="/logout">Logout</a>
        </>
    );
}

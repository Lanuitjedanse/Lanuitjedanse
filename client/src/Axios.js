import axios from "axios";

let instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
});

export default instance;

import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./Logo";
import App from "./app";

//added these during encounter
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
// import { init } from "./Socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

// const elem = location.pathname ? <Welcome/> : <Logo/>;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    // init(store);
    // elem = <App />;
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));

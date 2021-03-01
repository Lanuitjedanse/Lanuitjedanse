import { sendComment, showComments, showNewComments } from "./actions";

import { io } from "socket.io-client";

// const socket = io.connect;
// socket.on("hello", (data) => {
//     console.log("data: ", data);
// });

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("sendComment", (barId, msgs) =>
            store.dispatch(sendComment(barId, msgs))
        );

        socket.on("showComments", (msg) => store.dispatch(showComments(msg)));

        socket.on("showNewComments", (lastMessage) =>
            store.dispatch(showNewComments(lastMessage))
        );
    }
};

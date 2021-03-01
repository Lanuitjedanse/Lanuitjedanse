import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { socket } from "./socket";

export default function Comments(props) {
    const textRef = useRef("");
    const scrollRef = useRef();

    // const allComments = useSelector((state) => state.comments);
    // console.log("comments: ", allComments);

    const commentsPerPost = useSelector(
        (state) =>
            state.comments &&
            state.comments.filter((comment) => comment.bar_id == props.barId)
    );

    // console.log("commentsPerpost: ", commentsPerPost);
    // console.log("props.barId: ", props.barId);
    // console.log("");

    const scrollToBottom = () => {
        scrollRef.current.scrollTop =
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
    };

    // const user = useSelector((state) => state.cookie);
    // console.log("user: ", user);

    useEffect(() => {
        scrollToBottom();
    });

    const messageHandleChange = (e) => {
        textRef.current.value = e.target.value;
    };

    const enterComment = (e) => {
        console.log("e: ", e);
        if (e.keyCode === 13) {
            e.preventDefault();
            enterComment();
        }
    };

    const newComment = () => {
        if (textRef.current.value != 0) {
            socket.emit("sendComment", {
                bardId: props.barId,
                text: textRef.current.value,
            });
            textRef.current.value = "";
        }
    };

    return (
        <div className="comments">
            <h2>Chat</h2>
            <div className="previous-messages" ref={scrollRef}>
                {commentsPerPost &&
                    commentsPerPost.map((msg) => (
                        <div
                            className={
                                props.id === msg.user_id
                                    ? "chat-msg-box-purple"
                                    : "chat-msg-box-pink"
                            }
                            key={msg.id}
                        >
                            <div className="user-comment-box">
                                <img
                                    className="user-pic"
                                    src={msg.image || "/avatar.jpg"}
                                />

                                <p>
                                    {msg.first} {msg.last} on{" "}
                                    {msg.created_at
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                    :
                                </p>
                            </div>
                            <p>{msg.comment}</p>
                        </div>
                    ))}
            </div>

            <textarea
                ref={textRef}
                name="message"
                onKeyDown={(e) => enterComment(e)}
                placeholder="Type your message"
                onChange={(e) => messageHandleChange(e)}
            ></textarea>
            <button className="btn-purple" onClick={() => newComment()}>
                Send
            </button>
        </div>
    );
}

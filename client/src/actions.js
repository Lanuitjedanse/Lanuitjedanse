import axios from "./Axios";

let musicTaste = [
    "Electronic music",
    "Hip Hop",
    "Jazz",
    "Rock",
    "Pop",
    "Reggae",
];

export async function receiveMusicTaste() {
    // const { data } = await axios.get(`/friends-wannabes`);

    // if (data.success) {
    // console.log("data.rows : ", data.rows);

    return {
        type: "SHOW_WANNABES",
        friendsList: data.rows,
        userId: data.userId,
    };
    // }
}

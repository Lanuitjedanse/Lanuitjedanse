import axios from "./Axios";

export async function receiveGenres() {
    const { data } = await axios.get("/music-genres-pref");
    console.log("data music genre: ", data.musicGenres);
    return {
        type: "RECEIVE_GENRES",
        musicGenres: data.musicGenres,
    };
}

export async function likeGenre(id) {
    const { data } = await axios.post(`/like/${id}`);
    console.log(("data: ", data));

    if (data.success) {
        return {
            type: "ADD_LIKE",
            genreId: id,
        };
    }
}

export async function noLikeGenre(id) {
    const { data } = await axios.post(`/no-like/${id}`);
    console.log("data: ", data);

    if (data.success) {
        return {
            type: "ADD_NO_LIKE",
            genreId: id,
        };
    }
}

export async function showAllBars() {
    const { data } = await axios.get("/api/all-bars");
    console.log("data.rows: ", data.rows);

    return {
        type: "SHOW_ALL_BARS",
        allBars: data.rows,
    };
}

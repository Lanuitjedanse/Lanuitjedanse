import axios from "./Axios";

export async function receiveGenres() {
    const { data } = await axios.get("/music-genres-pref");
    // console.log("data music genre: ", data.musicGenres);
    return {
        type: "RECEIVE_GENRES",
        musicGenres: data.musicGenres,
    };
}

export async function musicTasteUser() {
    const { data } = await axios.get("/music-taste");
    // console.log("data music genre: ", data.musicTaste);
    return {
        type: "RECEIVE_PREF_USER",
        musicTaste: data.musicTaste,
    };
}

export async function likeGenre(genre) {
    const { data } = await axios.post(`/like/${genre}`);
    // console.log(("data: ", data));

    if (data.success) {
        return {
            type: "ADD_LIKE",
            genreId: genre,
        };
    }
}

export async function dislikeGenre(genre) {
    const { data } = await axios.post(`/dislike/${genre}`);
    // console.log("data: ", data);

    if (data.success) {
        return {
            type: "ADD_NO_LIKE",
            genreId: genre,
        };
    }
}

export async function showAllBars() {
    const { data } = await axios.get("/api/all-bars");
    // console.log("data.rows: ", data.rows);

    return {
        type: "SHOW_ALL_BARS",
        allBars: data.rows,
    };
}

export async function addBar(newBar) {
    try {
        // console.log("data.rows in addBar: ", data);

        return {
            type: "NEW_BAR",
            newBar,
        };
    } catch (err) {
        console.log("err accepting friend: ", err);
    }
}

/// comments

export function sendComment(comment) {
    // console.log("comment: ", comment);

    return {
        type: "SEND_COMMENT",
        comment,
    };
}

export function showComments(comments) {
    return {
        type: "SHOW_COMMENTS",
        comments,
    };
}

export function showNewComments(newComment) {
    return {
        type: "SHOW_NEW_COMMENT",
        newComment,
    };
}

export function deleteBar(deletedBar) {
    return {
        type: "DELETE_BAR",
        deletedBar,
    };
}
// RATINGS

// export async function receiveRatings(id) {
//     const { data } = await axios.get(`/reviews/${id}`);
//     console.log("id: ", id);
//     console.log("receive ratings: ", data.reviews);
//     return {
//         type: "SHOW_RATINGS",
//         allReviews: data.reviews,
//     };
// }

// export async function addRating(id) {
//     const { data } = await axios.post(`/reviews/${id}`);
//     console.log("add rating: ", data.reviews);
//     return {
//         type: "ADD_RATING",
//         newReview: id,
//     };
// }

export async function myLastBar() {
    const { data } = await axios.get("/api-last-bar");
    // console.log("data.rows in axios all venues: ", data.rows);
    // console.log("data in axios all venues: ", data);
    return {
        type: "LAST_BAR",
        lastBar: data.rowBar,
        creator: data.rowUser,
    };
}

export async function allMyPosts() {
    const { data } = await axios.get("/api/all-my-posts");
    console.log("data.rows in axios all venues: ", data.rows);
    // console.log("data in axios all venues: ", data);
    return {
        type: "SHOW_ALL_MY_POSTS",
        allMyPosts: data.rows,
    };
}

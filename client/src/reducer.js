export default function (state = {}, action) {
    if (action.type == "RECEIVE_GENRES") {
        state = {
            ...state,
            musicGenres: action.musicGenres,
        };
    }

    if (action.type == "RECEIVE_PREF_USER") {
        state = {
            ...state,
            musicTaste: action.musicTaste,
        };
    }
    if (action.type === "ADD_LIKE") {
        state = {
            ...state,
            musicGenres: state.musicGenres.map((music) => {
                if (music.genre === action.genreId) {
                    return {
                        ...music,
                        giveLike: true,
                    };
                } else {
                    return music;
                }
            }),
            musicTaste: state.musicTaste && [
                {
                    ...state.musicTaste[0],
                    [action.genreId]: true,
                },
            ],
        };
    } else if (action.type === "ADD_NO_LIKE") {
        state = {
            ...state,
            musicGenres: state.musicGenres.map((music) => {
                if (music.genre === action.genreId) {
                    return {
                        ...music,
                        giveLike: false,
                    };
                } else {
                    return music;
                }
            }),
            musicTaste: state.musicTaste && [
                {
                    ...state.musicTaste[0],
                    [action.genreId]: false,
                },
            ],
        };
    }

    if (action.type == "SHOW_ALL_BARS") {
        state = {
            ...state,
            allBars: action.allBars,
        };
    }

    if (action.type == "NEW_BAR") {
        state = {
            ...state,
            allBars: [...state.allBars, action.newBar],
        };
    }

    if (action.type === "SHOW_COMMENTS") {
        state = {
            ...state,
            comments: action.comments,
            cookie: action.cookie,
        };
    }
    if (action.type === "SEND_COMMENT") {
        state = {
            ...state,
            comment: action.comment,
        };
    }
    if (action.type === "SHOW_NEW_COMMENT") {
        state = {
            ...state,
            comments: [...state.comments, action.newComment],
        };
    }

    // if (action.type == "SHOW_RATINGS") {
    //     state = {
    //         ...state,
    //         allReviews: action.allReviews,
    //     };
    // }

    // if (action.type === "ADD_RATING") {
    //     state = {
    //         ...state,
    //         allReviews: [...state.allReviews, action.newReview],
    //     };
    // }

    if (action.type === "LAST_BAR") {
        state = {
            ...state,
            lastBar: action.lastBar,
            creator: action.creator,
        };
    }
    if (action.type === "SHOW_ALL_MY_POSTS") {
        state = {
            ...state,
            allMyPosts: action.allMyPosts,
        };
    }

    // if (action.type === "SHOW_ALL_BAR") {
    //     state = {
    //         ...state,
    //         allVenues: state.allVenues.map((venue) => {
    //             if (venue.id === action.id) {
    //                 return {
    //                     ...venue,
    //                 };
    //             } else {
    //                 return venue;
    //             }
    //         }),
    //     };
    // }

    return state;
}

// export function reducer(state = {}, action) {}

//  if (action.type === "SHOW_WANNABES") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: false,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  } else if (action.type === "SHOW_FRIENDS") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: true,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  } else if (action.type === "END_FRIENDSHIP") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: false,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  }
//  return state;

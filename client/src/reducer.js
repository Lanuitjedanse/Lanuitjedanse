export default function (state = {}, action) {
    if (action.type == "RECEIVE_GENRES") {
        state = {
            ...state,
            musicGenres: action.musicGenres,
        };
    }
    if (action.type === "ADD_LIKE") {
        state = {
            ...state,
            musicGenres: state.musicGenres.map((music) => {
                if (music.id === action.genreId) {
                    return {
                        ...music,
                        giveLike: true,
                    };
                } else {
                    return music;
                }
            }),
        };
    } else if (action.type === "ADD_NO_LIKE") {
        state = {
            ...state,
            musicGenres: state.musicGenres.map((music) => {
                if (music.id === action.genreId) {
                    return {
                        ...music,
                        giveLike: false,
                    };
                } else {
                    return music;
                }
            }),
        };
    }

    if (action.type == "SHOW_ALL_BARS") {
        state = {
            ...state,
            allBars: action.allBars,
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

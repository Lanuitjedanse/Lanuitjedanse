import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllBars, receiveGenres } from "./actions";
import Bar from "./bar";
import { Route } from "react-router-dom";

export default function AllBars() {
    const [barPopUpVisible, setBarPopUpVisible] = useState(false);
    const dispatch = useDispatch();

    const genres = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.genre)
    );

    // console.log("genres: ", genres);

    // const filterPerMusic = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((music) => music.genre == genres)
    // );

    const bars = useSelector(
        (state) => state.allBars && state.allBars.filter((bar) => bar.id)
    );

    // const barPerGenre = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == genres.name)
    // );

    // console.log("barPerGenre: ", barPerGenre);
    const showPopUpBar = () => {
        setBarPopUpVisible(!barPopUpVisible);
        console.log("visibility: ", barPopUpVisible);
    };

    // console.log("bars: ", bars);

    useEffect(() => {
        dispatch(showAllBars());
        dispatch(receiveGenres());
    }, []);

    if (!genres || !bars) {
        return null;
    }

    return (
        <>
            <h2 className="all-bars-title">All Bars</h2>
            <div className="bar-container">
                {bars &&
                    bars.map((bar) => (
                        <div className="event-box" key={bar.id}>
                            <h3>{bar.name}</h3>
                            <img
                                className="event-box-img"
                                src={bar.img_bar || "/avatar.jpg"}
                            />
                            <p>
                                Added on{" "}
                                {bar.created_at
                                    .slice(0, 16)
                                    .replace("T", " at ")}
                            </p>
                            <div className="music-genre">
                                <img
                                    className="icon"
                                    src={`/music-white/${bar.music}.svg`}
                                />
                                <p className="capitalize">
                                    {bar.music || "No info"}
                                </p>
                            </div>

                            <Link
                                onClick={showPopUpBar}
                                to={`/all-bars/${bar.id}`}
                            >
                                Show More
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}

//  {
//      barPopUpVisible && (
//          <Route
//              path="/all-bars/:id"
//              render={(props) => (
//                  <Bar
//                      showPopUpBar={showPopUpBar}
//                      key={props.match.url}
//                      match={props.match}
//                      history={props.history}
//                  />
//              )}
//          />
//      );
//  }

//  {
//      bars &&
//          bars.map((bar) => (
//              <label key={bar.key}>
//                  <p>{bar.name}</p>
//              </label>
//          ));
//  }

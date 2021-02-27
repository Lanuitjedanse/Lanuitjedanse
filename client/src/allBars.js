import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAllBars, receiveGenres } from "./actions";

export default function AllBars() {
    const dispatch = useDispatch();

    const genres = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.genre)
    );

    console.log("genres: ", genres);

    // const filterPerMusic = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((music) => music.genre == genres)
    // );

    const bars = useSelector(
        (state) => state.allBars && state.allBars.filter((bar) => bar.id)
    );

    const barPerGenre = useSelector(
        (state) =>
            state.allBars &&
            state.allBars.filter((bar) => bar.music == genres.name)
    );

    console.log("barPerGenre: ", barPerGenre);

    console.log("bars: ", bars);

    useEffect(() => {
        dispatch(showAllBars());
        dispatch(receiveGenres());
    }, []);

    if (!genres || !bars) {
        return null;
    }

    return (
        <>
            <div className="bar-container">
                {bars &&
                    bars.map((bar) => (
                        <Link
                            to={`/show-bar/${bar.id}`}
                            className="event-box"
                            key={bar.id}
                        >
                            <h3>{bar.name}</h3>
                            <img src={bar.img_bar} />
                            <div className="music-genre">
                                <img className="icon" src="/subwoofer.svg" />
                                <p>{bar.music}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
}

//  {
//      bars &&
//          bars.map((bar) => (
//              <label key={bar.key}>
//                  <p>{bar.name}</p>
//              </label>
//          ));
//  }

import { useState, useEffect } from "react";

export default function MusicTaste() {
    const [music, setMusic] = useState("");
    return (
        <>
            <label htmlFor="electronic">Electronic</label>
            <input type="checkbox" id="hiphop" name="hiphop"></input>
            <label htmlFor="house">HipHop</label>
            <input type="checkbox" id="pop" name="pop"></input>
            <label htmlFor="pop">Pop</label>
            <input type="checkbox" id="reggae" name="reggae"></input>
            <label htmlFor="reggae">Reggae</label>
            <input type="checkbox" id="rock" name="rock"></input>
            <label htmlFor="rock">Rock</label>
            <input type="checkbox" id="jazz" name="jazz"></input>
            <label htmlFor="jazz">Jazz</label>
        </>
    );
}

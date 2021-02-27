export default function Logo() {
    let src;

    location.pathname == "/welcome"
        ? (src = "/dance-black.svg")
        : (src = "/dance.svg");

    return <img src={src} />;
}

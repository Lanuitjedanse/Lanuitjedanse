export default function ProfilePic({ first, last, image, size = "small" }) {
    return (
        <img
            src={image || "/avatar.jpg"} // need to change this
            alt={`${first} ${last}`}
            className={`${size} profile-pic`}
        />
    );
}

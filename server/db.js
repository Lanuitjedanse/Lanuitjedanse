const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    // means we are in production on heroku
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUsername, dbPassword } = require("../secrets");
    db = spicedPg(
        `postgres:${dbUsername}:${dbPassword}@localhost:5432/lanuitjedanse`
    );
}

module.exports.insertUserData = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password) 
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};

module.exports.getLoginData = (email) => {
    const q = `SELECT users.email, users.password, users.id FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.insertCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code) 
    VALUES ($1, $2) RETURNING *`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.updatePassword = (email, hashedPw) => {
    const q = `UPDATE users
    SET password = $2
    WHERE email = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};

module.exports.verifyCode = () => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    // const params = [code];
    return db.query(q);
};

module.exports.fetchProfileData = (userId) => {
    const q = `SELECT id, first, last, email, image FROM users WHERE id = $1`;
    const params = [userId];
    return db.query(q, params);
};

/// update profile info

module.exports.updateProfileWithPass = (userId, first, last, email, pass) => {
    const q = `UPDATE users
    SET first = $2, last = $3, email = $4, password = $5
    WHERE id = $1 RETURNING first, last, email`;
    const params = [userId, first, last, email, pass];
    return db.query(q, params);
};

module.exports.updateProfileNoPass = (userId, first, last, email) => {
    const q = `UPDATE users
    SET first = $2, last = $3, email = $4
    WHERE id = $1 RETURNING first, last, email`;
    const params = [userId, first, last, email];
    return db.query(q, params);
};

// update music taste

// module.exports.addMusicTaste = (userId) => {
// const q = `INSERT INTO music_genres (electronic, hiphop, rock, pop, jazz, reggae)
// VALUES ()`
// }

module.exports.uploadPic = (userId, image) => {
    const q = `UPDATE users
    SET image = $2
    WHERE id = $1 RETURNING image`;
    const params = [userId, image];
    return db.query(q, params);
};

module.exports.editMusicTaste = (userId, genres) => {
    const q = `INSERT INTO music_genres (user_id, genres)
    VALUES ($1, $2) RETURNING genres`;
    const params = [userId, genres];
    return db.query(q, params);
};

module.exports.addBar = (userId, name, description, imgBar, music) => {
    const q = `INSERT INTO bars (user_id, name, description, img_bar, music)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const params = [userId, name, description, imgBar, music];
    return db.query(q, params);
};

module.exports.showBar = (id) => {
    const q = `SELECT * FROM bars WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

// module.exports.uploadBarImg = (id, image) => {
//     const q = `UPDATE bars
//     SET image = $2
//     WHERE id = $1 RETURNING image`;
//     const params = [id, image];
//     return db.query(q, params);
// };

//  const q = `INSERT INTO music_genres (user_id, genres)
//     VALUES ($1, $2)
//     ON CONFLICT (user_id)
//     DO UPDATE SET genres = $2 RETURNING genres`;

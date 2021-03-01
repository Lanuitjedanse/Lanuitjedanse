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

// module.exports.likeMusic = (userId, genre) => {
//     const q = `INSERT INTO music (user_id, $2)
//     VALUES ($1, false)
//     ON CONFLICT (user_id)
//     DO UPDATE SET $2 = true RETURNING *`;
//     const params = [userId, genre];
//     return db.query(q, params);
// };

module.exports.likeMusic = (userId, value, genre) => {
    const q = `INSERT INTO music (user_id, ${genre})
    VALUES ($1, $2) 
    ON CONFLICT (user_id)
    DO UPDATE SET ${genre} = $2 RETURNING *`;
    const params = [userId, value];
    return db.query(q, params);
};

module.exports.likeMusic = (userId, value, genre) => {
    const q = `INSERT INTO music (user_id, ${genre})
    VALUES ($1, $2) 
    ON CONFLICT (user_id)
    DO UPDATE SET ${genre} = $2 RETURNING *`;
    const params = [userId, value];
    return db.query(q, params);
};

module.exports.receiveMusicTaste = (userId) => {
    const q = `SELECT * FROM music WHERE user_id = $1`;
    const params = [userId];
    return db.query(q, params);
};

// INSERT INTO music_genres (user_id, genres)
//     VALUES (3, 'electronic, jazz, hiphop')
//     ON CONFLICT (user_id)
//     DO UPDATE SET genres = 'electronic, jazz, disco, house' RETURNING *;

// module.exports.editMusicTaste = (
//     userId,
//     electronic,
//     hiphop,
//     jazz,
//     disco,
//     reggae,
//     pop,
//     rock
// ) => {
//     const q = `INSERT INTO music (user_id, electronic, hiphop, jazz, disco, reggae, pop, rock)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     ON CONFLICT (user_id)
//     DO UPDATE SET electronic = $2, hiphop = $2, jazz = $3 disco = $4
//     reggae = $5 pop = $6 rock =$7`;
//     const params = [userId, electronic, hiphop, jazz, disco, reggae, pop, rock];
//     return db.query(q, params);
// };

// module.exports.editMusicTaste = (userId, genre) => {
//     const q = `INSERT INTO music (user_id, electronic, hiphop, jazz, disco, reggae, pop, rock)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     ON CONFLICT (user_id)
//     DO UPDATE SET electronic = $2, hiphop = $2, jazz = $3 disco = $4
//     reggae = $5 pop = $6 rock =$7`;
//     const params = [userId, genre];
//     return db.query(q, params);
// };

module.exports.addBar = (
    userId,
    name,
    description,
    imgBar,
    lat,
    lng,
    music
) => {
    const q = `INSERT INTO bars (user_id, name, description, img_bar, lat, lng, music)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const params = [userId, name, description, imgBar, lat, lng, music];
    return db.query(q, params);
};

module.exports.addBarNoPic = (userId, name, description, lat, lng, music) => {
    const q = `INSERT INTO bars (user_id, name, description, lat, lng, music)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const params = [userId, name, description, lat, lng, music];
    return db.query(q, params);
};

module.exports.showBar = (id) => {
    const q = `SELECT * FROM bars WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.showAllBars = () => {
    const q = `SELECT * FROM bars ORDER BY id DESC`;
    return db.query(q);
};

module.exports.showThreeLastBars = () => {
    const q = `SELECT * FROM bars ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.addComment = (userId, barId, comment) => {
    const q = `INSERT INTO comments (user_id, bar_id, comment) 
    VALUES ($1, $2, $3) RETURNING *`;
    const params = [userId, barId, comment];
    return db.query(q, params);
};

module.exports.showComments = () => {
    const q = `SELECT comments.user_id, comments.comment, comments.bar_id, comments.created_at, 
    users.first, users.last, users.image, comments.id 
    FROM comments
    JOIN users
    ON user_id = users.id
    ORDER BY comments.id DESC`;

    return db.query(q);
};

module.exports.showLastComments = () => {
    const q = `SELECT comments.user_id, comments.comment, comments.bar_id, comments.created_at, 
    users.first, users.last, users.image, comments.id 
    FROM comments
    JOIN users
    ON user_id = users.id
    ORDER BY comments.id DESC LIMIT 1`;

    return db.query(q);
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

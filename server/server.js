const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const s3 = require("./s3");

const config = require("../config");
const { uploader } = require("./upload");

const server = require("http").Server(app);

const io = require("socket.io")(server, {
    origins: "localhost:3000 https://social-tracklist.herokuapp.com/:*",
});

let cookie_sec;

if (process.env.sessionSecret) {
    //we are in production
    cookie_sec = process.env.sessionSecret;
} else {
    cookie_sec = require("../secrets").sessionSecret;
}

const musicGenres = [
    {
        id: 1,
        genre: "electronic",
        image:
            "https://images.unsplash.com/photo-1520757054960-d60bc90c6d79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    },
    {
        id: 2,
        genre: "hiphop",
        image:
            "https://images.unsplash.com/photo-1589929168117-cd9ec5f27ab7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    },
    {
        id: 3,
        genre: "pop",
        image:
            "https://images.squarespace-cdn.com/content/v1/55f45174e4b0fb5d95b07f39/1590023437168-8267CM30096WYMUZX1WV/ke17ZwdGBToddI8pDm48kBzd96Q5cD5DyEnBQqVFsdx7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UZonbp4IyLSeXtFyJPYv4LCur-pxl2bVoXeHkDCk8e460XfLCQDpnY7FxMb_ifd4GA/Rosalia+by+Zoey+Grossman+for+ELLE+June+July+2020+%289%29.jpg",
    },
    {
        id: 4,
        genre: "rock",
        image:
            "https://images.unsplash.com/photo-1528645602411-bbeb0d69a6de?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    },
    {
        id: 5,
        genre: "jazz",
        image:
            "https://images.unsplash.com/photo-1484712548363-bad7b2ff3878?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=999&q=80",
    },
    {
        id: 6,
        genre: "reggae",
        image:
            "https://images.unsplash.com/photo-1612265314771-2f0a4348a3ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    },
    {
        id: 7,
        genre: "disco",
        image:
            "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    },
];

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: cookie_sec,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    // console.log("socket.request.url: ", socket.request.url);
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.get("/welcome", (req, res) => {
    // console.log("I'm the welcome page");
    if (req.session.userId) {
        // if user is logged in redirect away from /welcome
        res.redirect("/");
    } else {
        // user not logged in so don't redirect
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;

    if (first && last && email && password) {
        try {
            const hashedPw = await hash(password);
            const results = await db.insertUserData(
                first,
                last,
                email,
                hashedPw
            );
            req.session.userId = results.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST registration", err);
            res.json({ success: false });
            //error.message gives only the message from error and not the whole block
            //error.code
        }
    } else {
        res.json({ success: false });
        // please fill out all fields error
    }
});

app.get("/music-genres-pref", (req, res) => {
    // console.log("musicGenres: ", musicGenres);
    res.json({ musicGenres });
});

app.post("/like/:genre", (req, res) => {
    const genre = req.params.genre;
    console.log("genre: ", genre.genre);
    // if (genre) {
    //     genre.giveLike = true;
    // }

    db.likeMusic(req.session.userId, true, genre)
        .then(({ rows }) => {
            console.log("rows in like/:id: ", rows);
            res.json({
                success: true,
                giveLike: true, // either true or false
            });
        })
        .catch((err) => {
            console.log("err in adding like to DB: ", err);
        });
});

app.post("/dislike/:genre", (req, res) => {
    const genre = req.params.genre;
    // if (genre) {
    //     genre.giveLike = false;
    // }

    db.likeMusic(req.session.userId, false, genre)
        .then(({ rows }) => {
            console.log("rows in dislike/:id: ", rows);

            res.json({
                success: true,
                giveLike: false, // either true or false
            });
        })
        .catch((err) => {
            console.log("err in adding like to DB: ", err);
        });
});

app.post("/login", (req, res) => {
    // console.log("I am the post login route");
    const { email, password } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            const hashedPw = rows[0].password;
            console.log("user trying to login");
            console.log("rows: ", rows);

            compare(password, hashedPw)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        req.session.loggedIn = rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("err in compare:", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("there was an error in post login: ", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/start", (req, res) => {
    console.log("I am the /password/reset/start route");
    const { email } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            // console.log("the user exists!");
            // console.log("rows :", rows);
            const emailDB = rows[0].email;
            // console.log("emaildb: ", emailDB);
            // generates a random code
            const secretCode = cryptoRandomString({
                length: 6,
            });
            console.log("secretcode: ", secretCode);
            if (req.body.email === emailDB) {
                db.insertCode(email, secretCode)
                    .then(() => {
                        console.log("rows :", rows);
                        console.log("code was inserted in DB");

                        sendEmail(
                            email,
                            secretCode,
                            "Here is your code to reset your password"
                        )
                            .then(() => {
                                console.log("rows :", rows);
                                console.log("yay");
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(
                                    "error in send email with code",
                                    err
                                );
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "there was an error in inserting the code: ",
                            err
                        );
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("there was an error in password reset: ", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    // console.log("I am the /password/reset/verify route");
    const { code, password } = req.body;

    db.verifyCode(code)
        .then(({ rows }) => {
            const emailCode = rows[0].email;
            // const codeDB = rows[0].code;

            let currentCode = rows.find((row) => {
                return row.code === req.body.code;
            });

            if (currentCode) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePassword(emailCode, hashedPw)
                            .then(() => {
                                // console.log("rows: ", rows);

                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in insert user data", err);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in hashing pass: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("There was an error with verifying code: ", err);
        });
});

app.get("/api/user", (req, res) => {
    // console.log("I'm the user get route");
    // console.log(req.session.userId);
    db.fetchProfileData(req.session.userId)
        .then(({ rows }) => {
            // console.log("getting all user info");
            // console.log("rows", rows[0]);
            res.json({ success: true, rows: rows[0] });
        })
        .catch((err) => {
            console.log("there was an error in fetching user data: ", err);
            res.json({ success: false });
        });
});

app.get("/music-taste", (req, res) => {
    console.log("I am the get music taste route");

    db.receiveMusicTaste(req.session.userId)
        .then(({ rows }) => {
            console.log("Music taste for user received: ", rows);
            res.json({ success: true, musicTaste: rows });
        })
        .catch((err) => {
            console.log(
                "there was an error in getting music genres for user: ",
                err
            );
        });
});

app.post("/music-taste", (req, res) => {
    console.log("I am the post music taste route");
    const { checkedItems } = req.body;

    console.log("genres: ", checkedItems);

    db.editMusicTaste(req.session.userId, checkedItems)
        .then(({ rows }) => {
            console.log("music genre updated!");
            res.json({ success: true, rows: rows });
        })
        .catch((err) => {
            console.log("err in updating music post: ", err);
            res.json({ success: false });
        });
});

app.post("/edit-profile", (req, res) => {
    let { first, last, email, pass } = req.body;
    console.log("first: ", first);
    console.log("last: ", last);
    console.log("email: ", email);
    console.log("password: ", pass);

    if (pass) {
        hash(pass)
            .then((hashedPw) => {
                db.updateProfileWithPass(
                    req.session.userId,
                    first,
                    last,
                    email,
                    hashedPw
                )
                    .then(({ rows }) => {
                        console.log("password was changed!");
                        res.json({ success: true, rows: rows });
                    })
                    .catch((err) => {
                        console.log("err in updating profile with pass: ", err);
                    });
            })
            .catch((err) => {
                console.log("err in hashing pass: ", err);
            });
    } else {
        db.updateProfileNoPass(req.session.userId, first, last, email)
            .then(({ rows }) => {
                console.log("profile updated except password!");
                res.json({ success: true, rows: rows });
            })
            .catch((err) => {
                console.log("err in update profile no pass: ", err);
            });
    }
});

app.post("/profile-pic", uploader.single("file"), s3.upload, (req, res) => {
    console.log("I'm the post route user/profile-pic");
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;
    // const fullUrl = `${userId}/${config.s3Url}${filename}`;

    console.log("req.session.userId: ", req.session.userId);

    if (req.file) {
        db.uploadPic(req.session.userId, fullUrl)
            .then(({ rows }) => {
                res.json({ success: true, rows: rows[0].image });
            })
            .catch((err) => {
                console.log(
                    "there was an error with uploading profile pic: ",
                    err
                );
                res.json({ success: false });
            });
    } else {
        console.log("please add a file!");
        res.json({ success: false });
    }
});

app.post("/create-bar", (req, res) => {
    const { barName, description, music, lat, lng } = req.body;
    // console.log("latLng: ", latLng[0]);
    // const latLngDB = [latLng.lat, latLng.lng];
    // const latLng = [lat, lng];

    db.addBarNoPic(req.session.userId, barName, description, lat, lng, music)
        .then(({ rows }) => {
            console.log("bar without pic was added to DB");
            res.json({ success: true, rows: rows });
        })
        .catch((err) => {
            console.log(
                "there was an error in adding a bar without pic: ",
                err
            );
        });
});

app.post("/create-bar-pic", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;
    const { barName, description, music, lat, lng } = req.body;
    // console.log("latLng: ", latLng[0]);
    // const latLngDB = [latLng.lat, latLng.lng];
    // const latLng = [lat, lng];

    if (req.file) {
        db.addBar(
            req.session.userId,
            barName,
            description,
            fullUrl,
            lat,
            lng,
            music
        )
            .then(({ rows }) => {
                console.log("bar was added to DB with pic");
                res.json({ success: true, rows: rows });
            })
            .catch((err) => {
                console.log(
                    "there was an error in adding a bar wtih pic: ",
                    err
                );
            });
    }
});

app.get("/bar/:id", (req, res) => {
    // console.log("bar dynamic route");

    const { id } = req.params;
    db.showBar(id)
        .then(({ rows }) => {
            // console.log("rows: ", rows);
            res.json({ success: true, rows: rows });
        })
        .catch((err) => {
            console.log("there was an error in bar dynamic route: ", err);
        });
});

app.get("/api/all-bars", (req, res) => {
    // console.log("I am the all bar get route");
    db.showAllBars()
        .then(({ rows }) => {
            // console.log("rows: ", rows);
            res.json({ rows });
        })
        .catch((err) => {
            console.log("err in show all bars: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
    // doesn't matter to put an anchor tag
});

// don't move it
app.get("*", (req, res) => {
    if (!req.session.userId && req.url != "/welcome") {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async (socket) => {
    const { userId } = socket.request.session;

    if (!userId) {
        return socket.disonnect(true);
    }

    socket.on("sendComment", async (text) => {
        try {
            console.log("text: ", text);
            console.log("barId: ");

            await db.addComment(userId, text.bardId, text.text);
            const newComment = await db.showLastComments();
            io.emit("showNewComments", newComment.rows[0]);
        } catch (err) {
            console.log("err in sendComment", err);
        }

        // need to make a db query to retrieve info by userId
    });

    try {
        const comments = await db.showComments();

        io.emit("showComments", comments.rows.reverse());
    } catch (err) {
        console.log("err in showComments", err);
    }

    // need to make a db query to retrieve info by userId
    // });
});

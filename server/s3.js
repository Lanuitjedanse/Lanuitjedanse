const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("../secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "lucie-imageboard",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("amazon upload complete!");
            next();
            fs.unlink(path, () => {}); // this will delete the copy in uploads folder
            // it worked!!!
        })
        .catch((err) => {
            // uh oh
            console.log(err);
        });

    // exports.deleteImage = (filename) => {
    //     s3.deleteObject({
    //         Bucket: "lucie-imageboard",
    //         Key: filename,
    //     })
    //         .promise()
    //         .then((response) => {
    //             console.log("delete successfull:", response);
    //         })
    //         .catch((err) => {
    //             console.log("err deleting image:", err);
    //         });
    // };

    exports.deleteImage = (filename) => {
        // console.log("filename", filename);
        s3.deleteObject({
            Bucket: "lucie-imageboard",
            Key: filename.substr(42),
        })
            .promise()
            .then((response) => {
                console.log("delete successfull:", response);
                next();
            })
            .catch((err) => {
                console.log("err deleting image:", err);
            });
    };
};

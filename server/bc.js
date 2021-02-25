const bcrypt = require("bcryptjs");
let { genSalt, hash, compare } = bcrypt;
const { promisify } = require("util");

// promisified the functions
genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

// let salt; how to get out of scope issues

module.exports.compare = compare;
module.exports.hash = (plainTextPw) =>
    genSalt().then((salt) => hash(plainTextPw, salt));

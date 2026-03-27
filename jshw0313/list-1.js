const fs = require("fs");

let files = fs.readdirSync(__dirname);
console.log(files);

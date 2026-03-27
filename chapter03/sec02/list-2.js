const fs = require("fs");
fs.readdir("./", (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});

fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(files);
});

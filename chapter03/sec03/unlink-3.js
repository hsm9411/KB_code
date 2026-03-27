const fs = require("fs");
if (!fs.existsSync("./text-2.txt")) {
  // 파일이 없다면
  console.log("file does not exist");
} else {
  // 파일이 있다면
  fs.unlinkSync("./text-2.txt", (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("file deleted");
  });
}

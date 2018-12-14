const fs = require("fs");
const path = require("path");
const dir = "backups";

module.exports = (req, res, next) => {
  checkDir(dir);
  const src = "db.json";
  const dest = path.join(dir, `essays${Date.now()}.json`);
  fs.copyFile(src, dest, err => {
    if (err) return next("error");
    console.log(`backup complete`);
  });
  next();
};

function checkDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

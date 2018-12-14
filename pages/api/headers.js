module.exports = (req, res, next) => {
  res.header("Content-Type", "text/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
};

import express from "express";
const ehe = () => {
  const app = express();
  const port = 3000;
  app.use(express.static(__dirname() + "/leaderboard/public"));
  app.get("/db", (req, res) => {
    res.json(db);
  });
  app.get("/", (req, res) => {
    res.sendFile(__dirname() + "/leaderboard/views/home.html");
    // res.sendFile("./views/index.js");
  });
  app.get("/leaderboard", (req, res) => {
    res.sendFile(__dirname() + "/leaderboard/views/home.html");
    // res.sendFile("./views/index.js");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
export { ehe };

// Dependencies
const express = require("express");
const path = require("path");

// Friend JSON
const friendData = require("./app/data/friends");

// Sets up the Express App
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.post("/api/friends", function(req, res) {
  const submittedScores = [
    parseInt(req.body.q1),
    parseInt(req.body.q2),
    parseInt(req.body.q3),
    parseInt(req.body.q4),
    parseInt(req.body.q5),
    parseInt(req.body.q6),
    parseInt(req.body.q7),
    parseInt(req.body.q8),
    parseInt(req.body.q9),
    parseInt(req.body.q10)
  ];

  let diffs = [];

  friendData.forEach(function (person) {
    const diff = {
      name: person.name,
      photo: person.photo,
      scores: []
    };

    person.scores.forEach(function (score, index) {
      diff.scores.push(Math.abs(score - submittedScores[index]));
    });

    diff.score = diff.scores.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    });

    diffs.push(diff);
  });

  diffs = diffs.sort(function (a, b) {
    return a.score - b.score;
  });

  res.json(diffs[0]);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
})

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
})

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
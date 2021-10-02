const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "..",
  "input",
  "question-3",
  "main.csv"
);

try {
  const [header, ...data] = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((ele) => ele.split(","));

  const redCardIndex = header.indexOf("Red Cards");
  const yellowCardIndex = header.indexOf("Yellow Cards");

  data.sort((a, b) => {
    if (a[redCardIndex] === b[redCardIndex]) {
      return b[yellowCardIndex] - a[yellowCardIndex];
    }
    return b[redCardIndex] - a[redCardIndex];
  });

  const newdata = data.map((e) => [e[0], e[yellowCardIndex], e[redCardIndex]]);

  const csvdata =
    header[0] +
    "," +
    header[yellowCardIndex] +
    "," +
    header[redCardIndex] +
    "\n" +
    newdata.map((ele) => ele.join(",")).join("\n");

  const answerPath = path.join(__dirname, "answer-3.csv");

  fs.writeFileSync(answerPath, csvdata);
} catch (err) {
  console.error(err);
}

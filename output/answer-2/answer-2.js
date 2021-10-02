const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "..",
  "input",
  "question-2",
  "main.csv"
);

try {
  const [header, ...data] = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((ele) => ele.split(","));

  const occupation = Array.from(new Set(data.map((ele) => ele[3]))).sort();
  let dataobj = {};
  occupation.forEach((ele) => (dataobj[ele] = []));

  data.forEach((ele) => {
    let name = ele[3];
    dataobj = {
      ...dataobj,
      [name]: [...dataobj[name], ele[1]],
    };
  });

  const newdata = Object.values(dataobj).map((ele, index) => [
    occupation[index],
    Math.min(...ele),
    Math.max(...ele),
  ]);

  const csvdata =
    "occupation,min,max" +
    "\n" +
    newdata.map((ele) => ele.join(",")).join("\n");

  const answerPath = path.join(__dirname, "answer-2.csv");

  fs.writeFileSync(answerPath, csvdata);
} catch (err) {
  console.error(err);
}

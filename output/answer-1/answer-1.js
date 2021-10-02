const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "..",
  "input",
  "question-1",
  "main.csv"
);

try {
  const [header, ...data] = fs
    .readFileSync(filePath, "utf8")
    .split("\n")
    .map((ele) => ele.split(","));

  let newdata = [];
  for (let i = 0; i < Math.ceil(data.length / 10); i++) {
    let arr = [];
    data.forEach((ele, index) => {
      //   ele.splice(2, 1);
      if (index === i * 10) {
        arr = ele.map((ele) => parseInt(ele));
      }
      if (Math.floor(index / 10) === i && !(index === i * 10)) {
        arr[1] = parseInt(ele[1]);
        arr[2] += parseInt(ele[2]);
        arr[3] += parseInt(ele[3]);
        arr[4] += parseInt(ele[4]);
        arr[5] += parseInt(ele[5]);
        arr[6] += parseInt(ele[6]);
        arr[7] += parseInt(ele[7]);
        arr[8] += parseInt(ele[8]);
        arr[9] += parseInt(ele[9]);
        arr[10] += parseInt(ele[10]);
      }
    });
    newdata.push(arr);
  }
  header.splice(2, 1);
  newdata.map((ele) => ele.splice(2, 1));
  const csvdata =
    header.join(",") + "\n" + newdata.map((ele) => ele.join(",")).join("\n");

  const answerPath = path.join(__dirname, "answer-1.csv");

  fs.writeFileSync(answerPath, csvdata);
} catch (err) {
  console.error(err);
}

const fs = require("fs");

// SYNCHRONOUS  way to read and write the file

// reading the text content form the file using sync function
const textIn = fs.readFileSync("./txt/input.txt", "UTF-8");
console.log(textIn);

// writing to a file

const textOut = `This is what we all know about avocado : ${textIn}\n.Created at ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File has been written !");

//////////
// ASYNCHRONOUS way to read and write the file

fs.readFile("./txt/start.txt", "UTF-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "UTF-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "UTF-8", (err, data3) => {
      console.log(data3);

      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}\n`,
        "UTF-8",
        (err) => {
          console.log("Your file has been written.\n");
        }
      );
    });
  });
});

console.log("will read file!");

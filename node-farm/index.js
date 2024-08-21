const fs = require("fs"); // used to read and write the data in a file system
const http = require("http");
const path = require("path");
const url = require("url");

/////////////
// FILE SYSTEM
//// SYNCHRONOUS  way to read and write the file
// // reading the text content form the file using sync function
// const textIn = fs.readFileSync("./txt/input.txt", "UTF-8");
// console.log(textIn);

// // writing to a file

// const textOut = `This is what we all know about avocado : ${textIn}\n.Created at ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File has been written !");

////////////
//ASYNCHRONOUS way to read and write the file

// fs.readFile("./txt/start.txt", "UTF-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "UTF-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "UTF-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}\n`,
//         "UTF-8",
//         (err) => {
//           console.log("Your file has been written.\n");
//         }
//       );
//     });
//   });
// });

// console.log("will read file!");

/////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview")
    res.end("It's a overview route name ");
  else if (pathName === "/product") res.end("It's product route name");
  else if (pathName === "/api") {
    res.writeHead(200, { "context-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "context-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request from the port 8000");
});

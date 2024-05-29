const fs = require("fs"); // module to read and write the files
const https = require("http");

/////////////////////////////////////////////////////
// FILES

// // // blocking ,  READING AND WRITING THE FILES IN SYNCHROUNS WAY
// // const textIn = fs.readFileSync("./txt/input.txt", "UTF-8");
// // console.log(textIn);

// // const textOut = `This is what we all know about avocado :${textIn}.\nCreated on ${Date.now()}`;
// // fs.writeFileSync("./txt/output.txt", textOut);
// // console.log("File written!");

// // non-blocking, READING AND WRITING THE FILES IN ASYNCHROUNS WAY
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR 💥");
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     if (err) return console.log("ERROR 💥");
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       if (err) return console.log("ERROR 💥");
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("your file has been written");
//       });
//     });
//   });
// });

// console.log("will read file!"); // this gets consoled first

/////////////////////////////////////////////////////
// SERVER
const server = https.createServer((req, res) => {
  res.end("Hello from server end!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

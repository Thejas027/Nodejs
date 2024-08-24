const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // SOLUTION1
  // fs.readFile("./test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //////
  // SOLUTION2 (using streams)
  // const fileStream = fs.createReadStream("./test-file.txt");
  // fileStream.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // fileStream.on("end", () => {
  //   res.end();
  // });
  // fileStream.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });
  /////////
  // SOLUTION3 (using pipe)
  const fileStream = fs.createReadStream("./test-file.txt");
  fileStream.pipe(res);

  fileStream.on("error", (err) => {
    console.error(err);
    res.statusCode = 500;
    res.end("File not found");
  });
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Server is running on port 8080");
});

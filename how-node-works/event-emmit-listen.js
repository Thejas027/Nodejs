const http = require("http");
const EventEmitter = require("events");
// const myEmitter = new EventEmitter();

class sales extends EventEmitter {
  constructor() {
    super();
    //   this.stock = 10;
  }
}

const myEmitter = new sales();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Thejas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in the stock`);
});

myEmitter.emit("newSale", 9); // trigger the event

//////////////////////

// creating a small webserver and listen to a event



const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (res, req) => {
  res.end("Another Request received");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});

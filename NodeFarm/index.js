const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

// Template calls
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-cart.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// JSON File
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// creating a server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "context-type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CART%}", cardHtml);

    res.end(output);
  }

  // PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, { "context-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  //API
  else if (pathname === "/api") {
    res.writeHead(200, { "context-type": "application/json" });
    res.end(data);
  }

  //Page not found
  else {
    res.writeHead(404, {
      "context-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

// //listening to a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request from the port 8000");
});

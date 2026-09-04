const http = require("http");
const fs = require("fs").promises;

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return data;
  } catch (error) {
    console.log(`Error open the page: ${error.message}`);
    return null;
  }
};

const server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);

  let path = "./views/";
  let status = 200
  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    case "/contact-me":
      path += "contact-me.html";
      break;
    default:
      path += "404.html";
      status = 404
      break;
  }

  res.setHeader("Content-Type", "text/html");
  res.statusCode = status

  const htmlContent = await readFile(path);

  res.end(htmlContent);
});

server.listen(3000, "localhost", () => {
  console.log("Server listen on port 3000");
});

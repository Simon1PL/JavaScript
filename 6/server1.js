var http = require("http");
var fs = require("fs");
const file = 'form.html';
var urlModule = require('url');

http.createServer(async function (request, response) {
  console.log("--------------------------------------");
  console.log("The relative URL of the current request: " + request.url + "\n");
  var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
  //Compare the relative URL
  switch (url.pathname) {

    // if relative URL is '/' then send, to a browser,
    // the contents of a file (an HTML document) - its name contains the 'file' variable
    case '/':
      fs.stat(file, function (err, stats) {
        if (err == null) { // If the file exists
          fs.readFile(file, function (err, data) { // Read it content
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);   // Send the content to the web browser
            response.end();
          });
        }
        else { // If the file does not exists
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write(`The '${file}'file does not exist`);
          response.end();
        } //else
      }); //fs.stat
      break;

    // Process the form content if relative URL is '/submit'
    case '/submit':
        var name = "";
      if(request.method === 'POST') {

      body = '';
      request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        await new Promise( function ( resolve , reject ) {
        request.on('end', () => {
            name = JSON.parse(body).imie;
            resolve();
        });
    });
      } 
    else {
      name = url.searchParams.get('imie');
      console.log(name);
    }
      var welcome = "Witaj "+name;
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.write(welcome); // Data (response) that we want to send to the web browser
      response.end(); // Sending the answer
      console.log("The server sent the '" + welcome + "' text to the browser");
      break;
    // Other cases

  } //switch
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To stop the server, press 'CTRL + C'");
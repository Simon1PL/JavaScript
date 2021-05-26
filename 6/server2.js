var fs = require("fs");
function onRequest_8080(request, response) {
    const file = 'form8080.html';
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
  }
  
  function onRequest_8081(request, response) {
    const file = 'form8081.html';
    var doc = `\<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <root>
        <span id=\"date\">${new Date().toDateString()}</span>
        <span id=\"time\">${new Date().toTimeString()}</span>
    </root>`;
    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        "Content-Type": "text/xml; charset=utf-8"
      };
    response.writeHead(200, headers);
    response.write(doc);   // Send the content to the web browser
    response.end();
  }
  
  /* ************************************************** */
  /* Main block
  /* ************************************************** */
  var http = require('http');
  
  http.createServer(onRequest_8080).listen(8080);
  http.createServer(onRequest_8081).listen(8081);
  console.log("The server was started on port 8080 and 8081");
  console.log("To stop the server, press 'CTRL + C'");
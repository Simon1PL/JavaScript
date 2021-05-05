/**
	 * Handles incoming requests.
	 *
	 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
	 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
	 * The answer sent by this stream must consist of two parts: the header and the body.
	 * <ul>
	 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
	 *  <li>The body contains the correct data, e.g. a form definition.
	 * </ul>
	*/
    const fs = require('fs');
    const mime = require('mime-types');
    function check(pathAll, response) {
        for (path of pathAll.split(', ')) {
            var result = "dsf";
            if (mime.lookup(path)=='text/html') {
                // console.log("html");

            }
            else if (mime.lookup(path)==false) {
                // console.log("directory");
            }
            else {
                console.log("bad type " + mime.lookup(path));
                result = "bad file type ";
                response.write(result);
                console.log("Sending the response");
                response.end(); // The end of the response — send it to the browser
                return;
            }
            if (!path) {
                result = "Wrong path";
                response.write(result);
                console.log("Sending the response");
                response.end(); // The end of the response — send it to the browser
                return;
            }
            else {
                fs.exists(path, (res)=>{
                    if (!res) {
                        result = "It's nothing.";
                        response.write(result);
                        console.log("Sending the response");
                        response.end(); // The end of the response — send it to the browser
                        return;
                    }
                    else {
                        fs.lstat(path, (err, stats) => {
                            if(err) {
                                response.write("error");
                                console.log("Sending the response");
                                response.end(); // The end of the response — send it to the browser
                                return console.log(err); //Handle error
                            }
                            if(stats.isDirectory()) {
                                result = "It is a directory.";
                                result += "<table>";
                                fs.readdir(path, function (err, files) {
                                    //handling error
                                    if (err) {
                                        return console.log('Unable to scan directory: ' + err);
                                    } 
                                    //listing all files using forEach
                                    files.forEach(function (file) {
                                        // Do whatever you want to do with the file
                                        result+= "<tr> <td>"+ file +" </td> </tr>"; 
                                    });
                                    result+= "</table>"
                                    response.write(result);
                                    console.log("Sending the response");
                                    response.end(); // The end of the response — send it to the browser
                                    return;
                                });
                                
                            }
                            if(stats.isFile()) {
                                fs.readFile(path, 'utf8', (err, res) => {
                                    result = "It is a file" + res;
                                    response.write(result);
                                    console.log("Sending the response");
                                    response.end(); // The end of the response — send it to the browser
                                    return;
                                });
                            }
                        });
                    }
                })
            }
        }
    }

    function requestListener(request, response) {
        console.log("--------------------------------------");
        console.log("The relative URL of the current request: " + request.url + "\n");
        var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
        if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
            /* ************************************************** */
            console.log("Creating a response header");
            // Creating an answer header — we inform the browser that the body of the answer will be plain text
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            /* ************************************************** */
            console.log("Creating a response body");
            if (request.method == 'GET') // If the GET method was used to send data to the server 
            {
                // Place given data (here: 'Hello <name>') in the body of the answer
                    check(url.searchParams.get('name'), response);
                 // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
            }
                
            else // If other method was used to send data to the server
                response.write(`This application does not support the ${request.method} method`);
            /* ************************************************** */
            
        }
        else { // Generating the form
            /* ************************************************** */
            console.log("Creating a response header")
            // Creating a response header — we inform the browser that the body of the response will be HTML text
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            /* ************************************************** */
            console.log("Creating a response body");
            // and now we put an HTML form in the body of the answer
            response.write(`<form method="GET" action="/submit">
                                <label for="name">Give your name</label>
                                <input name="name">
                                <br>
                                <input type="submit">
                                <input type="reset">
                            </form>`);
            /* ************************************************** */
            console.log("Sending the response");
            response.end();  // The end of the response — send it to the browser
        }
    }
    
    /* ************************************************** */
    /* Main block
    /* ************************************************** */
    var http = require("http");
    
    var server = http.createServer(requestListener); // The 'requestListener' function is defined above
    server.listen(8080);
    console.log("The server was started on port 8080");
    console.log("To end the server, press 'CTRL + C'"); 
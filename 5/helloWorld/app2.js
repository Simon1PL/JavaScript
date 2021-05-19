// Application using the 'Pug' template system
var express = require('express'),
    logger = require('morgan');
const fs = require('fs');
var app = express();
var x = 1;
var y = 2;

// Configuring the application
app.set('views', __dirname + '/views'); // Files with views can be found in the 'views' directory
app.set('view engine', 'pug');          // Use the 'Pug' template system

// Determining the contents of the middleware stack
app.use(logger('dev'));                         // Add an HTTP request recorder to the stack — every request will be logged in the console in the 'dev' format
// app.use(express.static(__dirname + '/public')); // Place the built-in middleware 'express.static' — static content (files .css, .js, .jpg, etc.) will be provided from the 'public' directory

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:user@cluster0.f2fvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Route definitions
app.get('/', function (req, res) {      // The first route
    res.render('index', {pretty:true, x:x, y:y}); // Render the 'index' view in 'pretty' mode — the resulting HTML code will be indented — the 'pretty' option has the 'deprecated' status — in the future it will not be supported
    //res.render('index '); // Render the 'index' view; because the 'pretty' mode is, by default, turned off so the resulting HTML will be without indentation
});

app.get('/json/:name', (req, res) => {
    fs.readFile(req.params.name, (err, data) => {
        if (err) throw err;
        res.render('operations', {pretty:true, operations: JSON.parse(data).array});
    });
});

app.get('/calculate/:operation/:x/:y', function (req, res) { 
    var myobj = {operation:req.params.operation, x:req.params.x, y:req.params.y};
    res.render('operations', {pretty:true, operations: [myobj]});
    // Use connect method to connect to the server
    client.connect(err => {
        const collection = client.db("test").collection("operations");
        collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
          });
        // perform actions on the collection object
      });
});

app.get('/result', async function (req, res) { 
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // Use connect method to connect to the server
    var operations = [];
    client.connect(async err => {
        const collection = client.db("test").collection("operations");
        operations= await collection.find({}).toArray();
        res.render('operations', {pretty:true, operations: operations});
      });
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
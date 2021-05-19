var express = require('express');
const fs = require('fs');
var app = express();
app.set('views', __dirname + '/views'); 
app.set('view engine', 'pug');
const https = require("https");
const http = require("http");
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:user@cluster0.f2fvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var ids = [402, 4011, 400, 10447, 10121, 10123, 11303];
var adres = ["Bulwarowa", "Bujaka", "Krasińskiego", "Wadów", "Dietla", "Złoty Róg", "Swoszowice"];

app.get('/', function (req, res) {  
    client.connect(async err => {
        const collection = client.db("test").collection("pogoda");
        var result1= await collection.find({}).toArray();
        console.log(result1);
        res.render('index', {x: 1, y:2});
      });
});

app.get('/getData', function (req, result) {
    client.connect(err => {
        client.db("test").dropCollection("pogoda");
    });
    for (var a of ids) {
        idStacji = a;
        const url = "http://api.gios.gov.pl/pjp-api/rest/station/sensors/" +idStacji;
        http.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end",async () => {
                body = JSON.parse(body);
                var danePomiarowe = [];
                for (var i of body) {
                    id=i.id;
                    await new Promise((resolve, reject) => {
                        http.get("http://api.gios.gov.pl/pjp-api/rest/data/getData/" + id, res => {
                            res.setEncoding("utf8");
                            let body = "";
                            res.on("data", data => {
                                body += data;
                            });
                            res.on("end", () => {
                                body = JSON.parse(body);
                                danePomiarowe.push(body.key);
                                resolve();
                            });
                        });
                    });
                }
                var myobj = {danePomiarowe: danePomiarowe, idStacji:idStacji};
                console.log(myobj);
                client.connect(err => {
                    const collection = client.db("test").collection("pogoda");
                    collection.insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        });
                    });
            }); 
        });
}
});

app.listen(3000, function () {
    console.log('The application is available on port 3000');
});
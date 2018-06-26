
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

//const canvasModule = require('canvas');
const yaml = require('js-yaml');
const D3Node = require('d3-node')
const draw = require('../src/dld4e/dld4e-draw.js');

app.post('/', function (req, res) {

    console.log('Received request');

    const options = { selector: '#svg', container: '<div id="container"><div id="svg"></div></div>' }
    const d3n = new D3Node(options) // initializes D3 with container element
    const d3 = d3n.d3
    
    //const canvas = d3n.createCanvas(960, 500);
    //const context = canvas.getContext('2d');
    
    
    //load incoming yaml
    var doc = yaml.load(req.rawBody);

    // draw on your canvas
    draw.draw(doc, d3n);

    res.setHeader("content-type", "image/svg+xml");
    res.send(d3n.svgString())
    // output canvas to png
    // https://github.com/d3-node/d3-node
    //res.setHeader("content-type", "image/png");
    //canvas.pngStream().pipe(res);
});

//https://stackoverflow.com/questions/18710225/node-js-get-raw-request-body-using-express
app.use(function (req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });

    req.on('end', function () {
        next();
    });
});

app.use(bodyParser.raw());

app.listen(3030, function () {
    console.log('Dld4e app listening on port 3030!');
});
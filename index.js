const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const constants = require('./constant');

// body parser middle
app.use(bodyParser.urlencoded({extended: false}));

// api function
function callStockAPI(name, cb) {
  request(constants.stockUrl(name, constants.apiKey),{ json:true }, (err, res, body) => {
    if(err) return console.log(err);
    if(res.statusCode === 200) {
        request(constants.companyLogoUrl(name, constants.apiKey), (err, res, logo) => {
            if(err) return console.log(err);
            if(res.statusCode === 200) {
                logoUrl = logo.substring(8,logo.length-2);
                cb(body, logoUrl);
            }
        })
    }
  })
}


// set handlebars middleware
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars");

// set handlebar routes
app.get('/', function(req, res) {
    callStockAPI('aapl' , (stockData, logoUrl) => {
        res.render('home', {
            stock: stockData,
            logoUrl
        });
    });
});

app.post('/', function(req, res) {
    callStockAPI(req.body.stockTicker, (stockData,logoUrl) => {
        res.render('home', {
            stock: stockData,
            logoUrl,
            query: req.body.stockTicker
        });
    });
});

app.get("/cc", (req, res) => res.render('cc'))


// set static folder
app.use(express.static(path.join(__dirname, "public")));



const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listen on port ', PORT));
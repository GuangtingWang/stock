const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set("view engine", "handlebars");

// set handlebar routes
app.get('/', function(req, res){
    res.render('home', {
        stuff: "This is stuff"
    });
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));



const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log('Listen on port ', PORT));
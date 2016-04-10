var express = require('express');

var app = express();

app.use(express.static('../Thrimbletrimmer/')); //Serve parent directory

//Set Default Page.
app.get('/', function (req, res) {
    res.sendFile('Thrimbletrimmer.html', { root: __dirname + '/../Thrimbletrimmer' } );
});

app.listen(80)
console.log('Server running at http://localhost');
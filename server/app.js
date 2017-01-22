var express = require('express');
var app = express();
var routes  = require('./routes');

var port = process.env.PORT || 3000;

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});


app.use(function(err, req, res, next) {
    if (!err) return next();
    console.log(err.stack);
    res.json({
        error: true
    });
});

app.get('/', routes.index);
app.get('/all', routes.all);
app.get('/addSample/:numSamples', routes.addSample);

app.post('/todaysOutfit', routes.todaysOutfit);
app.post('/addClothes', routes.addClothes);

app.listen(port);
console.log('Magic happens on port '+port);
exports = module.exports = app;

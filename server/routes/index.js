
var firebase = require('firebase');
var serverApp = firebase.initializeApp({
  serviceAccount: "routes/hackucsc2017.json",
  databaseURL: "https://connect-668f9.firebaseio.com"
});

exports.index = function(req, res) {
  res.json({
    status: 'we are in business'
  });
};

exports.all = function(req, res) {
  
};

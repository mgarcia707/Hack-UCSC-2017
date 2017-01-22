
var firebase = require('firebase');
var serverApp = firebase.initializeApp({
  serviceAccount: "routes/hackucsc2017.json",
  databaseURL: "https://hackucsc2016-a33ef.firebaseio.com/"
});

var database = serverApp.database();

var colors = ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'];
var type = ['hat', 'shirt', 'pants', 'shoes'];
var whenSources = {
  lightSource: ['sun', 'moon'],
  lighting: ['dark', 'light'],
  timeOfDay: ['morning', 'afternoon', 'evening']
};

exports.index = function(req, res) {
  res.json({
    status: 'we are in business'
  });
};

exports.all = function(req, res) {
  firebase.database().ref('/').once('value').then(function(snapshot) {
    res.json({
      values: snapshot.val()
    });
  });
};

exports.addSample = function(req, res) {
  var numSamples = req.params.numSamples;


  for (var i = 0; i < numSamples; i++) {
    var key = database.ref().child('clothes').push().key;
    var when = [];
    for (var ele in whenSources) {
      when.push(whenSources[ele][Math.floor(Math.random() * (whenSources[ele].length))]);
    }

    database.ref().child('closet').child(key).set({
      key: key,
      color: colors[Math.floor(Math.random() * (colors.length))],
      type: type[Math.floor(Math.random() * (type.length))],
      when: when
    });
  }

  res.json({
    code: 200,
    message: 'made '+numSamples+' samples'
  });
}

exports.todaysOutfit = function(req, res) {
  firebase.database().ref('/').once('value').then(function(snapshot) {
    var values = snapshot.val().closet;

    var colors = {};

    for (var ele in values) {
      var clothes = values[ele];
      // is in, add to array
      if (colors.hasOwnProperty(clothes.color)) {
        colors[clothes.color].push(clothes);
      }
      // not in, create in array
      else {
        colors[clothes.color] = [clothes];
      }
    }

    var outfit = {
      shirt: '',
      pants: '',
      shoes: ''
    };
    var valid = true;

    console.log(colors);

    for (var ele in colors) {
      valid = true;

      var colorClothes = colors[ele];
      for (var i = 0; i < colorClothes.length; i++) {
        var item = colorClothes[i];

        if (!outfit[item.type]) {
          outfit[item.type] = item;
        }
      }

      for (var prop in outfit) {
        if (!outfit[prop]) {
          valid = false;
        }
      }
      if (valid) {
        break;
      } else {
        outfit = {
          shirt: '',
          pants: '',
          shoes: ''
        };
      }
    }

    if (valid) {
      database.ref().child('today').set(outfit);

      res.json({
        code: 200,
        message: 'clothes are in the database'
      });
    } else {
      res.json({
        code: 200,
        message: 'check logs'
      });
    }
  });
};

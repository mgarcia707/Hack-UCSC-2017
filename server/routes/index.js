
var firebase = require('firebase');
var serverApp = firebase.initializeApp({
  serviceAccount: "routes/hackucsc2017.json",
  databaseURL: "https://hackucsc2016-a33ef.firebaseio.com/"
});

var database = serverApp.database();

var colors = ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'];
var type = [{
  type: 'hat',
  url: 'https://firebasestorage.googleapis.com/v0/b/hackucsc2016-a33ef.appspot.com/o/images%2Fashat.jpeg?alt=media&token=4d1c0f11-307d-48b8-99cd-2e5757e42e68'
}, {
  type: 'shirt',
  url: 'https://firebasestorage.googleapis.com/v0/b/hackucsc2016-a33ef.appspot.com/o/images%2Fblacktshirt.jpg?alt=media&token=0445078e-a55a-457b-be73-32d715c36745'
}, {
  type: 'pants',
  url: 'https://firebasestorage.googleapis.com/v0/b/hackucsc2016-a33ef.appspot.com/o/images%2Fjeans.jpg?alt=media&token=d3bd8a86-3b0e-4fc2-9bb8-6c207bbf026a'
}, {
  type: 'shoes',
  url: 'https://firebasestorage.googleapis.com/v0/b/hackucsc2016-a33ef.appspot.com/o/images%2Fnikeshoe.jpeg?alt=media&token=0a1159ad-3fe7-4607-99ed-aeeb13b6ead6'
}];
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

    var typeOption = type[Math.floor(Math.random() * (type.length))];

    database.ref().child('closet').child(key).set({
      key: key,
      color: colors[Math.floor(Math.random() * (colors.length))],
      type: typeOption.type,
      when: when,
      url: typeOption.url
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

exports.addClothes = function(req, res) {
  var body = req.body;
  var clothes = {
    type: body.type,
    color: body.color,
    when: body.when
  };

  var key = database.ref().child('clothes').push().key;
  database.ref().child('closet').child(key).set(clothes);

  res.json({
    code: 200,
    message: 'added the object'
  });
}

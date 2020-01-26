const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// https://us-central1-musical-buddies.cloudfunctions.net/api

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/user_top_artists', (req, res) => {
  admin
    .firestore()
    .collection('users-top-artists')
    .get()
    .then(data => {
      let users = [];
      data.forEach(doc => {
        // users.push({
        //   userId: doc.id,
        //   userTopArtists: doc.data().artists
        // });
        console.log(doc)
        users.push(doc.data().artists)
      });
      return res.json(users);
    })
    .catch(err => console.error(err));
});


app.post('/newUser', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    artists: req.body.artists || "",
    allTracks: req.body.allTracks || "",
    topTracks: req.body.topTracks || "",
    matches: req.body.matches || "",
    uniqueness: req.body.uniqueness || 0
  };

  admin
    .firestore()
    .collection('users')
    .add(newUser)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully.` });
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' });
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);
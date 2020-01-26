var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'a5b69d0a45cb4a82b0186ee2cb49a8b9'; // Your client id
var client_secret = '99e6b17e15c4435daa515addadd6be32'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    var scope = 'user-read-private user-read-email playlist-read-private user-library-read user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        function dataRetrieve(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                // function saveData(data, name) {
                //     var jsonData = JSON.stringify(data);
                //     var fs = require('fs');
                //     fs.writeFile(name+".txt", jsonData, function(err) {
                //         if (err) {
                //             console.log(err);
                //         }
                //     });
                // }

                var toptracks = []
                var alltracks = []
                var topartists = []
                var name = ""
                var email = ""









                // function getData(error, response, body){
                //     body = body.items.map(x => [x.name, x.popularity])
                //     console.log(body)
                // }
                //
                // function getArtists(error, response, body) {
                //     // console.log(body)
                //     artists = body.items.map(x => [x.name, x.popularity])
                //     // console.log(artists)
                //     saveData(artists, "artists")
                // }
                //
                // function getAll(error, response, body) {
                //
                // }

                function getTopTracks(error, response, body) {
                    toptracks = body.items.map(x => [x.name, x.id, x.popularity])
                    // console.log(toptracks)
                }

                function getTopArtists(error, response, body) {
                    topartists = body.items.map(x => [x.name, x.id, x.popularity])
                    // console.log(topartists);
                }

                function getAllTracks(error, response, body) {
                    if (!!body.items) {
                        trks = body.items.map(x => [x.track.name, x.track.id, x.track.popularity])
                        alltracks = alltracks.concat(trks)
                    }

                    if (!!body.next) {
                        reqAllTracksRec = {
                            url: body.next,
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            json: true
                        };
                        request.get(reqAllTracksRec, getAllTracks, false)
                    } else {
                        // console.log(alltracks)
                    }
                }

                function getAllAlbums(error, response, body) {
                    if (!!body.items) {
                        albumIDs = body.items.map(x => x.album.id)
                    }
                    function getAllTracksFromAlbum(error, response, body) {
                        if (!!body.items) {
                            trks = body.items.map(x => x.id)
                            function getTrackInfo(error, response, body) {
                                // console.log(body);
                                if (!!body.tracks) {
                                    trkfinal = body.tracks.map(x => [x.name, x.id, x.popularity])
                                    alltracks = alltracks.concat(trkfinal)
                                }
                            }
                            reqTrackInfo = {
                                url: 'https://api.spotify.com/v1/tracks?ids='+trks.toString(),
                                headers: {
                                    'Authorization': 'Bearer ' + access_token
                                },
                                json: true
                            }
                            request.get(reqTrackInfo, getTrackInfo, false)
                        }
                    }
                    for(var i = 0; i < albumIDs.length; i++) {
                        // console.log(albumIDs[i])
                        reqTracksFromAlbum = {
                            url: 'https://api.spotify.com/v1/albums/'+albumIDs[i]+'/tracks?limit=50',
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            json: true
                        };
                        request.get(reqTracksFromAlbum, getAllTracksFromAlbum, false)
                    }
                    if (!!body.next) {
                        reqAllAlbumsRec = {
                            url: body.next,
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            },
                            json: true
                        };
                        request.get(reqAllAlbumsRec, getAllAlbums, false)
                    } else {
                        // console.log(albumIDs)
                    }
                }

                function getNameAndEmail(error, response, body) {
                    name = body.display_name
                    email = body.email
                    // console.log(name)
                    // console.log(email)
                }

                reqTopTracks = {
                    url: 'https://api.spotify.com/v1/me/top/tracks?limit=50',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };
                reqTopArtists = {
                    url: 'https://api.spotify.com/v1/me/top/artists?limit=50',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };
                reqAllTracks = {
                    url: 'https://api.spotify.com/v1/me/tracks?limit=50&offset=0',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                };
                reqAllAlbums = {
                    url: 'https://api.spotify.com/v1/me/albums?limit=50&offset=0',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                }
                reqNameAndEmail = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    json: true
                }

                request.get(reqTopTracks, getTopTracks, false)
                request.get(reqTopArtists, getTopArtists, false)
                request.get(reqAllTracks, getAllTracks, false)
                request.get(reqAllAlbums, getAllAlbums, false)
                request.get(reqNameAndEmail, getNameAndEmail, false)




                function removeDuplicates(array) {
                  return array.filter((a, b) => array.indexOf(a) === b)
                };

                function stateChange() {
                    function postCallback(error, response, body) {
                        console.log(body);
                    }

                    setTimeout(function () {
                        reqPost = {
                            json: {
                                name: name,
                                email: email,
                                artists: JSON.stringify(topartists),
                                topTracks: JSON.stringify(toptracks),
                                allTracks: JSON.stringify(removeDuplicates(alltracks))
                            }
                        }
                        request.post('http://us-central1-musical-buddies.cloudfunctions.net/api/newUser', reqPost, postCallback)
                    }, 5000);
                }
                stateChange()



                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        }

        request.post(authOptions, dataRetrieve);
    }
});

app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

console.log('Listening on 8888');
app.listen(8888);

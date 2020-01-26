import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import Layout from '../components/Layout';
import hash from "../../hash";
import Navbar from '../components/Navbar';

import logo from '../../assets/spotify.svg';
import headshot from '../../assets/headshot.jpg';
import albumcover from '../../assets/albumcover.jpg';

import topArtists from './albums.json';

import Player from '../../Player';

const Home = () => {
  const [token, setToken] = useState(null);
  const [item, setItem] = useState({
    album: {
      images: [{ url: "" }]
    },
    name: "",
    artists: [{ name: "" }],
    duration_ms: 0,
  })
  const [isPlaying, setIsPlaying] = useState("Paused");
  const [progressMS, setProgressMS] = useState(0);

  const [albums, setAlbums] = useState([]);


  useEffect(() => {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      console.log(_token)
      // Set token
      setToken(_token)
      // getCurrentlyPlaying(_token)
      getTopAlbums(_token)
    }
  }, []);

  const getCurrentlyPlaying = (token) => {
    // Make a call using the token
    fetch('https://api.spotify.com/v1/me/player', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(response => {
      console.log(response);
      return response.json();
    })
      .then(data => {
        console.log(data)
        setItem(data.item);
        setIsPlaying(data.is_playing);
        setProgressMS(data.progress_ms);
      })
  }

  const getTopAlbums = (token) => {
    fetch('https://api.spotify.com/v1/me/top/artists?limit=6', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(response => {
      return response.json();
    })
      .then(data => {
        setAlbums(data.items)
      })
  }

  const getProfile = (token) => {
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  const displayAlbums = albums.map((artist) => {
    return (
      <a key={artist.id} href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
        <img src={artist.images[1].url} style={{ maxHeight: '250px' }} className="pr-3 pb-3" />
      </a>
    )
  })

  return (
    <Layout>
      <div style={{ backgroundColor: '#191414' }}>
        <Navbar />
        <div className="d-flex justify-content-center text-white">
          <div className="w-100 row">
            <div className="col-1" />
            <div className="col-5">
              <h4>Your Top</h4>
              <h1>MATCHES</h1>
              <div>
                {[1, 2, 3, 4, 5, 6].map(() => {
                  return (
                    <Link to="/profile">
                      <img src={headshot} style={{ maxHeight: '250px' }} className="pr-3 pb-3" />
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="col-5">
              <h4>Your Top</h4>
              <h1>ARTISTS</h1>
              <div>You are 89% unique!</div>
              <div>
                {/* {[1, 2, 3, 4, 5, 6].map(() => {
                  return (
                    <img src={albumcover} style={{ maxHeight: '250px' }} className="pr-3 pb-3" />
                  )
                })} */}
                {albums &&

                  displayAlbums
                  // albums.map((artist) => {
                  //   return (
                  //     <a key={artist.id} href={artist.external_urls.spotify}>
                  //       <img src={artist.images[1].url} style={{ maxHeight: '250px' }} className="pr-3 pb-3" />
                  //     </a>
                  //   )
                  // })
                }
              </div>

            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;


{/* <h2 style={{ color: 'white' }}>
{token && (
  <Player
    item={item}
    is_playing={isPlaying}
    progress_ms={progressMS}
  />
  // <button onClick={() => { getProfile() }}>Get Profile Info</button>
)}
{!token &&
  <>
    <h2>You need to log in</h2>
    <Link to="/">Back</Link>
  </>
}
</h2> */}
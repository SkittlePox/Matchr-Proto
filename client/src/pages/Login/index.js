import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/spotify.svg';
import { authEndpoint, clientId, redirectUri, scopes } from "../../config/spotifyConfig";
import Layout from '../components/Layout'

const Login = () => {
  return (
    <Layout>
      <div className="d-flex justify-content-center" style={{ height: '100vh', backgroundColor: '#191414' }}>
        <div className="d-flex flex-column justify-content-center">
          <a
            className="btn btn-primary"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
            </a>

          <div className="w-100 d-flex flex-row justify-content-center">
            <img src={logo} style={{ maxHeight: '75px' }} />
            <h1 className="my-auto ml-3 text-white">Matchr</h1>
          </div>
          <Link to="/home" className="mx-auto">
            <div className="my-3 btn btn-primary">Login</div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Login;
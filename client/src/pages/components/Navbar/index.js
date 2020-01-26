import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/spotify.svg';

const Navbar = () => {
  return (
    <div className="w-100 d-flex justify-content-between p-3">
      <Link to="/home">
        <div className="d-flex flex-row">
          <img src={logo} style={{ maxHeight: '50px' }} />
          <h3 className="my-auto ml-3 text-white">Matchr</h3>
        </div>
      </Link>
      <Link to="/">
        <button className="btn btn-primary">Log out</button>
      </Link>
    </div>
  )
}

export default Navbar;
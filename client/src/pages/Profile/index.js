import React from 'react';
import { Link } from 'react-router-dom'

import Layout from "../components/Layout";

import Navbar from '../components/Navbar';

import headshot from '../../assets/headshot.jpg';
import albumcover from '../../assets/albumcover.jpg';

const Profile = () => {
  return (
    <Layout>
      <div style={{ backgroundColor: '#191414' }}>
        <Navbar />
        <div className="d-flex justify-content-center text-white">
          <div className="w-100 row">
            <div className="col-1" />
            <div className="col-5">
              <div className="row">
                <h1 className="my-3">Edwin Thomas</h1>
              </div>
              <div className="row">
                <div className="col-6">
                  <img src={headshot} style={{ width: '100%' }} />
                </div>
                <div className="col-6">
                  <h4 className="mb-5">Male</h4>
                  <h4 className="mb-5">Age: 22</h4>
                  <h4 className="mb-5">92% Compatibility</h4>
                  <h4 className="mb-5">44% Unique</h4>
                </div>
              </div>
              <div className="row my-5">
                <div class="input-group">
                  <textarea class="form-control"></textarea>
                </div>
              </div>
            </div>
            <div className="col-5">
              <h4>Your Top</h4>
              <h1>ARTISTS</h1>
              <div>You are 89% unique!</div>
              <div>
                {[1, 2, 3, 4, 5, 6].map(() => {
                  return (
                    <img src={albumcover} style={{ maxHeight: '250px' }} className="pr-3 pb-3" />
                  )
                })}
              </div>

            </div>
            <div className="col-1" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile;
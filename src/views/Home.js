import React, {Component} from 'react';
import {Link} from 'react-router';
import SortGames from '../components/SortGames';
import Banner from '../components/Banner';
import GameList from '../components/GameList';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const commercialImg1 = require('./commercial_img_1.png');
    const commercialImg2 = require('./commercial_img_2.jpg');
    const commercialImg3 = require('./commercial_img_3.jpg');

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12"><h1>Games</h1></div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <SortGames />
          </div>
          <div className="col-lg-10">
            <Banner />
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-6"><img src={commercialImg1} /></div><div className="col-lg-6"><img src={commercialImg2} /></div>
                </div>
                <div className="row">
                    <div className="col-lg-12"><GameList /></div>
                </div>
              </div>
              <div className="col-lg-3"><img src={commercialImg3} /></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

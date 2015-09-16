import React, {Component} from 'react';
import {Link} from 'react-router';
import CounterButton from '../components/CounterButton';
import GithubButton from '../components/GithubButton';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>Gamers Online Webshop</h1>

            <h2>Webshop for PS4, PS3, PSVita and PSP games!</h2>

            <p>
              <a className={styles.github} href="https://github.com/kennyomg/gamersonline-uni"
                 target="_blank">
                <i className="fa fa-github"/> View on Github
              </a>
            </p>
            <GithubButton user="kennyomg"
                          repo="gamersonline-uni"
                          type="star"
                          width={160}
                          height={30}
                          count large/>
            <GithubButton user="kennyomg"
                          repo="gamersonline-uni"
                          type="fork"
                          width={160}
                          height={30}
                          count large/>

            <p className={styles.humility}>
              Created by <a href="https://twitter.com/kennyomg" target="_blank">@kennyomg</a>.
            </p>
          </div>
        </div>

        <div className="container">
          <div className={styles.counterContainer}>
            <CounterButton/>
          </div>
        </div>
      </div>
    );
  }
}

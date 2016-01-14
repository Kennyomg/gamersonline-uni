import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as infoActions from 'redux/modules/info';

@connect(
    state => ({info: state.info}),
    infoActions )
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object,
    updateTime: PropTypes.func.isRequired,
  }

  componentDidMount() {

    // componentDidMount is called by react when the component
    // has been rendered on the page. We can set the interval here:
    this.timer = setInterval(::this.tick, 1000);
  }

  componentWillUnmount() {

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:
    clearInterval(this.timer);
  }

  tick() {
    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered
    this.props.updateTime();
  }

  render() {
    const {info} = this.props; // eslint-disable-line no-shadow
    const styles = require('./InfoBar.scss');
    return (
      <div className={styles.infoBar + ' well'}>
        <div className="container">
          <span className={styles.time}>{(info.time) ? info.time.format('MMMM Do YYYY, h:mm:ss a') : ''}</span>
        </div>
      </div>
    );
  }
}

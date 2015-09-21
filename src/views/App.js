import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {isLoaded as isInfoLoaded, load as loadInfo} from '../ducks/info';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from '../ducks/auth';
import InfoBar from '../components/InfoBar';
import {createTransitionHook} from '../universalRouter';

const title = 'Gamers Online Store';
const description = 'Webstore for PS4, PS3, PS vita and PSP games.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
	charSet: 'utf-8',
	property: {
	  'og:site_name': title,
	  'og:image': image,
	  'og:locale': 'en_US',
	  'og:title': title,
	  'og:description': description,
	  'twitter:card': 'summary',
	  'twitter:site': '@gamersonline',
	  'twitter:creator': '@kennyomg',
	  'twitter:title': title,
	  'twitter:description': description,
	  'twitter:image': image,
	  'twitter:image:width': '200',
	  'twitter:image:height': '200'
	}
  }
};

@connect(
	state => ({user: state.auth.user}),
	dispatch => bindActionCreators({logout}, dispatch))
export default class App extends Component {
  static propTypes = {
	children: PropTypes.object.isRequired,
	user: PropTypes.object,
	logout: PropTypes.func.isRequired
  }

  static contextTypes = {
	router: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired
  };

  componentWillMount() {
	const {router, store} = this.context;
	this.transitionHook = createTransitionHook(store);
	router.addTransitionHook(this.transitionHook);
  }

  componentWillReceiveProps(nextProps) {
	if (!this.props.user && nextProps.user) {
	  // login
	  this.context.router.transitionTo('/loginSuccess');
	} else if (this.props.user && !nextProps.user) {
	  // logout
	  this.context.router.transitionTo('/');
	}
  }

  componentWillUnmount() {
	const {router} = this.context;
	router.removeTransitionHook(this.transitionHook);
  }

  render() {
	const {user} = this.props;
	const styles = require('./App.scss');
	return (
		<div className={styles.app}>
			<DocumentMeta {...meta}/>
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
					<Link to="/" className="navbar-brand">
						<div className={styles.brand}/>
						React Redux Example
					</Link>
					<div className={styles.right}>
						<Link to="/">Aanmelden</Link> | <Link to="/">Account maken</Link>
						<br/>
						<input type="text" placeholder="Zoeken" />
					</div>
					<br />
					<br />
					<ul className="nav navbar-nav">
						<li><Link to="/widgets">Speciaal voor jou</Link></li>
						<li><Link to="/survey">PlayStation Plus</Link></li>
						<li><Link to="/about">Nieuwe releases</Link></li>
						<li><Link to="/about">Deals en aanbiedingen</Link></li>
						<li><Link to="/about">Collecties</Link></li>
					</ul>
				</div>
			</nav>
			<div className={styles.appContent}>
			{this.props.children}
			</div>
			<InfoBar/>
		</div>
	);
  }

  handleLogout(event) {
	event.preventDefault();
	this.props.logout();
  }

  static fetchData(store) {
	const promises = [];
	if (!isInfoLoaded(store.getState())) {
	  promises.push(store.dispatch(loadInfo()));
	}
	if (!isAuthLoaded(store.getState())) {
	  promises.push(store.dispatch(loadAuth()));
	}
	return Promise.all(promises);
  }
}


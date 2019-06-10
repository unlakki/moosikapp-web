import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import action from '../../actions/login';

import styles from './header.module.css';

import logo from './logo.svg';

class Header extends React.Component {
  logout() {
    return (e) => {
      e.preventDefault();

      const { setToken, history } = this.props;

      setToken('');
      window.localStorage.removeItem('token');
      history.push('/login');
    };
  }

  render() {
    const { token } = this.props;

    return (
      <header className={styles.box}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link className={styles.logo} to="/">
              <svg>
                <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={`${logo}#logo`} />
              </svg>
            </Link>
            <nav className={styles.nav}>
              <Link className={styles.link} to="/music">Music</Link>
              <Link className={styles.link} to="/upload">Upload</Link>
            </nav>
          </div>
          {!token && <Link className={styles.link} to="/login">Login</Link>}
          {token && <Link className={styles.link} to="?logout" onClick={this.logout()}>Logout</Link>}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(action(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

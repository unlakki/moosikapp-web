import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import action from '../../actions/login';

import styles from './header.module.css';

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
              <svg viewBox="0 0 48 48">
                <path d="M24 2C14.06 2 6 10.06 6 20v14c0 3.31 2.69 6 6 6h6V24h-8v-4c0-7.73 6.27-14 14-14s14 6.27 14 14v4h-8v16h8v2H24v4h12c3.31 0 6-2.69 6-6V20c0-9.94-8.06-18-18-18z" />
              </svg>
            </Link>
            {token && (
              <nav className={styles.nav}>
                <Link className={styles.link} to="/music">Music</Link>
                <Link className={styles.link} to="/upload">Upload</Link>
              </nav>
            )}
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

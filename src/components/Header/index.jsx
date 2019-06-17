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
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link className={styles.logoLink} to="/">
              <svg className={styles.logo} viewBox="0 0 24 24">
                <path d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z" />
              </svg>
            </Link>
            {token && (
              <nav className={styles.navWrapper}>
                <Link className={styles.link} to="/music">Music</Link>
                <Link className={styles.link} to="/upload">Upload</Link>
              </nav>
            )}
          </div>
          <div className={styles.right}>
            {!token && <Link className={styles.link} to="/login">Login</Link>}
            {token && <Link className={styles.link} to="?logout" onClick={this.logout()}>Logout</Link>}
          </div>
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

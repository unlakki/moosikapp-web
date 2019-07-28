import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { show as showAction } from '../../actions/mobile';
import { logout as logoutAction } from '../../actions/login';

import styles from './layouts/Header.module.css';

const Header = ({
  token, show, logout, history,
}) => (
  <div className={styles.wrapper}>
    <header className={styles.inner}>
      <div className={styles.group}>
        <Link className={styles.logo} to="/" title="MoosikApp">
          <svg viewBox="0 0 24 24">
            <path d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z" />
          </svg>
        </Link>
        {token && (
          <nav className={styles.nav}>
            <Link className={styles.item} to="/music">Music</Link>
            <Link className={styles.item} to="/upload">Upload</Link>
          </nav>
        )}
      </div>
      <div className={`${styles.group} ${styles.login}`}>
        {!token && <Link className={styles.item} to="/login">Login</Link>}
        {token && (
          <Link
            className={styles.item}
            to="?logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
              window.localStorage.removeItem('token');
              history.push('/');
            }}
          >
            Logout
          </Link>
        )}
      </div>
      <button className={styles.mobileNavToggle} type="button" aria-label="Toggle Mobile Navigation" onClick={show}>
        <svg viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
    </header>
  </div>
);

Header.propTypes = {
  show: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  show: () => dispatch(showAction()),
  logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

import React from 'react';
import { useMedia } from 'react-use';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout as logoutAction } from '../../actions/login';
import css from './css/Header.module.css';
import Logo from './Logo';
import Navigation from './Navigation';
import Link from './NavLink';
import NavButton from './NavButton';

const logoutFunc = func => (event) => {
  event.preventDefault();
  func();
  window.localStorage.removeItem('token');
};

const Header = ({ token, logout }) => {
  const isMobile = useMedia('(max-width: 640px)');

  return (
    <header className={css.header}>
      <div className={css.group}>
        <Link to="/">
          <Logo />
        </Link>
        {!isMobile && <Navigation />}
      </div>
      {!isMobile && (
        <div className={css.group}>
          {!token ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="?logout" onClick={logoutFunc(logout)}>Logout</Link>
          )}
        </div>
      )}
      {isMobile && <NavButton />}
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout as action } from '../../actions/login';
import { wrapper, group } from './styles/Header.m.css';
import Link from './Link';
import Logo from './Logo';
import Navigation from './Navigation';

const Header = ({ token, logout }) => (
  <div className={wrapper}>
    <div className={group}>
      <Link to="/">
        <Logo />
      </Link>
      <Navigation />
    </div>
    <div className={group}>
      {!token ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link
          to="?logout"
          onClick={() => {
            logout();
            window.localStorage.removeItem('token');
          }}
        >
          Logout
        </Link>
      )}
    </div>
  </div>
);

Header.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(action()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import { hide as hideAction } from '../../actions/mobile';
import { logout as logoutAction } from '../../actions/login';

import styles from './layouts/Sidebar.module.css';

const links = [
  {
    uuid: uuidv4(),
    name: 'Your profile',
    to: '/profile',
  },
  {
    uuid: uuidv4(),
    name: 'Music',
    to: '/music',
  },
  {
    uuid: uuidv4(),
    name: 'Upload',
    to: '/upload',
  },
];

const Sidebar = ({
  token, visible, hide, logout, history,
}) => (
  <div
    className={styles.wrapper}
    style={{ display: visible ? '' : 'none' }}
    onClick={(e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      hide();
    }}
    role="presentation"
  >
    {visible && (
      <div className={styles.container}>
        <ul className={styles.list}>
          {token && (
            links.map(({ uuid, name, to }) => (
              <li key={uuid}>
                <Link className={styles.link} to={to} onClick={hide}>{name}</Link>
              </li>
            ))
          )}
        </ul>
        {!token && <Link className={styles.link} to="/login" onClick={hide}>Login</Link>}
        {token && (
          <Link
            className={styles.link}
            to="?logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
              window.localStorage.removeItem('token');
              history.push('/');
              hide();
            }}
          >
            Logout
          </Link>
        )}
      </div>
    )}
  </div>
);

Sidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  visible: store.mobile.visible,
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(hideAction()),
  logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));

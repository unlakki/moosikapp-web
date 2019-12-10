import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as sidebarActions from '../../actions/sidebar';
import { logout as logoutAction } from '../../actions/login';
import Wrapper from './Wrapper';

import css from './css/Sidebar.module.css';

const logoutFunc = func => (event) => {
  event.preventDefault();
  func();
  window.localStorage.removeItem('token');
};

const Sidebar = ({
  token, visible, hide, logout,
}) => {
  const hideSidabar = (event) => {
    if (event.target !== event.currentTarget
      && event.target.className !== css.link) {
      return;
    }
    hide();
  };

  return (
    <Wrapper visible={visible}>
      <CSSTransition in={visible} classNames={{ ...css }} timeout={200}>
        <div className={css.wrapper} onClick={hideSidabar} role="presentation">
          <div className={css.sidebar}>
            <div className={css.group}>
              {!token ? (
                <Link className={css.link} to="/login">Login</Link>
              ) : (
                <Link className={css.link} to="?logout" onClick={logoutFunc(logout)}>Logout</Link>
              )}
            </div>
            {token && (
              <div className={css.group}>
                <Link className={css.link} to="/music">Music</Link>
                <Link className={css.link} to="/upload">Upload</Link>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  token: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
  visible: store.sidebar.visible,
});

const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(sidebarActions.hide()),
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

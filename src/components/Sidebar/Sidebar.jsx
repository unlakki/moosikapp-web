import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './css/Sidebar.module.css';

const Sidebar = ({ hidden }) => (
  <div className={classnames(css.wrapper, { [css.hidden]: hidden })} />
);

Sidebar.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

const mapStateToProps = store => ({
  hidden: store.sidebar.hidden,
});

export default connect(mapStateToProps)(Sidebar);

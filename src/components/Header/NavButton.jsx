import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as sidebarActions from '../../actions/sidebar';

const Button = styled.button`
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
`;

const Icon = styled.svg`
  fill: var(--light);
  transition: fill .2s ease;

  &:hover {
    fill: var(--red);
  }
`;

const NavButton = ({ hidden, show, hide }) => (
  <Button
    type="button"
    aria-label="Mobile Navigation Button"
    onClick={() => {
      if (hidden) {
        show();
        return;
      }
      hide();
    }}
  >
    <Icon viewBox="0 0 24 24">
      <path
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
      />
    </Icon>
  </Button>
);

NavButton.propTypes = {
  hidden: PropTypes.bool.isRequired,
  show: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  hidden: store.sidebar.hidden,
});

const mapDispatchToProps = dispatch => ({
  show: () => dispatch(sidebarActions.show()),
  hide: () => dispatch(sidebarActions.hide()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavButton);

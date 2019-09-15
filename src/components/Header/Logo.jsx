import React from 'react';
import styled from 'styled-components';

const Logo = styled.svg`
  width: 48px;
  height: 48px;
  fill: var(--light);
  transition: fill .2s ease;

  &:hover {
    fill: var(--red);
  }
`;

export default () => (
  <Logo viewBox="0 0 24 24">
    <path
      d="M12,1C7,1 3,5 3,10V17A3,3 0 0,0 6,20H9V12H5V10A7,
        7 0 0,1 12,3A7,7 0 0,1 19,10V12H15V20H18A3,3 0 0,0 21,17V10C21,5 16.97,1 12,1Z"
    />
  </Logo>
);

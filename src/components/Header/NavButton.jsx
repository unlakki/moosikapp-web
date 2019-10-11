import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
`;

const Logo = styled.svg`
  fill: var(--light);
  transition: fill .2s ease;

  &:hover {
    fill: var(--red);
  }
`;

export default () => (
  <Button type="button">
    <Logo viewBox="0 0 24 24">
      <path
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
      />
    </Logo>
  </Button>
);

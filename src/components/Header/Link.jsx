import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  color: var(--light);
  text-decoration: none;
  cursor: pointer;
  text-shadow: 0 0 4px var(--dark);
  transition: color .2s ease;

  &:hover {
    color: var(--red);
  }
`;

export default StyledLink;

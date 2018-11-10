import styled from 'styled-components';

import { media } from '../utils/media';

export default styled.div`
  height: 100vh;
  min-width: 1000px;
  margin: 0px auto;
  ${media.desktop`
    min-width: 768px;
  `};
  ${media.tablet`
    min-width: auto;
  `};
`;

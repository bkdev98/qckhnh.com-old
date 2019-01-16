import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';

import { media } from '../utils/media';

const Wrapper = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0px;
  right: 40px;
  color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
  :hover {
    color: #FB7EBB;
  }
  ${media.desktop`right: 25px;`};
  ${media.tablet`display: none;`};
`;

const Container = styled.div`
  width: 100%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ::after {
    content: "";
    display: block;
    width: 1px;
    height: 90px;
    background-color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
    margin: 0px auto;
  }
`;

const Link = styled.a`
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 300;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  margin: 20px auto;
  padding: 10px;
  display: inline-block;
  text-decoration-skip-ink: auto;
  color: inherit;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
`;

const Social = ({ settings }) => (
  <Spring from={{ opacity: 0, bottom: -20 }} to={{ opacity: 1, bottom: 0 }} delay={2500}>
    {styles => (
      <Wrapper isDark={settings.theme === 'dark'} style={styles}>
        <Container isDark={settings.theme === 'dark'}>
          <Link href='mailto:khanhbq@innoteq.vn'>khanhbq@innoteq.vn</Link>
        </Container>
      </Wrapper>
    )}
  </Spring>
);

export default Social;

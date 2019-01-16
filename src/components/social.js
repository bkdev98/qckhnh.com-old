import React from 'react';
import styled from 'styled-components';
import { FiFacebook, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { Spring } from 'react-spring';

import { media } from '../utils/media';

const Wrapper = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0px;
  left: 40px;
  ${media.desktop`left: 25px;`};
  ${media.tablet`display: none;`};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px;
  margin: 0px;
  list-style: none;
  ::after {
    content: "";
    display: block;
    width: 1px;
    height: 90px;
    background-color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
    margin: 0px auto;
  }
`;

const Icon = styled.a`
  padding: 5px;
  display: inline-block;
  text-decoration-skip-ink: auto;
  color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
  :hover {
    color: #FB7EBB;
  }
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
`;

const Social = ({ settings }) => (
  <Spring from={{ opacity: 0, bottom: -20 }} to={{ opacity: 1, bottom: 0 }} delay={2500}>
    {styles => (
      <Wrapper style={styles}>
        <List isDark={settings.theme === 'dark'}>
          <li>
            <Icon
              isDark={settings.theme === 'dark'}
              target='__blank' href='https://www.facebook.com/bkdev98'><FiFacebook />
            </Icon>
          </li>
          <li>
            <Icon
              isDark={settings.theme === 'dark'}
              target='__blank' href='https://github.com/bkdev98'><FiGithub />
            </Icon>
          </li>
          <li>
            <Icon
              isDark={settings.theme === 'dark'}
              target='__blank' href='https://www.linkedin.com/in/bkdev98/'><FiLinkedin />
            </Icon>
          </li>
          <li>
            <Icon
              isDark={settings.theme === 'dark'}
              target='__blank' href='https://www.instagram.com/qckhnh/'><FiInstagram />
            </Icon>
          </li>
        </List>
      </Wrapper>
    )}
  </Spring>
);

export default Social;

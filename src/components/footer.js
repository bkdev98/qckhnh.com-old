import React from 'react';
import styled from 'styled-components';
import { FiFacebook, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';

import { media } from '../utils/media';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
  background: ${props => props.isDark ? '#000' : '#FFF'};
`;
const SocialContainer = styled.div`
  width: 100%;
  max-width: 270px;
  margin: 10px auto;
  display: none;
  ${media.tablet`display: block;`};
`;
const SocialItemList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  a {
    color: ${props => props.isDark ? '#FFF' : '#3C3C3E'};
  }
`;
const SocialItem = styled.li`
  margin: 0px;
`;
const SocialLink = styled.a`
  padding: 10px;
  transition: all 0.2s;
  :hover {
    color: white;
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Copy = styled.p`
  margin: 5px 0 3px;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 300;
  a {
    color: #FB7EBB;
  }
  ${media.phablet`
    font-size: 12px;
  `};
`;

const Footer = ({ settings }) => (
  <FooterContainer isDark={settings.theme === 'dark'}>
    <SocialContainer>
      <SocialItemList isDark={settings.theme === 'dark'}>
        <SocialItem>
          <SocialLink
            href='https://fb.com/bkdev98'
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label='Facebook'
          >
            <FiFacebook />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink
            href='https://github.com/bkdev98'
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label='Github'
          >
            <FiGithub />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink
            href={'https://www.linkedin.com/in/bkdev98/'}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label='Linkedin'
          >
            <FiLinkedin />
          </SocialLink>
        </SocialItem>
        <SocialItem>
          <SocialLink
            href={'https://www.instagram.com/qckhnh/'}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label='Instagram'
          >
            <FiInstagram />
          </SocialLink>
        </SocialItem>
      </SocialItemList>
    </SocialContainer>
    <Copy>
      Designed by <a href='https://qckhnh.com'>Quoc Khanh</a>
    </Copy>
  </FooterContainer>
);

export default Footer;

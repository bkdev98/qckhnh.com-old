import React from 'react';
import styled from 'styled-components';

import Section from '../components/section';
import Layout from '../components/layout';
import { media } from '../utils/media';

const Wrapper = styled(Section)`
  max-width: 800px;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  letter-spacing: 4px;
  ${media.tablet`
    padding: 0px 20px;
  `};
  ul {
    margin-bottom: 40px;
  }
`;

const Text = styled.h1`
  color: #FB7EBB;
  text-transform: uppercase;
  font-size: 25px;
  letter-spacing: 10px;
  line-height: 30px;
  text-align: center;
  ${media.tablet`
    font-size: 23px;
  `};
`;

const More = styled.div`
  width: 100%;
  position: relative;
  margin: 50px 0px;
  text-align: center;
  a {
    color: #3c3c3e;
    z-index: 21;
    font-size: 13px;
    letter-spacing: 4px;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    left: calc(50% + 3px);
    width: 100%;
    transform: translate(-50%, 0%);
    transition: all -0.3s;
    div {
      position: absolute;
      z-index: -1;
      left: 50%;
      transform: translate(-50%, 0%);
      top: 15px;
      width: 200px;
      height: 20px;
      background-color: #FB7EBB;
    }
  }
`;

const Contact = () => (
  <Layout>
    <Wrapper>
      <ul>
        <li>Quoc Khanh</li>
        <li>HCMc, Vietnam</li>
        <li>+84 949 840 370</li>
      </ul>
      <Text>Hi QcKhnh, I have a project, a budget and a detailed briefing!</Text>
      <More>
        <a href='mailto:khanhbq@innoteq.vn'>
          Send an email
          <div />
        </a>
      </More>
    </Wrapper>
  </Layout>
);

export default Contact;

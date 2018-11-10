import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import heroImage from '../images/hero-image.jpg';

import { getRandomInt } from '../utils/math';

const Wrapper = styled.div`
  height: 100vh;
  width: 1000px;
  margin: 0px auto;
  display: flex;
  align-items: center;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const LeftText = styled.p`
  font-size: 16px;
  font-weight: 300;
  text-align: right;
  letter-spacing: 4px;
  text-transform: uppercase;
  padding-right: ${() => `${getRandomInt(0, 100)}px`};
  padding-top: ${() => `${getRandomInt(0, 25)}px`};
`;

const RightSection = styled.div`
  padding-top: ${() => `${getRandomInt(80, 200)}px`};
  flex: 1;
`;

const Name = styled.h3`
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 10px;
  text-transform: uppercase;
  color: black;
  margin-bottom: 20px;
  strong {
    text-decoration: line-through;
  }
`;

const RightText = styled.span`
  display: table;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  letter-spacing: 6px;
  line-height: 20px;
  padding: 0px 5px 0px 10px;
  margin-bottom: 1px;
  background-color: ${props => (props.highlight ? '#3C3C3E' : 'transparent')};
  color: ${props => (props.highlight ? 'white' : '#3C3C3E')};
`;

const HeroImage = styled.div`
  width: 24vh;
  height: 36vh;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  margin: 0px 40px;
  background-color: #FB7EBB;
  background-blend-mode: luminosity;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  :hover {
    background-color: transparent;
  }
`;

const IndexPage = () => (
  <Layout>
    <Wrapper>
      <LeftSection>
        <LeftText>Welcome</LeftText>
        <LeftText>to</LeftText>
        <LeftText>the</LeftText>
        <LeftText>portfolio</LeftText>
        <LeftText>of</LeftText>
      </LeftSection>
      <HeroImage src={heroImage} />
      <RightSection>
        <Name>Qu<strong>ốc</strong> Kh<strong>á</strong>nh</Name>
        <RightText>Freelancer</RightText>
        <RightText>Developer</RightText>
        <RightText>and</RightText>
        <RightText highlight>Software</RightText>
        <RightText highlight>Artisan</RightText>
        <RightText>from</RightText>
        <RightText>HCMC.</RightText>
      </RightSection>
    </Wrapper>
  </Layout>
);

export default IndexPage;

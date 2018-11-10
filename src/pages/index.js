import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import heroImage from '../images/hero-image.jpg';

import { getRandomInt } from '../utils/math';
import { media } from '../utils/media';

const Section = styled.div`
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

const HeroSection = styled(Section)`
  display: flex;
  align-items: center;
  ${media.tablet`
    display: block;
    padding-top: 200px;
  `};
  ${media.phablet`
    padding-top: 150px;
  `};
  ${media.phone`
    padding-top: 130px;
  `};
`;

// const AboutSection = styled(Section)`
// `;

// const ArticlesSection = styled(Section)`
// `;

// const ProjectsSection = styled(Section)`
// `;

// const ContactSection = styled(Section)`
// `;

const LeftSection = styled.div`
  flex: 1;
  ${media.tablet`
    padding: 0px 40px;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const LeftText = styled.p`
  font-size: 16px;
  font-weight: 300;
  text-align: right;
  letter-spacing: 4px;
  text-transform: uppercase;
  padding-right: ${() => `${getRandomInt(0, 100)}px`};
  /* padding-top: ${() => `${getRandomInt(0, 25)}px`}; */
  ${media.tablet`
    font-size: 14px;
  `};
  ${media.tablet`
    font-size: 12px;
    padding-right: 0;
    text-align: center;
    padding-top: 0px;
    display: inline-block;
    text-transform: none;
    letter-spacing: 2px;
    margin-left: 10px;
  `};
`;

const RightSection = styled.div`
  padding-top: ${() => `${getRandomInt(80, 200)}px`};
  flex: 1;
  ${media.tablet`
    padding: 20px 130px 0px;
    text-align: center;
  `};
  ${media.phablet`
    padding: 20px 30px 0px;
  `};
`;

const NameDesktop = styled.h3`
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 10px;
  text-transform: uppercase;
  color: black;
  margin-bottom: 20px;
  strong {
    text-decoration: line-through;
  }
  ${media.tablet`
    font-size: 15px;
  `};
  ${media.tablet`
    display: none;
  `};
`;

const NameMobile = styled.h3`
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 10px;
  text-transform: uppercase;
  color: black;
  display: none;
  margin-bottom: 20px;
  margin-top: 20px;
  strong {
    text-decoration: line-through;
  }
  ${media.tablet`
    display: block;
  `};
`;

const RightText = styled.span`
  display: table;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  letter-spacing: 5px;
  line-height: 20px;
  padding: 0px 5px 0px 10px;
  margin-bottom: 1px;
  background-color: ${props => (props.highlight ? '#3C3C3E' : 'transparent')};
  color: ${props => (props.highlight ? 'white' : '#3C3C3E')};
  ${media.tablet`
    font-size: 12px;
  `};
  ${media.tablet`
    font-size: 12px;
    line-height: 16px;
    display: inline-block;
    text-align: center;
    letter-spacing: 2px;
  `};
`;

const HeroImage = styled.div`
  width: 24vh;
  height: 36vh;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  margin: 0px 60px;
  background-color: #FB7EBB;
  background-blend-mode: luminosity;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  :hover {
    background-color: transparent;
  }
  ${media.tablet`
    margin: 0px auto;
  `};
`;

const IndexPage = () => (
  <Layout>
    <HeroSection>
      <LeftSection>
        <LeftText>Welcome</LeftText>
        <LeftText>to</LeftText>
        <LeftText>the</LeftText>
        <br />
        <LeftText>Portfolio</LeftText>
        <LeftText>of</LeftText>
        <NameMobile>Qu<strong>oc</strong> Kh<strong>a</strong>nh</NameMobile>
      </LeftSection>
      <HeroImage src={heroImage} />
      <RightSection>
        <NameDesktop>Qu<strong>oc</strong> Kh<strong>a</strong>nh</NameDesktop>
        <RightText>Freelancer</RightText>
        <RightText>Developer</RightText>
        <RightText>and</RightText>
        <RightText highlight>Software</RightText>
        <RightText highlight>Artisan</RightText>
        <RightText>from</RightText>
        <RightText>HCMC.</RightText>
      </RightSection>
    </HeroSection>
    {/* <AboutSection />
    <ArticlesSection />
    <ProjectsSection />
    <ContactSection /> */}
  </Layout>
);

export default IndexPage;

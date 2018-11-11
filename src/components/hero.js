/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactRevealText from 'react-reveal-text';
import { Spring } from 'react-spring';

import heroImage from '../images/hero-image.jpg';
import Section from './section';
import { media } from '../utils/media';
import { getRandomInt } from '../utils/math';
import HeroFlicker from './hero-flicker';

const Wrapper = styled(Section)`
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

const LeftSection = styled.div`
  flex: 1;
  ${media.tablet`
    padding: 0px 40px;
    text-align: center;
    margin-bottom: 20px;
  `};
`;

const LeftText = styled(ReactRevealText)`
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
  padding-top: 120px;
  flex: 1;
  ${media.tablet`
    padding: 40px 130px 0px;
    text-align: center;
  `};
  ${media.phablet`
    padding: 40px 30px 0px;
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
  margin-bottom: 60px;
  margin-top: 20px;
  strong {
    text-decoration: line-through;
  }
  ${media.tablet`
    display: block;
  `};
`;

const RightText = styled.p`
  display: table;
  font-size: 13px;
  font-weight: 300;
  text-align: left;
  letter-spacing: 5px;
  line-height: 20px;
  padding: 0px 5px 0px 10px;
  margin-bottom: 1px;
  background-color: transparent;
  color: #3C3C3E;
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

const HoverWrapper = styled.div`
  width: 24vh;
  left: -3vh;
  display: block;
  position: absolute;
  top: -3vh;
  z-index: 0;
  background-color: transparent;
  overflow: hidden;
  height: calc(100% + 6vh);
`;

const revealLine = props => keyframes`
  0% {
    width: ${((props.top || props.bottom) && '0%')};
    height: ${((props.left || props.right) && '0%')};
  }
  100% {
    width: ${((props.top || props.bottom) && '100%')};
    height: ${((props.left || props.right) && '100%')};
  }
`;
const revealLineReversed = props => keyframes`
  0% {
    width: ${((props.top || props.bottom) && '100%')};
    height: ${((props.left || props.right) && '100%')};
  }
  100% {
    width: ${((props.top || props.bottom) && '0%')};
    height: ${((props.left || props.right) && '0%')};
  }
`;

const HoverLine = styled.div`
  background-Color: #FB7EBB;
  position: absolute;
  top: ${props => (props.top || props.right ? '0px' : 'unset')};
  bottom: ${props => (props.bottom || props.left ? '0px' : 'unset')};
  left: ${props => (props.top || props.left ? '0px' : 'unset')};
  right: ${props => (props.bottom || props.right ? '0px' : 'unset')};
  transition: all 0.2s;
  transition-timing-funtion: linear;
  width: ${props => (props.left || props.right ? '2px' : '0px')};
  height: ${props => (props.top || props.bottom ? '2px' : '0px')};
  animation: ${revealLine} 0.4s linear forwards;
  animation-delay: ${props => `${props.delay * 2}s`};
  transition-delay: ${props => (props.top ? '0s' : props.right ? '0.2s' : props.bottom ? '0.4s' : '0.6s')};
  ${HoverWrapper}:hover & {
    width: ${(props => (props.top || props.bottom) && '100%')};
    height: ${(props => (props.left || props.right) && '100%')};
    animation: ${revealLineReversed} 0.2s linear forwards;
    animation-delay: ${props => `${0.8 - props.delay}s`};
  }
`;

const HeroImageWrapper = styled.div`
  width: 24vh;
  height: 36vh;
  position: relative;
  margin: 0px 60px;
  ${media.tablet`
    margin: 0px auto;
  `};
`;

const HeroImage = styled.div`
  width: 24vh;
  height: 36vh;
  position: absolute;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  background-color: #FB7EBB;
  background-blend-mode: luminosity;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
  ${HeroImageWrapper}:hover & {
    background-color: transparent;
  }
`;

class Hero extends Component {
  state = {
    revealText: false,
  }

  componentDidMount() {
    setTimeout(() => this.setState({ revealText: true }), 1500);
  }

  render() {
    const { revealText } = this.state;

    return (
      <Wrapper>
        <LeftSection>
          <LeftText show={revealText}>Welcome</LeftText>
          <LeftText show={revealText}>to</LeftText>
          <LeftText show={revealText}>the</LeftText>
          <br />
          <LeftText show={revealText}>Portfolio</LeftText>
          <LeftText show={revealText}>of</LeftText>
          <NameMobile>Qu<strong>oc</strong> Kh<strong>a</strong>nh</NameMobile>
        </LeftSection>
        <HeroImageWrapper>
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={4000}>
            {props => <HeroImage src={heroImage} style={props} />}
          </Spring>
          <HoverWrapper>
            <HoverLine top delay={0.2} />
            <HoverLine right delay={0.4} />
            <HoverLine bottom delay={0.6} />
            <HoverLine left delay={0.8} />
          </HoverWrapper>
        </HeroImageWrapper>
        <Spring from={{ opacity: 0, paddingLeft: 30 }} to={{ opacity: 1, paddingLeft: 0 }} delay={3200}>
          {props => (
            <RightSection style={props}>
              <NameDesktop>Q<strong>uo</strong>c Kh<strong>a</strong>nh</NameDesktop>
              <RightText>Freelancer</RightText>
              <RightText>Developer</RightText>
              <RightText>and</RightText>
              <HeroFlicker />
              <RightText>from</RightText>
              <RightText>HCMC.</RightText>
            </RightSection>
          )}
        </Spring>
      </Wrapper>
    );
  }
}

export default Hero;

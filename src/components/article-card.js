/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Spring } from 'react-spring';
import ReactRevealText from 'react-reveal-text';

const Article = styled(Link)`
  display: block;
  width: 300px;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 126px;
  color: #3c3c3e;
`;

const Info = styled.div`
  margin-bottom: 25px;
  margin-left: 30px;
  height: 24px;
  letter-spacing: 3px;
  z-index: 12;
  position: relative;
`;

const Tag = styled.div`
  color: #3c3c3e;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  text-transform: uppercase;
`;

const Seperator = styled.div`
  display: inline-block;
  padding: 0px 5px;
  font-weight: 300;
`;

const Date = styled.div`
  color: #3c3c3e;
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
`;

const ImageWrapper = styled.div`
  height: 160px;
  width: 300px;
  position: relative;
  z-index: -1;
  margin-top: ${props => (props.hover ? '84px' : 0)};
  margin-left: ${props => (props.hover ? '50px' : 0)};
  transform: matrix(1, 0, 0, 1, 0, 0);
  transition: all 0.2s;
  transition-delay: 0.4s;
  ${Article}:hover & {
    transform: ${props => (!props.hover ? 'matrix(1, 0, 0, 1, 0, 15)' : 'unset')};
    transition-delay: 0.2s;
  }
`;

const Image = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.url});
  z-index: 0;
  background-color: #3c3c3e;
  background-blend-mode: screen;
  background-position: center;
  background-size: cover;
  filter: grayscale(1);
  transition: all 0.8s ease-in;
  ${Article}:hover & {
    background-blend-mode: ${props => (!props.hover ? 'screen' : 'unset')};
    filter: ${props => (!props.hover ? 'grayscale(1)' : 'unset')};
  }
`;

// const ImageLoading = styled.div`
//   width: 0%;
//   height: 100%;
//   position: absolute;
//   background-color: #FB7EBB;
//   z-index: 12;
//   right: 0;
//   left: initial;
//   top: 0;
// `;

const Header = styled.div`
  margin-left: 25px;
  margin-right: 12px;
  margin-top: -37px;
  min-height: 51px;
`;

const Title = styled(ReactRevealText)`
  color: #FB7EBB;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 6px;
  text-transform: uppercase;
  perspective: 400px;
  line-height: 25px;
`;

const Description = styled.div`
  font-size: 11px;
  letter-spacing: 4px;
  color: #3c3c3e;
  z-index: 12;
  font-weight: 300;
  line-height: 20px;
  position: relative;
  margin-top: 10px;
  margin-left: 25px;
  margin-right: 25px;
`;

const HoverWrapper = styled.div`
  width: 236px;
  left: -50px;
  display: block;
  position: absolute;
  top: -35px;
  z-index: 0;
  background-color: white;
  overflow: hidden;
  height: calc(100% + 95px);
`;

const HoverLine = styled.div`
  background-Color: #FB7EBB;
  position: absolute;
  height: ${props => (props.top || props.bottom ? '2px' : '0px')};
  width: ${props => (props.left || props.right ? '2px' : '0px')};
  top: ${props => (props.top || props.right ? '0px' : 'unset')};
  bottom: ${props => (props.bottom || props.left ? '0px' : 'unset')};
  left: ${props => (props.top || props.left ? '0px' : 'unset')};
  right: ${props => (props.bottom || props.right ? '0px' : 'unset')};
  transition: all 0.2s;
  transition-delay: ${props => (props.top ? '0.6s' : props.right ? '0.4s' : props.bottom ? '0.2s' : '0s')};
  transition-timing-funtion: linear;
  ${Article}:hover & {
    width: ${props => ((props.top || props.bottom) && '100%')};
    transition-delay: ${props => (props.top ? '0s' : props.right ? '0.2s' : props.bottom ? '0.4s' : '0.6s')};
    height: ${props => ((props.left || props.right) && '100%')};
  }
`;

const ReadMore = styled.div`
  left: -82.5px;
  opacity: 0;
  bottom: -60px;
  letter-spacing: 5px;
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  transform: rotate(-90deg);
  color: #3c3c3e;
  text-transform: uppercase;
  transition: all 0.6s;
  ${Article}:hover & {
    opacity: 1;
    bottom: -35px;
  }
`;

class ArticleCard extends Component {
  state = { isReveal: false }

  componentDidMount() {
    setTimeout(() => this.setState({ isReveal: true }), 1000);
  }

  render() {
    const { data: { frontmatter, fields } } = this.props;
    const { isReveal } = this.state;
    return (
      <Article to={fields.slug}>
        <HoverWrapper>
          <ImageWrapper hover>
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {props => <Image hover url={frontmatter.thumbnail} style={props} />}
            </Spring>
          </ImageWrapper>
          <HoverLine top />
          <HoverLine right />
          <HoverLine bottom />
          <HoverLine left />
        </HoverWrapper>
        <Info>
          <Tag>{frontmatter.tag}</Tag>
          <Seperator>|</Seperator>
          <Date>{frontmatter.date}</Date>
        </Info>
        <ImageWrapper>
          {/* <Spring from={{ width: '0%' }} to={{ width: '100%' }} delay={200}>
            {props => <ImageLoading style={props} />}
          </Spring> */}
          <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {props => <Image url={frontmatter.thumbnail} style={props} />}
          </Spring>
        </ImageWrapper>
        <Header>
          <Title show={isReveal}>{frontmatter.title}</Title>
        </Header>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} delay={100}>
          {props => (<Description style={props}>
            {frontmatter.description}
          </Description>)}
        </Spring>
        <ReadMore>
            Read More
        </ReadMore>
      </Article>
    );
  }
}

export default ArticleCard;


import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ReactRevealText from 'react-reveal-text';
import { Spring, Transition } from 'react-spring';

import Layout from './layout';
import { media } from '../utils/media';
import SEO from './seo';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0px auto;
  position: relative;
  ::selection {
    background-color: #3c3c3e;
    color: #FFF;
  }
`;

const BlogInfo = styled.div`
  z-index: 21;
  letter-spacing: 3px;
  margin-top: 200px;
  margin-bottom: 15px;
  ${media.tablet`
    margin-top: 150px;
  `};
  ${media.phablet`
    margin-top: 120px;
  `};
`;

const Tag = styled.div`
  color: #3c3c3e;
  font-size: 12px;
  font-weight: 900;
  display: inline-block;
  z-index: 12;
  text-transform: uppercase;
  ${media.tablet`
    margin-left: 20px;
  `};
`;

const Seperator = styled.div`
  display: inline-block;
  width: 12px;
  font-size: 12px;
`;

const Date = styled.div`
  z-index: 12;
  color: #3c3c3e;
  display: inline-block;
  font-size: 12px;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: ${props => props.percent * 435}px;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
  ${media.tablet`
    height: ${props => props.percent * 400}px;
    width: 100%;
  `};
  ${media.thone`
    height: ${props => props.percent * 350}px;
    width: 100%;
  `};
  ${media.phablet`
    height: ${props => props.percent * 300}px;
    width: 100%;
  `};
`;

const TextWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled(ReactRevealText)`
  padding: 0 100px;
  position: absolute;
  top: -157px;
  color: #FB7EBB;
  font-weight: 900;
  z-index: 12;
  text-transform: uppercase;
  display: inline-block;
  font-size: 35px;
  letter-spacing: 16px;
  line-height: 50px;
  ${media.tablet`
    font-size: 30px;
    padding: 0 50px;
    letter-spacing: 14px;
    top: -150px;
    line-height: 45px;
  `};
  ${media.thone`
    font-size: 28px;
    padding: 0 20px;
    letter-spacing: 10px;
    top: -140px;
    line-height: 40px;
  `};
`;

const Content = styled.div`
  margin: 50px 100px 50px;
  position: relative;
  font-size: 13px;
  letter-spacing: 2px;
  z-index: 21;
  color: #3c3c3e;
  font-weight: 300;
  p {
    margin-bottom: 10px;
  }
  ::selection {
    background-color: #3c3c3e;
    color: #FFF;
  }
  ${media.tablet`
    margin: 50px 30px;
  `};
  ${media.thone`
    margin: 50px 20px;
  `};
`;

const More = styled.div`
  width: 100%;
  position: relative;
  margin: 100px 0px;
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
      height: 20px;
      background-color: #FB7EBB;
    }
  }
`;

class BlogLayout extends Component {
  state = {
    revealTitle: false,
    transition: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({ revealTitle: true }), 300);
  }

  componentWillUnmount() {
    this.setState({ transition: false });
  }

  render() {
    const { data: { markdownRemark: article } } = this.props;
    const { revealTitle, transition } = this.state;

    return (
      <>
        <SEO
          title={article.frontmatter.title}
          description={article.frontmatter.description}
          thumbnail={article.frontmatter.thumbnail}
        />
        <Layout>
          <Wrapper>
            <Spring
              from={{ opacity: 0, transform: 'matrix(1, 0, 0, 1, 0, -40)' }}
              to={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
              delay={200}
            >
              {props => (
                <BlogInfo style={props}>
                  <Tag>{article.frontmatter.tag}</Tag>
                  <Seperator> |</Seperator>
                  <Date>{article.frontmatter.date}</Date>
                </BlogInfo>
              )}
            </Spring>
            <Transition
              items={transition}
              from={{ percent: 0 }}
              enter={{ percent: 1 }}
              leave={{ percent: 0 }}
              trail={200}
            >
              {transition => transition && (props => <Thumbnail url={article.frontmatter.thumbnail} {...props} />)}
            </Transition>
            <TextWrapper>
              <Title show={revealTitle}>{article.frontmatter.title}</Title>
              <Spring
                from={{ opacity: 0, marginTop: 120 }}
                to={{ opacity: 1, marginTop: 80 }}
                delay={400}
              >
                {props => (
                  <Content dangerouslySetInnerHTML={{ __html: article.html }} style={props} />
                )}
              </Spring>
              <More>
                <Link to='/blog'>
                  Quay lại blog
                  <Spring
                    from={{ width: 0 }}
                    to={{ width: 200 }}
                  >
                    {props => (
                      <div style={props} />
                    )}
                  </Spring>
                </Link>
              </More>
            </TextWrapper>
          </Wrapper>
        </Layout>
      </>
    );
  }
}

export default BlogLayout;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        tag
        thumbnail
        date
      }
    }
  }
`;

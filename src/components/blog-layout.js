import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import ReactRevealText from 'react-reveal-text';
import { Spring, Transition } from 'react-spring';

import Layout from './layout';

const Wrapper = styled.div`
  transform: translate(-50%, calc(-50% + 30px));
  top: 50%;
  width: 800px;
  height: 435px;
  left: 50%;
  display: block !important;
  position: absolute;
  ::selection {
    background-color: #3c3c3e;
    color: #FFF;
  }
`;

const BlogInfo = styled.div`
  margin-left: 95px;
  z-index: 21;
  position: absolute;
  top: -46px;
  letter-spacing: 3px;
`;

const Tag = styled.div`
  color: #3c3c3e;
  font-size: 12px;
  font-weight: 900;
  display: inline-block;
  z-index: 12;
  text-transform: uppercase;
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
  width: 800px;
  height: 435px;
  background-image: url(${props => props.url});
  background-position: center;
  background-size: cover;
`;

const TextWrapper = styled.div`
  position: absolute;
  z-index: 21;
  top: 360px;
  width: 100%;
  margin-bottom: 250px;
`;

const Title = styled(ReactRevealText)`
  padding: 0 100px;
  position: relative;
  min-height: 115px;
  color: #FB7EBB;
  font-weight: 900;
  z-index: 12;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  font-size: 35px;
  letter-spacing: 16px;
  line-height: 50px;
`;

const Content = styled.div`
  margin-left: 100px;
  margin-right: 100px;
  position: relative;
  font-size: 13px;
  letter-spacing: 2px;
  z-index: 21;
  margin-bottom: 185px;
  margin-top: 80px;
  color: #3c3c3e;
  font-weight: 300;
  ::selection {
    background-color: #3c3c3e;
    color: #FFF;
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
        <Helmet
          title={article.frontmatter.title}
          meta={[
            { name: 'description', content: article.frontmatter.description },
            { name: 'image', content: article.frontmatter.thumbnail },
            { name: 'keywords', content: 'qckhnh' },
            { name: 'og:title', content: `${article.frontmatter.title} | qckhnh.com` },
            { name: 'og:url', content: `https://qckhnh.com${article.slug}` },
            { name: 'og:type', content: 'website' },
            { name: 'og:description', content: article.frontmatter.description },
            { name: 'og:image', content: article.frontmatter.thumbnail },
          ]}
        >
          <html lang="en" />
        </Helmet>
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
              from={{ height: 0 }}
              enter={{ height: 435 }}
              leave={{ height: 0 }}
              trail={200}
            >
              {transition => transition && (props => <Thumbnail url={article.frontmatter.thumbnail} style={props} />)}
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

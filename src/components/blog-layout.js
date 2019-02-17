import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ReactRevealText from 'react-reveal-text';
import { Spring, Transition } from 'react-spring';
import readingTime from 'reading-time';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';

import Layout from './layout';
import { media } from '../utils/media';
import SEO from './seo';

const STORAGE_KEY = 'qckhnh-settings';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0px auto;
  position: relative;
  color: ${props => props.settings.theme === 'dark' ? '#FFF' : '#3c3c3e'};
  background-color: ${props => props.settings.theme === 'dark' ? '#3c3c3e' : '#FFF'};
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
  ${media.phone`
    margin-bottom: 30px;
  `}
`;

const Tag = styled.div`
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
  display: inline-block;
  font-size: 12px;
`;

const TimeRead = styled(Tag)`
  float: right;
  ${media.tablet`
    margin-top: 2px;
    margin-left: 0px;
    margin-right: 20px;
  `};
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
  font-size: ${props => `${props.settings.fontSize}px`};
  letter-spacing: 2px;
  line-height: ${props => props.settings.lineHeight};
  z-index: 21;
  font-family: ${props => `${props.settings.font}, 'Roboto Mono', monospace`};
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
    color: ${props => props.settings.theme === 'dark' ? '#FFF' : '#3c3c3e'};
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
    span {
      z-index: 1;
      position: relative;
    }
    div {
      position: absolute;
      z-index: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      top: 15px;
      height: 20px;
      background-color: #FB7EBB;
    }
  }
`;

const DEFAULT_SETTINGS = {
  theme: 'light',
  font: 'Roboto Mono',
  fontSize: 13.5,
  lineHeight: 1.8,
}

class BlogLayout extends Component {
  state = {
    revealTitle: false,
    transition: true,
    settings: DEFAULT_SETTINGS,
  }

  componentDidMount() {
    const settings = localStorage.getItem(STORAGE_KEY);
    if (settings) {
      this.setState({ settings: JSON.parse(settings) })
    }
    setTimeout(() => this.setState({ revealTitle: true }), 300);
  }

  componentWillUnmount() {
    this.setState({ transition: false });
  }

  handleChangeSetting = (type, value) =>
    this.setState(
      state => ({ settings: { ...state.settings, [type]: value } }),
      () => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.settings)));

  handleResetSetting = () => this.setState({ settings: DEFAULT_SETTINGS }, () => localStorage.removeItem(STORAGE_KEY))

  render() {
    const { data: { markdownRemark: article } } = this.props;
    const { revealTitle, transition, settings } = this.state;

    return (
      <Layout settings={settings} changeSetting={this.handleChangeSetting} resetSetting={this.handleResetSetting}>
        <SEO
          title={article.frontmatter.title}
          description={article.frontmatter.description}
          thumbnail={article.frontmatter.thumbnail}
        />
        <Wrapper settings={settings}>
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
                <TimeRead>{readingTime(article.html).text}</TimeRead>
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
                <Content settings={settings} style={props}>
                  <ReactMarkdown
                    source={article.html}
                    escapeHtml={false}
                    renderers={{
                      link: (props) => {
                        if (props.href.endsWith('!')) {
                          return <a href={props.href.slice(0, -1)} target="_blank" rel="nofollow noreferrer noopener">{props.children}</a>;
                        }
                        return <a href={props.href}>{props.children}</a>;
                      },
                      paragraph: props => {
                        return props.children.map(item => {
                          if (item.props.value && item.props.value.includes('youtube ')) {
                            const youtubeId = item.props.value.substring(8);
                            return <YouTube
                              videoId={youtubeId}
                              opts={{ width: '100%' }}
                            />;
                          } else {
                            return item;
                          }
                        });
                      }
                    }}
                  />
                </Content>
              )}
            </Spring>
            <More settings={settings}>
              <Link to='/blog'>
                <Spring
                  from={{ width: 0 }}
                  to={{ width: 200 }}
                >
                  {props => (
                    <div style={props} />
                  )}
                </Spring>
                <span>Quay lại blog</span>
              </Link>
            </More>
          </TextWrapper>
        </Wrapper>
      </Layout>
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
        date(formatString: "DD-MM-YYYY")
      }
    }
  }
`;

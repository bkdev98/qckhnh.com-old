import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ReactRevealText from 'react-reveal-text';
import { Spring, Transition } from 'react-spring';
import readingTime from 'reading-time';

import Layout from './layout';
import { media } from '../utils/media';
import SEO from './seo';
import EmailSubscribe from './email-subscribe';

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
  background-repeat: no-repeat;
  ${media.tablet`
    height: ${props => props.percent * 400}px;
  `};
  ${media.thone`
    height: ${props => props.percent * 350}px;
    background-size: contain;
  `};
  ${media.phablet`
    height: ${props => props.percent * 300}px;
    background-size: contain;
  `};
`;

const TextWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled(ReactRevealText)`
  padding: 0 100px;
  position: absolute;
  top: -200px;
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
    top: -180px;
    line-height: 45px;
  `};
  ${media.thone`
    font-size: 28px;
    padding: 0 20px;
    letter-spacing: 10px;
    top: -170px;
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
  h1, h2, h3, h4, h5, p {
    margin-bottom: 20px;
  }
  h3 {
    line-height: 35px;
  }
  a {
    background-color: transparent;
    color: #FB7EBB;
    -webkit-text-decoration-skip: objects;
    text-decoration: none;
    box-shadow: 0 1px 0 0 #FB7EBB;
    font-weight: 500;
  }
  a:active,
  a:hover {
    outline-width: 0;
    box-shadow: 0 0 0 0;
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

const Serie = styled.div`
  margin: 80px 100px 0px;
  ${media.tablet`
    margin: 80px 30px 0px;
  `};
  ${media.thone`
    margin: 80px 20px 0px;
  `};
  border: 2px solid #FB7EBB;
  padding: 20px;
  font-size: 15px;
  a {
    color: #FB7EBB;
    text-decoration: none;
    box-shadow: 0px 2px 0px 0px #FB7EBB;
    :hover {
      box-shadow: 0px 0px 0px 0px #FB7EBB;
    }
  }
  ul {
    list-style: square;
    padding-left: 20px;
    margin-top: 10px;
  }
  li {
    margin-bottom: 0px;
  }
`;

const DEFAULT_SETTINGS = {
  theme: 'light',
  font: 'Roboto Mono',
  fontSize: 13.5,
  lineHeight: 1.8,
}

class TutorialLayout extends Component {
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

    // Active darkmode automatically
    const now = new window.Date();
    if (now.getHours() >= 18 || now.getHours() < 6) {
      this.handleChangeSetting('theme', 'dark');
    } else {
      this.handleChangeSetting('theme', 'light');
    }
  }

  componentWillUnmount() {
    this.setState({ transition: false });
  }

  handleChangeSetting = (type, value) =>
    this.setState(
      state => ({ settings: { ...state.settings, [type]: value } }),
      () => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.settings)));

  handleResetSetting = () => this.setState({ settings: DEFAULT_SETTINGS }, () => localStorage.removeItem(STORAGE_KEY))

  renderSerie = (data) => {
    const { data: { tutorial, serie } } = this.props;
    return data.length > 0 && (
      <Serie>
        <p>This tutorial belongs to serie <Link to={`/serie${serie && serie.fields.slug}`}>{tutorial.frontmatter.serie}</Link>:</p>
        <ul>
          {data.map(({ node }) => tutorial.frontmatter.title === node.frontmatter.title
            ? (
              <li key={node.fields.slug}>{node.frontmatter.title} (currently reading)</li>
            )
            : (
              <li key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            ))}
        </ul>
      </Serie>
    );
  }

  render() {
    const { data: { tutorial, sameSerie } } = this.props;
    const { revealTitle, transition, settings } = this.state;

    return (
      <Layout settings={settings} changeSetting={this.handleChangeSetting} resetSetting={this.handleResetSetting}>
        <SEO
          title={tutorial.frontmatter.title}
          description={tutorial.frontmatter.description}
          thumbnail={tutorial.frontmatter.thumbnail}
        />
        <Wrapper settings={settings}>
          <Spring
            from={{ opacity: 0, transform: 'matrix(1, 0, 0, 1, 0, -40)' }}
            to={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
            delay={200}
          >
            {props => (
              <BlogInfo style={props}>
                <Tag>{tutorial.frontmatter.tag}</Tag>
                <Seperator> |</Seperator>
                <Date>{tutorial.frontmatter.date}</Date>
                <TimeRead>{readingTime(tutorial.html).text}</TimeRead>
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
            {transition => transition && (props => <Thumbnail url={tutorial.frontmatter.thumbnail} {...props} />)}
          </Transition>
          <TextWrapper>
            <Title show={revealTitle}>{tutorial.frontmatter.title}</Title>
            {/* {this.renderSerie(sameSerie.edges)} */}
            <Spring
              from={{ opacity: 0, marginTop: 160 }}
              to={{ opacity: 1, marginTop: 120 }}
              delay={400}
            >
              {props => (
                <Content settings={settings} dangerouslySetInnerHTML={{ __html: tutorial.html }} style={props} />
              )}
            </Spring>
            {this.renderSerie(sameSerie ? sameSerie.edges : [])}
            <More settings={settings}>
              <Link to='/tutorials'>
                <Spring
                  from={{ width: 0 }}
                  to={{ width: 200 }}
                >
                  {props => (
                    <div style={props} />
                  )}
                </Spring>
                <span>Quay lại</span>
              </Link>
            </More>
          </TextWrapper>
          <EmailSubscribe />
        </Wrapper>
      </Layout>
    );
  }
}

export default TutorialLayout;

export const query = graphql`
  query($slug: String!, $serie: String) {
    tutorial: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        tag
        thumbnail
        serie
        date(formatString: "DD-MM-YYYY")
      }
    }
    serie: markdownRemark(frontmatter: { title: { eq: $serie } }) {
      fields {
        slug
      }
    }
    sameSerie: allMarkdownRemark(
      filter: { frontmatter: { serie: { eq: $serie } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
          }
        }
      }
    }
  }
`;

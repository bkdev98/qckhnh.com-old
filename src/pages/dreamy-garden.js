import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { media } from '../utils/media';
import image from '../images/dg-landing.gif';

const Container = styled.div`
  background: #fff;
  color: #202020;
  min-height: 100vh;
  font-family: 'Noto Serif', serif;
`;

const Wrapper = styled(Row)`
  padding: 120px calc(15% + 15px);
  min-height: calc(100vh - 240px);
  align-items: center;
  ${media.phablet`
    padding: 120px calc(6% + 15px);
    img {
      margin-top: 30px;
    }
  `};
`;

const Title = styled.h1`
  font-size: 58px;
  margin-bottom: 20px;
  font-family: 'Noto Serif', serif;
  font-weight: 300;
  letter-spacing: -.036em;
`;

const SubTitle = styled.p`
  font-size: 22px;
  margin-bottom: 30px;
  line-height: 28px;
  max-width: 70%;
  ${media.desktop`
    max-width: 100%;
  `};
`;

const Form = styled.form`
  margin: 10px 0px;
`;

const Input = styled.input`
  display: inline-block;
  max-width: 300px;
  color: #242424;
  background: #fff;
  padding: 10px 18px 11px;
  outline: 0;
  letter-spacing: 0.2px;
  border-radius: 4px;
  width: 100%;
  border: 1px solid rgba(0,0,0,.1);
  transition: .15s;
  margin: 5px;
  :hover {
    border-color: rgba(0,0,0,.2);
  }
  :focus {
    border-color: rgba(0,0,0,.4);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  background: #202020;
  margin: 5px;
  color: #fff;
  letter-spacing: 0.2px;
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 11px 20px 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,.1), 0 2px 4px rgba(0,0,0,.1);
  cursor: pointer;
  transition: .3s;
  :hover {
    box-shadow: 0 6px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.1);
    transition: .35s;
    transform: translateY(-2px);
  }
  ${media.thone`
    width: 100%;
    max-width: 300px;
    display: block;
  `};
`;

const Notification = styled.span`
  font-size: 14px;
  position: absolute;
  max-width: 100%;
`;

class DreamyGardenPage extends Component {
  state = { email: '', message: '', sending: false }

  handleChange = e => {
    this.setState({
      email: e.target.value,
      message: '',
    })
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ sending: true });
    const result = await addToMailchimp(this.state.email);
    if (result.result === 'success') {
      this.setState({
        email: '',
        message: 'Thank you for the subscription! Please check your email.',
        sending: false,
      })
    } else {
      if (result.msg.includes('already subscribed')) {
        this.setState({ message: 'You are already subscribed!', sending: false })
      } else {
        this.setState({ message: 'Something went wrong!', sending: false })
      }
    }
  }

  render() {
    const { email, message, sending } = this.state;

    return (
      <Layout>
        <SEO title='Dreamy Garden' />
        <Container>
          <Wrapper>
            <Col md={6} sm={12}>
              <Title>dreamy garden</Title>
              <SubTitle>Another mobile app which improves your sleep habit, except for it works this time.</SubTitle>
              <strong>Subscribe to get early access</strong>
              <Form onSubmit={this.handleSubmit}>
                <Input
                  value={email}
                  onChange={this.handleChange}
                  autoFocus
                  placeholder="Email"
                />
                <SubmitButton disabled={sending}>Subscribe</SubmitButton>
              </Form>
              <Notification>{message}</Notification>
            </Col>
            <Col md={6} sm={12}>
              <img alt="Dreamy Garden" src={image} width="605" />
            </Col>
          </Wrapper>
        </Container>
      </Layout>
    );
  }
}

export default DreamyGardenPage;
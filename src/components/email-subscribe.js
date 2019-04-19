import React, { useState } from 'react';
import styled from 'styled-components';
import addToMailchimp from 'gatsby-plugin-mailchimp';

import { media } from '../utils/media';

const Wrapper = styled.div`
  background: rgb(255, 229, 241);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0px;
  ${media.thone`
    margin: 0px 0px;
  `};
`;

const Title = styled.p.attrs({
  className: 'sub-title',
})`
  text-align: center;
  font-size: 15px;
  max-width: 400px;
  color: #202020;
`;

const Form = styled.form`
  margin: 10px auto 0px;
  display: flex;
`;

const Input = styled.input`
  display: inline-block;
  max-width: 300px;
  color: #242424;
  background: #fff;
  padding: 6px 14px 7px;
  outline: 0;
  letter-spacing: 0.2px;
  border: none;
  width: 100%;
  margin: 5px;
  font-size: 15px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  :hover {
    background: #FB7EBA;
  }
  background: #202020;
  margin: 5px;
  color: #fff;
  letter-spacing: 0.2px;
  border: none;
  outline: none;
  padding: 7px 16px 8px;
  cursor: pointer;
  font-size: 15px;
  min-width: 110px;
`;

const Notification = styled.span`
  font-size: 14px;
  max-width: 100%;
  color: #FB7EBA;
`;

const EmailSubscribe = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    const result = await addToMailchimp(email);
    if (result.result === 'success') {
      setEmail('');
      setMessage('Cảm ơn bạn, hãy kiểm tra email để xác nhận!');
      setSending(false);
    } else {
      if (result.msg.includes('already subscribed')) {
        setMessage('Bạn đã đăng ký theo dõi!');
        setSending(false);
      } else {
        setMessage('Có lỗi xảy ra!');
        setSending(false);
      }
    }
  }

  return (
    <Wrapper>
      <Title>Nhận email bài viết, thủ thuật và khoá học mới về lập trình mỗi tuần.</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (message) {
              setMessage('')
            }
          }}
          placeholder="Email"
        />
        <SubmitButton disabled={sending}>Đăng ký</SubmitButton>
      </Form>
      <Notification>{message}</Notification>
    </Wrapper>
  );
}

export default EmailSubscribe;

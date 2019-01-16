import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 99999;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 350px;
  background: white;
  max-width: 90%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h5`
  margin: 0;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  border: 0;
  outline: none;
  font-size: 20px;
  background: white;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 5px 15px 10px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 0px;
  select {
    outline: none;
    width: 150px;
  }
`;

const Theme = styled.span`
  font-weight: 500;
  color: ${props => props.selected ? '#FFF' : '#000'};
  background-color: ${props => !props.selected ? '#FFF' : '#000'};
  cursor: pointer;
`;

const DefaultButton = styled.div`
  background-color: white;
  font-size: 12px;
  padding: 2px 8px;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid #000;
  :hover {
    color: #FFF;
    background: #000;
    border: 1px solid #FFF;
  }
`;

const SettingModal = ({ open, onClose, settings, changeSetting, resetSetting }) => open && (
  <Overlay>
    <Wrapper>
      <Header>
        <Title>Settings</Title>
        <CloseButton onClick={onClose}>x</CloseButton>
      </Header>
      <Content>
        <SettingItem>
          <span>Theme:</span>
          <span>
            <Theme
              selected={settings.theme === 'dark'}
              onClick={() => changeSetting('theme', 'dark')}
            >
              Dark
            </Theme> | <Theme
              selected={settings.theme === 'light'}
              onClick={() => changeSetting('theme', 'light')}
            >
              Light
            </Theme>
          </span>
        </SettingItem>
        <SettingItem>
          <span>Font:</span>
          <span>
            <select value={settings.font} onChange={e => changeSetting('font', e.target.value)}>
              <option value='Roboto Mono'>Roboto Mono</option>
              <option value='Avenir Next'>Avenir Next</option>
              <option value='Courier'>Courier</option>
              <option value='Helvetica Neue'>Helvetica Neue</option>
            </select>
          </span>
        </SettingItem>
        <SettingItem>
          <span>Font size:</span>
          <Slider
            defaultValue={13.5}
            value={settings.fontSize}
            style={{ width: 145, marginTop: 7 }}
            handleStyle={{ border: 'solid 4px #3C3C3E' }}
            trackStyle={{ backgroundColor: '#3C3C3E' }}
            railStyle={{ backgroundColor: '#FFF' }}
            min={13}
            max={16}
            step={0.5}
            onChange={value => changeSetting('fontSize', value)}
          />
        </SettingItem>
        <SettingItem>
          <span>Line height:</span>
          <Slider
            defaultValue={1.8}
            value={settings.lineHeight}
            style={{ width: 145, marginTop: 7 }}
            handleStyle={{ border: 'solid 4px #3C3C3E' }}
            trackStyle={{ backgroundColor: '#3C3C3E' }}
            railStyle={{ backgroundColor: '#FFF' }}
            min={1.4}
            max={2.6}
            onChange={value => changeSetting('lineHeight', value)}
            step={0.2}
          />
        </SettingItem>
        <SettingItem>
          <DefaultButton onClick={resetSetting}>Reset to defaults</DefaultButton>
        </SettingItem>
      </Content>
    </Wrapper>
  </Overlay>
);

export default SettingModal;

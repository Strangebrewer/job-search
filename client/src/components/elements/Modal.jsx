import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MainButton, Input, TextArea } from '../../styles/components';

const Modal = props => {
  const [state, setState] = useState({});

  useEffect(() => {
    (function () {
      setInitialState();
    })();
  }, [props.items]);

  function setInitialState() {
    const newState = {};
    if (props.items) {
      for (let i = 0; i < props.items.length; i++) {
        const el = props.items[i];
        newState[el.label.toLowerCase()] = el.value || '';
      }
    }
    setState(newState);
  }

  function onOutsideClick(e) {
    if (e.target.className.includes('modal-wrapper')) {
      props.close()
    }
  }

  function callback() {
    props.callback(state);
    closeModal();
  }

  function callbackTwo() {
    props.callbackTwo(state);
    closeModal();
  }

  function closeModal() {
    setInitialState();
    props.close();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <Wrapper
      className="modal-wrapper"
      onMouseDown={onOutsideClick}
      show={props.show}
    >
      <Content show={props.show}>
        <CloseBtn onClick={props.close}>&times;</CloseBtn>
        <Body hasHeading={!!props.heading}>
          <h2>{props.heading ? props.heading : ''}</h2>
          {props.items && props.items.map((item, i) => {
            const itemValue = state[item.label.toLowerCase()];
            // if (itemValue === '' || (itemValue && itemValue.length)) {
            return (
              <InputWrapper key={i}>
                <label>{item.label}</label>
                {item.type === 'textarea' && (
                  <TextArea
                    type="text"
                    name={item.label.toLowerCase()}
                    onChange={handleInputChange}
                    value={itemValue}
                  />
                )}
                {item.type === 'text' && (
                  <Input
                    type="text"
                    name={item.label.toLowerCase()}
                    onChange={handleInputChange}
                    value={itemValue}
                    full
                  />
                )}
              </InputWrapper>
            )
            // }
          })}
          <ChildrenWrapper hasChildren={!!props.children}>
            {props.children}
          </ChildrenWrapper>
          <Buttons>
            {props.callback && (
              <MainButton
                onClick={callback}
                color="nGreen"
              >
                {props.confirmText || 'OK'}
              </MainButton>
            )}
            {props.showCallbackTwo && (
              <MainButton
                onClick={callbackTwo}
                color="nBlue"
              >
                {props.confirmTwoText || 'OK'}
              </MainButton>
            )}
            {props.close && props.callback && (
              <MainButton
                onClick={closeModal}
                color="nRed"
              >
                {props.cancelText || 'Close'}
              </MainButton>
            )}
          </Buttons>
        </Body>
      </Content>
    </Wrapper>
  )
}

export default Modal;

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  cursor: default;
  display: ${props => props.show ? 'flex' : 'none'};
  min-height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const ChildrenWrapper = styled.div`
  display: ${props => props.hasChildren ? 'block' : 'none'};
  line-height: 2;
  margin-bottom: ${props => props.hasChildren ? '12px' : '0px'};
  text-align: center;
`;

export const Content = styled.div`
  animation-duration: 0.4s;
  animation-name: fadein;
  background: linear-gradient(#800080aa, #800080aa),
    linear-gradient(#000, #000);
  border: 1px solid ${props => props.theme.nPurple};
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px #000,
    0 0 4px #000,
    0 0 8px #111,
    0 0 10px #111,
    0 0 20px #222,
    0 0 40px #aaa,
    inset 0 0 100px 30px rgb(0,0,0);
  display: ${props => props.show ? 'block' : 'none'};
  font-size: 1.2rem;
  margin: auto;
  max-width: 60%;
  min-width: 300px;
  padding: 0;
  position: relative;
  
  img {
    border: 1px solid black;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Body = styled.div`
  color: white;
  margin: auto;
  max-width: 100%;
  padding: 40px;
  text-align: left;
  z-index: 999;

  > h2 {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.3;
    max-width: 340px;
    text-align: center;
    ${props => props.hasHeading ? 'margin-bottom: 18px;' : null}
  }
`;

export const InputWrapper = styled.div`
  margin: auto;
  min-width: 240px;
  max-width: 240px;

  > label {
    color: white;
    display: block;
    font-size: 16px;
    margin-bottom: 10px;
    width: 100%;
  }

  > textarea {
    margin-bottom: 20px;
    max-width: 100%;
    min-width: 100%;
  }
  
  > input, > select {
    margin-bottom: 20px;
    width: 100%;
  }
`;

export const Buttons = styled.div`
  text-align: center;
  width: 100%;
`;

export const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  color: lightgrey;
  font-size: 20px;
  outline: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  
  &:hover, &:focus {
    color: #26d4cc;
    cursor: pointer;
    text-decoration: none;
  }
`;

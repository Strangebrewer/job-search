import styled from 'styled-components';

export const RedBlueButton = styled.button`
  background: #181818;
  border: 1px solid ${props => props.theme.mainRed};
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${props => props.theme.mainRed};
  color: ${props => props.theme.nBlue};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin: 0 12px;
  outline: transparent;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  ${props => props.height ? `height: ${props.height}px` : ''};
  ${props => props.width ? `min-width: ${props.width}px` : ''};
  ${props => props.text && 'padding: 4px 8px'};

  > i {
    align-self: center;
    display: block;
    margin: auto;
  }

  &:hover {
    background-color: ${props => props.theme.nBlue};
    color: ${props => props.theme.nRed};
  }

  &:disabled {
    border: 1px solid ${props => props.theme.mainRed + '99'};
    box-shadow: none;
    color: ${props => props.theme.nBlue + '99'};
    cursor: default;

    &:hover {
      background: #181818;
      color: ${props => props.theme.nBlue + '99'};
    }
  }
`;

export const PurpleGreenButton = styled.button`
  background: #181818;
  border: 1px solid ${props => props.theme.nPurple};
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${props => props.theme.nPurple};
  color: ${props => props.theme.nGreen};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin: 0 12px;
  outline: transparent;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  ${props => props.height ? `height: ${props.height}px` : ''};
  ${props => props.width ? `min-width: ${props.width}px` : ''};
  ${props => props.text && 'padding: 4px 8px'};

  > i {
    align-self: center;
    display: block;
    margin: auto;
  }

  &:hover {
    background-color: ${props => props.theme.nGreen};
    color: ${props => props.theme.nPurple};
  }

  &:disabled {
    border: 1px solid ${props => props.theme.nPurple + '99'};
    box-shadow: none;
    color: ${props => props.theme.nGreen + '99'};
    cursor: default;

    &:hover {
      background: #181818;
      color: ${props => props.theme.nGreen + '99'};
    }
  }
`;

export const MainButton = styled.button`
  background: #111;
  border: 1px solid ${props => props.theme[props.color]};
  border-radius: 5px;
  box-shadow: 4px 4px 4px ${props => props.theme[props.color]}77;
  color: ${props => props.theme[props.color]};
  cursor: pointer;
  font-weight: bold;
  margin-right: 16px;
  min-width: 80px;
  outline: transparent;
  padding: 6px 12px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme[props.color]};
    color: ${props => props.isLight ? '#222' : '#fff'};
  }

  &:disabled {
    background-color: ${props => props.theme.text + '44'};
    border: 1px solid ${props => props.theme.text + '99'};
    box-shadow: none;
    color: ${props => props.theme.bg + '99'};
  }
`;

export const Label = styled.label`
  display: inline-block;
  font-size: .9rem;
  margin-bottom: 4px;
  width: 100%;
`;

export const Input = styled.input`
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  box-shadow: inset 3px 3px 2px #777,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  height: ${props => props.height ? `${props.height}px` : '24px'};
  outline: transparent;
  padding: 2px 8px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const TextArea = styled.textarea`
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  box-shadow: inset 3px 3px 2px #777,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  height: ${props => props.height ? `${props.height}px` : '36px'};
  outline: transparent;
  padding: 2px 8px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const Select = styled.select`
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  box-shadow: inset 3px 3px 2px #777,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  height: ${props => props.height ? `${props.height}px` : '24px'};
  outline: transparent;
  padding: 2px 8px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const Form = props => {
  return (
    <StyledForm onSubmit={props.submit} style={props.style}>
      {props.children}
      <input hidden type="submit" />
    </StyledForm>
  )
};

export const ButtonContainer = styled.div`
  margin-left: 16px;
  margin-top: 16px;
  ${props => props.center ? 'text-align: center;' : null}

  > button:last-of-type {
    margin-right: 0;
  }
`;
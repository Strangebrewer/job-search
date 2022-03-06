import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../redux/actions/authActions';

const Header = props => {
  const history = useHistory();
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(history.location.pathname);
  }, [history.location.pathname]);

  function goTo(route, state) {
    history.push(route, state)
  }

  return (
    <Wrapper location={props.location}>
      <Nav bgType={props.bgType}>
        <div>
          <NavButton
            onClick={() => goTo('/')}
            title="I Want To Go Home!"
            disabled={location === '/'}
          >
            home
          </NavButton>
        </div>

        {props.authenticated
          ? (
            <div>
              <NavButton
                onClick={props.logout}
                title="logout"
              >
                logout
              </NavButton>
            </div>
          ) : (
            <div>
              <NavButton
                onClick={() => goTo('/login')}
                title="login"
              >
                login
              </NavButton>
            </div>
          )}
      </Nav>
      {props.children}
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, { logout })(Header);

const Wrapper = styled.div`
  padding-top: 16px;
  height: ${props => props.location === 'reading' ? '136px' : '100px'};
  width: 100%;
`;

function background(props) {
  const { strings } = props.theme;
  switch (props.bgType) {
    case 'rainbow':
    return 'linear-gradient(90deg, black, red, yellow, green, green, blue, indigo, black)';
    case 'hippie':
      return 'linear-gradient(90deg, black, indigo, green, lime, green, indigo, black)';
    default: return `
      linear-gradient(90deg,
        white,
        ${strings+'33'},
        ${strings+'88'},
        ${strings+'bb'},
        ${strings},
        ${strings},
        ${strings+'bb'},
        ${strings+'88'},
        ${strings+'33'},
        white)
    `;
  }
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 0 12px #333;
  background: ${background};

  > div {
    justify-content: center;
    transform: skew(-18deg);
    border-right: 1px solid grey;

    > button {
      transition: color .2s ease-in-out, text-shadow .2s ease-in-out;

      &:hover, &:disabled {
        color: white;
        text-shadow: 0 0 1px #000,
          0 0 2px #000000,
          0 0 3px #000000;
      }
    }

    &:last-of-type {
      border-right: none;
    }
  }
`;

const NavButton = styled.button`
  outline: transparent;
  border: none;
  background: transparent;
  transform: skew(18deg);
  text-align: center;
  min-width: 80px;
  height: 30px;
  cursor: pointer;
  font-family: Roboto;
  text-transform: capitalize;
  transition: transform ease-in-out .05s;

  &:hover, &:disabled {
    font-weight: 500;
  }

  &:disabled {
    cursor: default;
  }
`;

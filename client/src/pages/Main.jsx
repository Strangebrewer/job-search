import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/elements/Header';

const Main = props => {
  console.log('props.user:::', props.user);

  useEffect(() => {
    (function () {
      /**
       * Have it do a recursive search on load to find the subfolder or file that's in the url
       * Then it can trace back through all the parents and add them to a path array
       * Use that array to force otherwise closed folders to be open.
       */
    })();
  }, []);

  return (
    <Wrapper>
      <Header bgType="rainbow">
        <Title>Job Search</Title>
      </Header>

      {props.authenticated
        ? (
          <Description>
            <h3>Hi, {props.user.username}</h3>
          </Description>
        ) : (
          <Description>
            <h3>Hi There. You should go <Link to={'/login'} style={{ color: 'white' }}>login</Link></h3>
          </Description>
        )
      }
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

export default connect(mapStateToProps)(Main);

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.1rem;
  padding: 12px 0;
  text-align: center;
`;

const Description = styled.div`
  margin: 22px auto 0 auto;
  width: 620px;

  > h3 {
    color: ${props => props.theme.mainRed};
    font-weight: 500;
    font-size: 1.6rem;
    margin: 6px 10px 0 0;
  }
`;

import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Folder from '../components/elements/Folder';
import Header from '../components/elements/Header';

const FOLDERS = [
  {
    name: 'Home',
    children: [
      {
        name: 'First Subfolder',
        children: [{ name: 'Susie' }, { name: 'Fred' }]
      },
      { name: 'Second Subfolder', children: [] }
    ]
  },
  {
    name: 'Stuff',
    children: [{ name: 'Stuff Child One' }, { name: 'Stuff Chile Two' }]
  }
];

const Main = props => {
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
        <Title>The Monolith</Title>
      </Header>

      {props.authenticated
        ? (
          <Description>
            <h3>Hi, Authenticated User.</h3>
          </Description>
        ) : (
          <Description>
            <h3>Hi There.</h3>
          </Description>
        )
      }

      <FolderColumn>
        {FOLDERS.map(f => {
          return (
            <Folder key={f.name} folder={f} level={0} />
          )
        })}
      </FolderColumn>
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
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

  > button {
    background-color: transparent;
    color: ${props => props.theme.types};
    cursor: pointer;
    outline: transparent;
    border: none;
    font-weight: 500;
    font-size: 1.6rem;
    padding-left: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${props => props.theme.nPurple};
    }
  }
}

> p {
  margin-top: 12px;
  line-height: 1.5;

  > button {
    background-color: transparent;
    color: ${props => props.theme.types};
    cursor: pointer;
    font-size: 1rem;
    outline: transparent;
    border: none;
    padding-left: 0;
    padding-right: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${props => props.theme.nPurple};
    }
  }
}
`;

const FolderColumn = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 200px;
  bottom: 0;
  border: 1px solid red;
`;

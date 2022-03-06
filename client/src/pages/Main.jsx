import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/elements/Header';
import ModalButton from '../components/elements/ModalButton';
import RecruiterModal from '../components/RecruiterModal';

import { getRecruiters, saveRecruiter } from '../redux/actions/recruiterActions';

const Main = props => {
  console.log('props.user:::', props.user);

  const { recruiters } = props;

  useEffect(() => {
    console.log('props.recruiters:::', props.recruiters);
    (function () {
      if (!recruiters.length) {
        props.getRecruiters();
      }
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
            <ModalButton
              callback={props.saveRecruiter}
              title="add a new recruiter"
              modal={RecruiterModal}
            >
              Add New Recruiter
            </ModalButton>

            {recruiters && recruiters.length
              ? recruiters.map(rec => {
                return (
                  <div>
                    <p>{rec.name}</p>
                  </div>
                )
              }) : null}
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
    recruiters: state.recruiters,
    user: state.user
  };
}

const mapDispatchToProps = {
  getRecruiters,
  saveRecruiter,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

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

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/elements/Header';
import ModalButton from '../components/elements/ModalButton';
import JobModal from '../components/JobModal';
import RecruiterModal from '../components/RecruiterModal';

import JobCard from '../components/JobCard';

import { getRecruiters, saveRecruiter } from '../redux/actions/recruiterActions';
import { getJobs, saveJob } from '../redux/actions/jobActions';

const Main = props => {
  const [loading, setLoading] = useState(true);

  const { jobs, recruiters, authenticated, user } = props;

  useEffect(() => {
    (async function () {
      if (!recruiters.length) {
        await props.getRecruiters();
      }
      if (!jobs.length) {
        await props.getJobs();
      }
      setLoading(false);
    })();
  }, [recruiters.length, jobs.length]);

  const jobsHeader = {
    job_title: 'Job Title',
    company_name: 'Company Name',
    work_from: 'Office Type',
    status: 'Status'
  };

  return (
    <Wrapper>
      <Header bgType="rainbow">
        <Title>{authenticated ? `${user.username}'s ` : null}Job Search</Title>

        {authenticated
          ? (
            <Buttons>
              <ModalButton
                callback={props.saveRecruiter}
                title="add a new recruiter"
                modal={RecruiterModal}
              >
                Add New Recruiter
              </ModalButton>

              <ModalButton
                callback={props.saveJob}
                title="add a new job"
                modal={JobModal}
              >
                Add New Job
              </ModalButton>
            </Buttons>
          ) : null}
      </Header>

      {authenticated
        ? (
          <Container>
            <h3>Jerbs!</h3>
            <JobCard isHeader job={jobsHeader} />
            {!loading ? jobs.map(job => {
              return (
                <JobCard key={`job-card-${job._id}`} job={job} />
              )
            }) : null}
          </Container>
        ) : (
          <Container>
            <h3>Hi There. You should go <Link to={'/login'} style={{ color: 'white' }}>login</Link></h3>
          </Container>
        )
      }
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    jobs: state.jobs,
    recruiters: state.recruiters,
    user: state.user
  };
}

const mapDispatchToProps = {
  getJobs,
  getRecruiters,
  saveJob,
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

const Container = styled.main`
  margin: 22px auto 0 auto;
  width: 1000px;

  > h3 {
    color: ${props => props.theme.mainRed};
    font-weight: 500;
    font-size: 1.8rem;
    margin: 6px 0;
  }
`;

const Buttons = styled.div`
  margin-bottom: 12px;
  text-align: center;
`;

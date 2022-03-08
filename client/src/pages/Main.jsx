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
import { Label, Select } from '../styles/components';
import { STATUSES } from '../utils/constants';

const Main = props => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

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

  function filter({ target }) {
    const { name, value } = target;
    const query = {};
    if (name === 'status') query.status = value;
    else query.recruiter = value;
    props.getJobs(query);
  }

  const jobsHeader = {
    job_title: 'Job Title',
    company_name: 'Company Name',
    work_from: 'Office Type',
    status: 'Status'
  };

  return (
    <Wrapper>
      <Header bgType="rainbow">
        <Title>{`${user.username}'s `}Job Search</Title>

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
      </Header>

      {!loading && (
        <>
          <Filters>
            <div>
              <Label>Filter by Status</Label>
              <Select
                name="status"
                onChange={filter}
              >
                <option value="">select a status</option>
                {STATUSES.map(s => <option key={`filter-by-${s}`} value={s}>{s}</option>)}
              </Select>
            </div>

            <div>
              <Label>Filter by Recruiter</Label>
              <Select
                name="recruiter"
                onChange={filter}
              >
                <option value="">select a recruiter</option>
                {props.recruiters.map(r => <option key={`filter-by-${r._id}`} value={r._id}>{r.name}</option>)}
              </Select>
            </div>
          </Filters>

          <Container>
            <h3>Jerbs!</h3>
            <JobCard isHeader job={jobsHeader} />
            {jobs.map(job => {
              return (
                <JobCard key={`job-card-${job._id}`} job={job} />
              )
            })}
          </Container>
        </>
      )}
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

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;
`;

export const Title = styled.h1`
  font-size: 2.1rem;
  padding: 12px 0;
  text-align: center;
`;

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 400px;

  > div {
    width: 45%;
    > label, select {
      width: 100%;
    }
  }
`;

export const Container = styled.main`
  margin: 22px auto 0 auto;
  width: 1100px;

  > h3 {
    color: ${props => props.theme.mainRed};
    font-weight: 500;
    font-size: 1.8rem;
    margin: 6px 0;
  }
`;

export const Buttons = styled.div`
  margin-bottom: 12px;
  text-align: center;
`;

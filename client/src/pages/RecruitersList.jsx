import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Header from '../components/elements/Header';
import ModalButton from '../components/elements/ModalButton';
import RecruiterCard from '../components/RecruiterCard';
import RecruiterModal from '../components/RecruiterModal';

import { getJobs, saveJob } from '../redux/actions/jobActions';
import { getRecruiters, saveRecruiter } from '../redux/actions/recruiterActions';
import { Checkbox, Label, Select } from '../styles/components';
import { RATINGS } from '../utils/constants';

import { Buttons, Container, Filters, Title, Wrapper } from './Main';

const RecruitersList = props => {
  const [loading, setLoading] = useState(true);
  const [recruiter, setRecruiter] = useState(0);
  const [includeArchived, setIncludeArchived] = useState(false);

  const { jobs, recruiters, user } = props;

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
  }, []);
  

  function filter({ target }) {
    const { name, value, checked } = target;
    const query = {};

    if (name === 'recruiter') {
      if (value) query.rating = Number(value);
      setRecruiter(Number(value));
      if (includeArchived) query.includeArchived = includeArchived;
    }
    if (name === 'includeArchived') {
      if (checked) query.includeArchived = checked;
      setIncludeArchived(checked);
      if (recruiter) query.recruiter = recruiter;
    }

    props.getRecruiters(query);
  }

  const recruiterHeader = {
    company: 'Company Name',
    email: 'Email',
    name: 'Name',
    phone: 'Phone',
    rating: 'Rating',
  };


  return (
    <Wrapper>
      <Header bgType="rainbow">
        <Title>{`${user.username}'s `}Recruiters List</Title>

        {!loading && (
          <Buttons>
            <ModalButton
              callback={props.saveRecruiter}
              title="add a new recruiter"
              modal={RecruiterModal}
            >
              Add New Recruiter
            </ModalButton>
          </Buttons>
        )}
      </Header>

      {!loading && (
        <>
          <Filters>
            <div className='checkbox-wrap'>
              <Label>include archived:</Label>
              <Checkbox
                type="checkbox"
                name="includeArchived"
                value={includeArchived}
                checked={includeArchived}
                onChange={filter}
              />
            </div>

            <div className="select-wrap">
              <Label>Filter by Rating</Label>
              <Select name="recruiter" value={recruiter} onChange={filter}>
                <option value="">select a rating</option>
                {RATINGS.map(r => <option key={`rating-${r}`} value={r}>{r}</option>)}
              </Select>
            </div>
          </Filters>

          <Container>
            <h3>Recrooders!</h3>
            <RecruiterCard isHeader recruiter={recruiterHeader} />
            {recruiters.map(r => {
              return <RecruiterCard key={`rec-${r.name}`} recruiter={r} showingArchived={includeArchived} />
            })}
          </Container>
        </>
      )}
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(RecruitersList);

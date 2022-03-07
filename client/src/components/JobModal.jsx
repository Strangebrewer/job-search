import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { MainButton, Input, Label, Select } from '../styles/components';
import { Wrapper, Content, Body, Buttons, CloseBtn } from './elements/Modal';

const JobModal = props => {
  const [jobTitle, setJobTitle] = useState('');
  const [pocName, setPocName] = useState('');
  const [pocTitle, setPocTitle] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [workFrom, setWorkFrom] = useState('');
  const [comment, setComment] = useState('');

  const { job } = props;

  useEffect(() => {
    (function () {
      if (job) {
        if (job.job_title) setJobTitle(job.job_title);
        if (job.point_of_contact) setPocName(job.point_of_contact);
        if (job.poc_title) setPocTitle(job.poc_title);
        if (job.company_name) setCompany(job.company_name);
        if (job.company_address) setAddress(job.company_address);
        if (job.company_city) setCity(job.company_city);
        if (job.company_state) setState(job.company_state);
        if (job.recruiter) setRecruiter(job.recruiter);
        if (job.work_from) setWorkFrom(job.work_from);
      }
    })();
  }, []);

  function onOutsideClick({ target }) {
    if (target.className.includes('job-modal-wrapper')) {
      props.close();
    }
  }

  function callback() {
    const comments = job && Array.isArray(job.comments)
      ? job.comments
      : [];
    const data = { comments };

    if (jobTitle) data.job_title = jobTitle;
    if (pocName) data.point_of_contact = pocName;
    if (pocTitle) data.poc_title = pocTitle;
    if (company) data.company_name = company;
    if (address) data.company_address = address;
    if (city) data.company_city = city;
    if (state) data.company_state = state;
    if (recruiter) data.recruiter = recruiter;
    if (workFrom) data.work_from = workFrom;
    if (comment) data.comments.push(comment);

    props.callback(data);
    closeModal();
  }

  function closeModal() {
    props.close();
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case 'jobTitle':
        return setJobTitle(value);
      case 'pocName':
        return setPocName(value);
      case 'pocTitle':
        return setPocTitle(value);
      case 'company':
        return setCompany(value);
      case 'address':
        return setAddress(value);
      case 'city':
        return setCity(value);
      case 'state':
        return setState(value);
      case 'recruiter':
        if (value === 'none') return;
        return setRecruiter(value);
      case 'workFrom':
        return setWorkFrom(value);
      default:
        setComment(value);
    }
  }

  return (
    <Wrapper
      className='job-modal-wrapper'
      onMouseDown={onOutsideClick}
      show={props.show}
    >
      <Content show={props.show}>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        <Body>
          <FormWrapper>
            <div>
              <Label>job title</Label>
              <Input
                type="text"
                name="jobTitle"
                value={jobTitle}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>poc name</Label>
              <Input
                type="text"
                name="pocName"
                value={pocName}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>poc title</Label>
              <Input
                type="text"
                name="pocTitle"
                value={pocTitle}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>company</Label>
              <Input
                type="text"
                name="company"
                value={company}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>address</Label>
              <Input
                type="text"
                name="address"
                value={address}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>city</Label>
              <Input
                type="text"
                name="city"
                value={city}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>state</Label>
              <Input
                type="text"
                name="state"
                value={state}
                onChange={handleInputChange}
                full
              />
            </div>

            {props.recruiters && props.recruiters.length
              ? (
                <div>
                  <Label>recruiter</Label>
                  <Select
                    type="text"
                    name="recruiter"
                    value={recruiter}
                    onChange={handleInputChange}
                    full
                  >
                    <option value="none">select a recruiter</option>
                    {props.recruiters.map(rec => (
                      <option key={`rec-${rec._id}`} value={rec._id}>{rec.name}</option>
                    ))}
                  </Select>
                </div>
              ) : null}

            <div>
              <Label>work location</Label>
              <Select
                type="text"
                name="workFrom"
                value={workFrom}
                onChange={handleInputChange}
                full
              >
                <option value="remote">remote</option>
                <option value="hybrid">hybrid</option>
                <option value="on-site">on-site</option>
              </Select>
            </div>

            <div>
              <Label>comment</Label>
              <Input
                type="text"
                name="comment"
                value={comment}
                onChange={handleInputChange}
                full
              />
            </div>
          </FormWrapper>

          <Buttons>
            <MainButton
              onClick={callback}
              color="nGreen"
            >
              Save
            </MainButton>

            <MainButton
              onClick={closeModal}
              color="nRed"
            >
              Cancel
            </MainButton>
          </Buttons>
        </Body>
      </Content>
    </Wrapper>
  )
}

function mapStateToProps(state) {
  return {
    recruiters: state.recruiters
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  margin-bottom: 16px;

  > div {
    width: 50%;
    padding: 0 20px;
  }
`;

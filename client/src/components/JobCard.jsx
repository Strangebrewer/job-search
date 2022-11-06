import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { format } from 'date-fns';

import JobModal from "./JobModal";
import ModalButton from "./elements/ModalButton";
import Modal from "./elements/Modal";

import { STATUSES } from "../utils/constants";
import { capitalize } from "../utils/utils";

import { saveJob, deleteJob } from '../redux/actions/jobActions';

const JobCard = props => {
  const [expanded, setExpanded] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [height, setHeight] = useState('0px');

  const { job } = props;

  function toggleExpansion() {
    if (expanded) setTimeout(() => setVisibility('hidden'), 200);
    if (!expanded) setTimeout(() => setVisibility('visible'), 200);
    const numComments = job.comments && Array.isArray(job.comments) ? job.comments.length : 0;
    const calcHeight = 200 + (numComments * 32);
    setHeight(`${calcHeight}px`);
    setExpanded(!expanded);
  }

  function editJob(data) {
    data = { _id: job._id, ...data };
    props.saveJob(data);
  }

  function deleteJob() {
    props.deleteJob(job._id);
  }

  function toggleArchived() {
    props.saveJob({ _id: job._id, ...job, archived: !job.archived });
  }

  function addInterview(data) {
    let { number, date, time, interviewers } = data;
    const formatted = new Date(`${date}:${time}`);
    const interviews = job.interviews && Array.isArray(job.interviews) ? job.interviews : [];
    interviews.push({ number, date: formatted, interviewers: interviewers.split(',') });
    editJob({ interviews });
  }

  function updateStatus(data) {
    editJob(data);
  }

  function addComment(data) {
    const comments = job.comments && Array.isArray(job.comments) ? job.comments : [];
    comments.push({ comment: data.comment, date: new Date() });
    editJob({ comments });
  }

  function addApplyDate(data) {
    editJob({ date_applied: new Date(data['date applied']) })
  }

  function setResult(data) {
    const declined = data.result.split(' ')[0].toLowerCase();
    editJob({ declined });
  }

  const sharedModalProps = {
    modal: Modal,
    cancelText: "Cancel",
    confirmText: "Submit"
  };

  const interviewModalItems = [
    {
      label: 'number',
      type: 'text',
      placeholder: 'e.g. \'first\', \'second\''
    },
    {
      label: 'Date',
      type: 'date'
    },
    {
      label: 'Time',
      type: 'time'
    },
    {
      label: 'Interviewers',
      type: 'text'
    }
  ];

  return (
    <Card isHeader={props.isHeader}>
      <MainSection expanded={expanded}>
        {!props.isHeader
          ? (
            <ExpandButton onClick={toggleExpansion}>
              {expanded ? <span>&#9650;</span> : <span>&#9660;</span>}
            </ExpandButton>
          ) : null}

        <p className="title">{job.job_title}</p>
        <p className="name">{job.company_name}</p>
        <p className="from">{job.work_from}</p>
        <p className="status">{job.status}</p>
        <div>
          {!props.isHeader
            ? (
              <>
                <ModalButton
                  callback={addApplyDate}
                  title="add date applied"
                  items={[{ label: 'Date Applied', type: 'date' }]}
                  {...sharedModalProps}
                >
                  <i className="far fa-file" />
                </ModalButton>

                <ModalButton
                  callback={addInterview}
                  title="add an interview"
                  items={interviewModalItems}
                  heading="Interview Deets"
                  {...sharedModalProps}
                >
                  <i className="far fa-calendar-alt" />
                </ModalButton>

                <ModalButton
                  callback={toggleArchived}
                  title={`${job.archived ? 'restore' : 'archive'} job`}
                  heading={`Are you sure you want to ${job.archived ? 'archive' : 'restore'} this job?`}
                  {...sharedModalProps}
                >
                  <i className={`fas fa-${job.archived ? 'window-restore' : 'archive'}`} />
                </ModalButton>

                <ModalButton
                  callback={updateStatus}
                  title="update job status"
                  items={[{ label: 'Status', type: 'select', options: STATUSES }]}
                  {...sharedModalProps}
                >
                  <i className="fas fa-forward" />
                </ModalButton>

                <ModalButton
                  callback={addComment}
                  title="add a comment"
                  items={[{ label: 'Comment', type: 'textarea' }]}
                  {...sharedModalProps}
                >
                  <i className="far fa-comment" />
                </ModalButton>

                <ModalButton
                  callback={setResult}
                  title="set the result"
                  items={[{ label: 'Result', type: 'select', options: ['I declined', 'They declined', 'Ghosted', 'N/A'] }]}
                  {...sharedModalProps}
                >
                  <i className="fas fa-eject" />
                </ModalButton>

                <ModalButton
                  callback={deleteJob}
                  title="delete job"
                  heading="Are you sure you want to delete this job?"
                  {...sharedModalProps}
                >
                  <i className="fas fa-trash" />
                </ModalButton>

                <ModalButton
                  callback={editJob}
                  title="edit job data"
                  job={job}
                  modal={JobModal}
                >
                  <i className="far fa-edit" />
                </ModalButton>
              </>
            ) : (
              <h3 style={{ paddingRight: '30px' }}>Actions</h3>
            )}
        </div>
      </MainSection>

      {!props.isHeader
        ? (
          <Expandable expanded={expanded} visibility={visibility} height={height}>
            <div className="company">
              <div className="poc">
                <div>
                  <p className="job-card-modata-label">Point of Contact:</p>
                  <p>{job.point_of_contact || '-'}{job.poc_title ? ` - ${job.poc_title}` : null}</p>
                </div>

                <div>
                  <p className="job-card-modata-label">Company Location:</p>
                  <p>{job.company_address || '-'}</p>
                  <p>{job.company_city || '-'}, {job.company_state || '-'}</p>
                </div>
              </div>

              <div className="interviews">
                <p className="job-card-modata-label">Interviews:</p>
                {job.interviews && job.interviews.length
                  ? job.interviews.map(intr => (
                    <div key={intr.number + intr.date} style={{ display: 'flex', width: '220px', justifyContent: 'space-between', margin: '0 0 2px 12px' }}>
                      <p style={{ fontWeight: '400', color: 'white' }}>{intr.number} interview: </p>
                      <p style={{ color: 'lightgreen' }}>{format(new Date(intr.date), 'MMM dd - hh:mm aaa')}</p>
                    </div>
                  ))
                  : <p>-</p>
                }
              </div>
            </div>

            <div className="other-data">
              <div>
                <p className="job-card-modata-label">Recruiter:</p>
                <p>{job.recruiter
                  ? (props.recruiters.find(r => r._id === job.recruiter)).name
                  : '-'}</p>
              </div>

              <div className="applied">
                <p className="job-card-modata-label">Date Applied:</p>
                <p>{job.date_applied ? format(new Date(job.date_applied), 'MMMM dd, yyyy') : '-'}</p>
              </div>

              <div>
                <p className="job-card-modata-label">Declined?</p>
                {job.declined
                  ? (
                    <p>{
                      job.declined === 'ghosted'
                        ? 'ghosted'
                        : job.declined === 'n/a'
                          ? 'n/a'
                          : `${capitalize(job.declined)} declined`
                    }</p>
                  ) : 'n/a'}
              </div>
            </div>

            <div className="comments">
              <p className="job-card-modata-label">Comments:</p>
              {job.comments && job.comments.length
                ? job.comments.map(c => {
                  if (c.date) {
                    return (
                      <div key={`job-comment-${c.date}`} style={{ marginBottom: '6px' }}>
                        <p style={{ color: 'white' }}>{format(new Date(c.date), 'MMM dd hh:mm aaa')}</p>
                        <p>{c.comment}</p>
                      </div>
                    )
                  } else {
                    return <p key={c} style={{ marginBottom: '6px' }}>{c}</p>
                  }
                })
                : <p>-</p>}
            </div>
          </Expandable>
        ) : null}
    </Card>
  );
};

function mapStateToProps(state) {
  return {
    recruiters: state.recruiters
  };
}

const mapDispatchToProps = { deleteJob, saveJob };

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);

const Card = styled.div`
  border-bottom: 1px solid grey;
  ${props => props.isHeader ? 'border-top: 1px solid grey;' : null};
  ${props => props.isHeader ? 'font-size: 1.3rem;' : null};
  ${props => props.isHeader ? 'font-weight: 500;' : null};
  padding: 12px 0;
  position: relative;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding-bottom: ${props => props.expanded ? '12px' : '0'}; */

  > div {
    display: flex;
    justify-content: right;
    padding-right: 10px;
    width: 160px;

    > button {
      background: transparent;
      border: none;
      color: ${props => props.theme.nGreen};
      cursor: pointer;
      font-size: .8rem;
      padding: 0 4px;

      &:hover {
        color: ${props => props.theme.nPurple};
      }

      &:disabled {
        color: grey;
        cursor: default;
      }
    }
  }

  > .title {
    width: 260px;
    padding-left: 30px;
  }

  > .name {
    width: 280px;
  }

  > .from {
    width: 140px;
    text-align: center;
  }

  > .status {
    width: 100px;
    text-align: center;
  }
`;

const Expandable = styled.div`
  color: lightgreen;
  font-size: .8rem;
  opacity: ${props => props.expanded ? '1' : '0'};
  padding-right: 24px;
  padding-left: 24px;
  padding-top: ${props => props.expanded ? '12px' : '0px'};
  height: ${props => props.expanded ? props.height : '0px'};
  visibility: ${props => props.visibility};
  transition: height ${props => props.expanded ? '0.3s' : '0.6s'} ease-in-out,
    opacity ${props => props.expanded ? '0.3s ease-in-out 0.1s' : '0.3s ease-in-out'},
    height 0.3s ease-in-out,
    padding 0.3s ease-in-out;

  .job-card-modata-label {
    color: white;
    font-size: .9rem;
    margin-bottom: 4px;
  }

  > .company {
    display: flex;
    margin-bottom: 16px;

    > div {
      width: 50%;
    }

    > .poc {
      > div:first-child {
        margin-bottom: 12px;
      }
    }

    > .interviews {
      > div {

      }
    }
  }

  > .other-data {
    display: flex;
    padding-bottom: 16px;
    border-bottom: 1px solid purple;

    > div {
      width: 33%;
    }
  }

  > .comments {
    color: lightblue;
    padding-top: 16px;
  }
`;

const ExpandButton = styled.button`
  color: ${props => props.theme.nPurple};
  background-color: transparent;
  padding: 0;
  outline: transparent;
  border: none;
  position: absolute;
  left: 0;
`;

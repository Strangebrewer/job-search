import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const JobCard = props => {
  const [expanded, setExpanded] = useState(false);
  const [styles, setStyles] = useState({ maxHeight: '0px', visiblity: 'hidden' });
  const [visibility, setVisibility] = useState('hidden');

  const { job } = props;

  function toggleExpansion() {
    if (expanded) setTimeout(() => setVisibility('hidden'), 200);
    if (!expanded) setTimeout(() => setVisibility('visible'), 200);
    setExpanded(!expanded);
    setStyles(styles);
  }

  return (
    <Card isHeader={props.isHeader}>
      <MainSection expanded={expanded}>
        {!props.isHeader
          ? expanded
            ? <ExpandButton onClick={toggleExpansion}>&#9650;</ExpandButton>
            : <ExpandButton onClick={toggleExpansion}>&#9660;</ExpandButton>
          : null}

        <p className="title">{job.job_title}</p>
        <p className="name">{job.company_name}</p>
        <p className="from">{job.work_from}</p>
        <p className="status">{job.status}</p>
      </MainSection>

      {!props.isHeader
        ? (
          <MoData expanded={expanded} visibility={visibility}>
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
                    <div>
                      <p>{intr.number} interview</p>
                      <p>{intr.date}</p>
                      <div>
                        {intr.interviewers.map((dude, i) => {
                          if (i + 1 === intr.interviewers.length) {
                            return <p>{dude}</p>;
                          }
                          return <p>{dude}, </p>
                        })}
                      </div>
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
                <p>{job.date_applied || '-'}</p>
              </div>

              <div>
                <p className="job-card-modata-label">Result:</p>
                {job.declined
                  ? (
                    <p>{job.declined === 'ghosted' ? 'ghosted' : `${job.declined} declined`}</p>
                  ) : '-'}
              </div>
            </div>

            <div className="comments">
              <p className="job-card-modata-label">Comments:</p>
              {job.comments && job.comments.length
                ? job.comments.map(c => (
                  <p>{c}</p>
                ))
                : <p>-</p>}
            </div>
          </MoData>
        ) : null}
    </Card>
  );
};

function mapStateToProps(state) {
  return {
    recruiters: state.recruiters
  };
}

const mapDispatchToProps = {};

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

const MoData = styled.div`
  color: #b4b4b4;
  font-size: .8rem;
  opacity: ${props => props.expanded ? '1' : '0'};
  padding-right: 24px;
  padding-left: 24px;
  padding-top: ${props => props.expanded ? '12px' : '0px'};
  height: ${props => props.expanded ? '225px' : '0px'};
  visibility: ${props => props.visibility};
  transition: height ${props => props.expanded ? '0.3s' : '0.6s'} ease-in-out,
    opacity ${props => props.expanded ? '0.2s ease-in-out 0.1s' : '0.2s ease-in-out'},
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

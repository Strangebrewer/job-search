import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import RecruiterModal from "./RecruiterModal";
import ModalButton from "./elements/ModalButton";
import Modal from "./elements/Modal";

import { saveRecruiter, deleteRecruiter } from '../redux/actions/recruiterActions';
import { format } from "date-fns";

const RecruiterCard = props => {
  const [expanded, setExpanded] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [height, setHeight] = useState('0px');

  const { recruiter } = props;

  function toggleExpansion() {
    if (expanded) setTimeout(() => setVisibility('hidden'), 200);
    if (!expanded) setTimeout(() => setVisibility('visible'), 200);
    const numComments = recruiter.comments && Array.isArray(recruiter.comments) ? recruiter.comments.length : 0;
    const calcHeight = 32 + (numComments * 32);
    setHeight(`${calcHeight}px`);
    setExpanded(!expanded);
  }

  function editRecruiter(data) {
    data = { _id: recruiter._id, ...data };
    props.saveRecruiter(data);
  }

  function deleteRecruiter() {
    props.deleteRecruiter(recruiter._id);
  }

  function updateRating(data) {
    editRecruiter({ rating: Number(data.rating) });
  }

  function addComment(data) {
    const comments = recruiter.comments && Array.isArray(recruiter.comments) ? recruiter.comments : [];
    comments.push({ comment: data.comment, date: new Date() });
    editRecruiter({ comments });
  }

  const sharedModalProps = {
    modal: Modal,
    cancelText: "Cancel",
    confirmText: "Submit"
  };

  return (
    <Card>
      <MainSection>
        {!props.isHeader
          ? expanded
            ? <ExpandButton onClick={toggleExpansion}>&#9650;</ExpandButton>
            : <ExpandButton onClick={toggleExpansion}>&#9660;</ExpandButton>
          : null}

        <p className="rating">{recruiter.rating}</p>
        <p className="name">{recruiter.name}</p>
        <p className="company">{recruiter.company}</p>
        <p className="phone">{recruiter.phone}</p>
        <p className="email">{recruiter.email}</p>
        <div>
          {!props.isHeader
            ? (
              <>
                <ModalButton
                  callback={updateRating}
                  title="update job status"
                  items={[{ label: 'Rating', type: 'select', options: [1,2,3,4,5] }]}
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
                  callback={deleteRecruiter}
                  title="delete recruiter"
                  heading="Are you sure you want to delete this recruiter?"
                  {...sharedModalProps}
                >
                  <i className="fas fa-trash" />
                </ModalButton>

                <ModalButton
                  callback={editRecruiter}
                  title="edit recruiter data"
                  recruiter={recruiter}
                  modal={RecruiterModal}
                >
                  <i className="far fa-edit" />
                </ModalButton>
              </>
            ) : (
              <h3 style={{ paddingRight: '30px' }}>Actions</h3>
            )
          }
        </div>
      </MainSection>

      {
        !props.isHeader
          ? (
            <Expandable expanded={expanded} visibility={visibility} height={height}>
              <p className="recruiter-card-comment-label">Comments:</p>
              {recruiter.comments && recruiter.comments.length
                ? recruiter.comments.map(c => {
                  if (c.date) {
                    return (
                      <div key={`rec-comment-${c.date}`} style={{ marginBottom: '6px' }}>
                        <p style={{ color: 'white' }}>{format(new Date(c.date), 'MMM dd hh:mm aaa')}</p>
                        <p>{c.comment}</p>
                      </div>
                    )
                  } else {
                    return <p key={c} style={{ marginBottom: '6px' }}>{c}</p>
                  }
                })
                : <p>-</p>
              }
            </Expandable>
          )
          : null
      }
    </Card >
  )
}

function mapStateToProps(state) {
  return {
    recruiters: state.recruiters
  };
}

const mapDispatchToProps = { saveRecruiter, deleteRecruiter };

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterCard);

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

  > div {
    display: flex;
    justify-content: right;
    padding-right: 10px;
    width: 100px;

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

  > .rating {
    width: 80px;
    text-align: center;
    padding-left: 30px;
  }

  > .name {
    width: 200px;
  }

  > .company {
    width: 240px;
  }

  > .email {
    width: 260px;
  }

  > .phone {
    width: 120px;
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

  .recruiter-card-comment-label {
    color: white;
    font-size: .9rem;
    margin-bottom: 4px;
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

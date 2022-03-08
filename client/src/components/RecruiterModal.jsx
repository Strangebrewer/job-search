import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainButton, Input, Label, Select } from '../styles/components';
import { RATINGS } from '../utils/constants';
import { Wrapper, Content, Body, Buttons, CloseBtn } from './elements/Modal';

const RecruiterModal = props => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { recruiter } = props;

  useEffect(() => {
    (function () {
      if (recruiter) {
        if (recruiter.name) setName(recruiter.name);
        if (recruiter.company) setCompany(recruiter.company);
        if (recruiter.phone) setPhone(recruiter.phone);
        if (recruiter.email) setEmail(recruiter.email);
        if (recruiter.rating) setRating(recruiter.rating);
      }
    })();
  }, [recruiter]);

  function onOutsideClick({ target }) {
    if (target.className.includes('recruiter-modal-wrapper')) {
      props.close();
    }
  }

  function callback() {
    const comments = recruiter && Array.isArray(recruiter.comments)
      ? recruiter.comments
      : [];
    const data = { comments };

    if (name) data.name = name;
    if (company) data.company = company;
    if (phone) data.phone = phone;
    if (email) data.email = email;
    if (rating) data.rating = rating;
    if (comment) data.comments.push({ comment, date: new Date() });
    if (recruiter) data._id = recruiter._id;

    props.callback(data);
    closeModal();
  }

  function closeModal() {
    setName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setRating('');
    setComment('');
    props.close();
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'company':
        return setCompany(value);
      case 'phone':
        return setPhone(value);
      case 'email':
        return setEmail(value);
      case 'rating':
        return setRating(value);
      default:
        setComment(value);
    }
  }

  return (
    <Wrapper
      className='recruiter-modal-wrapper'
      onMouseDown={onOutsideClick}
      show={props.show}
    >
      <Content show={props.show}>
        <CloseBtn onClick={closeModal}>&times;</CloseBtn>
        <Body>
          <FormWrapper>
            <div>
              <Label>name</Label>
              <Input
                type="text"
                name="name"
                value={name}
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
              <Label>phone</Label>
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>email</Label>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                full
              />
            </div>

            <div>
              <Label>rating</Label>
              <Select
                type="text"
                name="rating"
                value={rating}
                onChange={handleInputChange}
                full
              >
                {RATINGS.map(r => <option key={`rating-${r}`} value={r}>{r}</option>)}
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
};

export default RecruiterModal;

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

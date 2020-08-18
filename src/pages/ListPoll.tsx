import React from 'react';
import styled from "styled-components";
import PollList from '../components/poll/PollList';
import CreatePollButton from '../components/button/CreatePollButton';

const ListPoll: React.FC = () => {
  return (
    <Container>
      <ButtonContainer>
        <CreatePollButton />
      </ButtonContainer>
      <PollList />
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  align-self: flex-end;
  margin-bottom: 32px;
`;

export default ListPoll;

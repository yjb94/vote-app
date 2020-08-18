import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import PollList from '../components/poll/PollList';

const ListPoll: React.FC = () => {
  return (
    <Container>
      <PollList />
      <CreatePoll
        to="/create"
      >
        +
      </CreatePoll>
    </Container>
  )
};

const Container = styled.div`
`;
const CreatePoll = styled(Link)`
`;

export default ListPoll;

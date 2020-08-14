import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const ListPoll: React.FC = () => {
  return (
    <Container>
      list poll
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

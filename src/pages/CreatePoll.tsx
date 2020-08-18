import React from 'react';
import styled from "styled-components";
import PollForm from '../components/form/PollForm';

const CreatePoll: React.FC = () => {
  return (
    <Container>
      <PollForm />
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default CreatePoll;

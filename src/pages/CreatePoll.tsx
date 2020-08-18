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
`;

export default CreatePoll;

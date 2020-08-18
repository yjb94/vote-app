import React from 'react';
import styled from "styled-components";
import PollForm from '../components/form/PollForm';
import { useParams } from 'react-router-dom';
import usePoll from '../hooks/usePoll';

const EditPoll: React.FC = () => {
  const { pollId } = useParams();
  const { polls } = usePoll();
  const poll = polls.find(p => p.id === pollId);

  return (
    <Container>
      <PollForm poll={poll}/>
    </Container>
  )
};

const Container = styled.div`
`;

export default EditPoll;

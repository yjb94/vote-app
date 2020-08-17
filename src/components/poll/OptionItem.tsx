import React from 'react';
import styled from "styled-components";
import { Progress } from 'antd';

const OptionItem: React.FC<{ poll: PollType, option: OptionType }> = ({
  poll,
  option
}) => {
  const percent = Math.floor(((option.votes || 0) / (poll.totalVotes || 0)) * 100);

  return (
    <Container>
      {option.title}
      <Progress status="active" percent={percent} />
    </Container>
  )
};

const Container = styled.div`
`;

export default OptionItem;

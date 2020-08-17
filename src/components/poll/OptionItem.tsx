import React from 'react';
import styled from "styled-components";
import { Progress } from 'antd';

const OptionItem: React.FC<{ poll: PollType, option: OptionType }> = ({
  poll,
  option
}) => {
  const percent = ((poll.totalVotes || 0) / (option.votes || 0)) * 100;

  return (
    <Container>
      {option.title}
      <Progress percent={percent} />
    </Container>
  )
};

const Container = styled.div`
`;

export default OptionItem;

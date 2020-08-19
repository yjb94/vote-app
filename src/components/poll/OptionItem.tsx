import React from 'react';
import styled from "styled-components";
import { Progress as AntdProgress, Typography } from 'antd';

const OptionItem: React.FC<{ poll: PollType, option: OptionType }> = ({
  poll,
  option
}) => {
  const percent = Math.floor(((option.votes || 0) / (poll.totalVotes || 0)) * 100);

  return (
    <Container>
      <Title>
        {option.title}
      </Title>
      <Progress status="active" percent={percent} />
    </Container>
  )
};

const Container = styled.div`
  display: flex;
`;

const Title = styled(Typography.Text)`
  flex: 1;
`;

const Progress = styled(AntdProgress)`
  flex: 1;
`;

export default OptionItem;

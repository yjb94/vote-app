import React from 'react';
import styled from "styled-components";
import usePoll from '../../hooks/usePoll';
import { Collapse } from 'antd';
import PollItem from './PollItem';
import { DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const PollList: React.FC = () => {
  const { polls } = usePoll();

  const getExtra = (poll: PollType) => {
    // TODO: render if poll's owner is current user
    // TODO: delete poll
    return <DeleteOutlined />
  }

  return (
    <Container accordion>
      {polls.map((poll, idx) =>
        <Panel header={poll.title} key={idx} extra={getExtra(poll)}>
          <PollItem poll={poll} />
        </Panel>
      )}
    </Container>
  )
};

const Container = styled(Collapse)`
`;

export default PollList;

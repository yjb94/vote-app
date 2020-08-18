import React from 'react';
import styled from "styled-components";
import usePoll from '../../hooks/usePoll';
import { Collapse, Popconfirm, Spin } from 'antd';
import PollItem from './PollItem';
import { DeleteOutlined } from '@ant-design/icons';
import useUser from '../../hooks/useUser';
import strings from '../../strings/strings';

const { Panel } = Collapse;

const PollList: React.FC = () => {
  const { me } = useUser();
  const { fetching, polls, deletePoll } = usePoll();

  if (fetching && polls.length === 0)
    return <Spin spinning />;

  const getExtra = (poll: PollType) => {
    if (poll.ownerId !== me?.id)
      return null;
    return (
      <Popconfirm
        title={strings["list.deleteMessage"]}
        onConfirm={() => {
          deletePoll(poll)
        }}
        placement="topRight"
      >
        <DeleteOutlined onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }} />
      </Popconfirm>
    )
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

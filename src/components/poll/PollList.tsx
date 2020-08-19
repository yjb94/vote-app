import React from 'react';
import styled from "styled-components";
import usePoll from '../../hooks/usePoll';
import { Collapse, Spin } from 'antd';
import PollItem from './PollItem';
import { SettingOutlined } from '@ant-design/icons';
import useUser from '../../hooks/useUser';
import { useHistory } from 'react-router-dom';

const { Panel } = Collapse;

const PollList: React.FC = () => {
  const { me } = useUser();
  const { fetching, polls } = usePoll();
  const history = useHistory();

  if (fetching && polls.length === 0)
    return <Spin spinning />;

  const getExtra = (poll: PollType) => {
    if (poll.ownerId !== me?.id)
      return null;
    return (
      <SettingOutlined 
        onClick={e => {
          history.push(`/edit/${poll.id}`);
        }}
      />
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

import React, { useState } from 'react';
import styled from "styled-components";
import moment from "moment";
import OptionItem from './OptionItem';
import { Badge } from 'antd';

const PollItem: React.FC<{ poll: PollType }> = ({
  poll
}) => {
  const today = moment();
  const [startDate] = useState<moment.Moment>(moment(poll.startDate));
  const [endDate] = useState<moment.Moment>(moment(poll.endDate));

  const periodText = `${startDate.format('YYYY/MM/DD')} ~ ${endDate.format('YYYY/MM/DD')}`;

  let status: 'default' | 'warning' | "processing" | 'error' = 'default';
  if(today.isBefore(startDate)) {
    status = 'warning';
  } else if(today.isBetween(startDate, endDate)) {
    status = 'processing';
  } else {
    status = 'error'
  }

  return (
    <Container>
      <Badge status={status} text={periodText}/>
      {poll.options.map(option =>
        <OptionItem key={option.id} poll={poll} option={option} />
      )}
    </Container>
  )
};

const Container = styled.div`
`;

export default PollItem;

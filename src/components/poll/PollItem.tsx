import React, { useState } from 'react';
import styled from "styled-components";
import moment from "moment";
import OptionItem from './OptionItem';
import { Badge, Radio, Button } from 'antd';
import strings from '../../strings/strings';
import { RadioChangeEvent } from 'antd/lib/radio';
import usePoll from '../../hooks/usePoll';

const PollItem: React.FC<{ poll: PollType }> = ({
  poll
}) => {
  const { votePoll } = usePoll();

  const today = moment();
  const [startDate] = useState<moment.Moment>(moment(poll.startDate));
  const [endDate] = useState<moment.Moment>(moment(poll.endDate));

  const [selectedOption, setSelectedOption] = useState<OptionType | undefined>(undefined);

  const onOptionChange = (e: RadioChangeEvent) => {
    setSelectedOption(e.target.value);
  }

  const onClickVote = () => {
    if(selectedOption)
      votePoll(poll, selectedOption);
  }

  let status: 'warning' | "processing" | 'error' = 'error';
  if (today.isBefore(startDate)) {
    status = 'warning';
  } else if (today.isBetween(startDate, endDate)) {
    status = 'processing';
  }

  const periodText = `${strings[status]} - ${startDate.format('YYYY/MM/DD')} ~ ${endDate.format('YYYY/MM/DD')}`;

  return (
    <Container>
      <Badge status={status} text={periodText} />
      <OptionsContainer onChange={onOptionChange} value={selectedOption}>
        {poll.options.map(option =>
          <OptionContainer key={option.id} value={option}>
            <OptionItem poll={poll} option={option} />
          </OptionContainer>
        )}
      </OptionsContainer>
      <Button
        disabled={!selectedOption}
        onClick={onClickVote}
      >
        {strings['list.voteButton']}
      </Button>
    </Container>
  )
};

const Container = styled.div`
`;
const OptionsContainer = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
`;
const OptionContainer = styled(Radio)`
  display: flex;
  align-items: center;
`;

export default PollItem;

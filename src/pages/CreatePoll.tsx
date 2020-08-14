import React, { useState } from 'react';
import styled from "styled-components";
import strings from '../strings/strings';
import { Typography, Button, DatePicker } from 'antd';
import faker from 'faker';
import moment from 'moment';
import usePoll from '../hooks/usePoll';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const createOptions = (length: number): OptionType[] => {
  return [...Array(length)].map((_, idx) => {
    return {
      id: faker.random.uuid(),
      title: `option ${idx + 1}`
    }
  })
}

const CreatePoll: React.FC = () => {
  const [title, setTitle] = useState<string>(strings['create.title']);
  const [options, setOptions] = useState<OptionType[]>(createOptions(3));
  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [endDate, setEndDate] = useState<moment.Moment>(moment().add(7, 'd'));

  const { polls, createPoll } = usePoll();

  const disabledDate = (current: moment.Moment) => {
    return startDate > current;
  };

  const onTitleChange = (str: string) => {
    setTitle(str);
  }
  const onOptionChange = (option: OptionType, str: string) => {
    const newOptions = options.map(each => each === option ? { ...each, title: str } : each);
    setOptions(newOptions);
  }
  const onChangeCalendar = (ranges: RangeValue<moment.Moment>) => {
    if(ranges) {
      ranges[0] && setStartDate(ranges[0]);
      ranges[1] && setEndDate(ranges[1]);
    }
  }

  const onClickCreate = () => {
    createPoll(title, options, startDate, endDate)
  }

  return (
    <Container>
      <Text
        editable={{
          onChange: onTitleChange
        }}
      >
        {title}
      </Text>
      <OptionsContainer>
        {options.map(option => {
          return (
            <Option
              key={option.id}
              editable={{
                onChange: (str: string) => onOptionChange(option, str)
              }}
            >
              {option.title}
            </Option>
          )
        })}
      </OptionsContainer>
      <RangePicker
        defaultValue={[startDate, endDate]}
        disabledDate={disabledDate}
        onCalendarChange={onChangeCalendar}
      />
      <CreateButton
        onClick={onClickCreate}
      >
        {strings["create.createButton"]}
      </CreateButton>
    </Container>
  )
};

const Container = styled.div`
`;
const OptionsContainer = styled.div`
`;
const Option = styled(Text)`
`;
const CreateButton = styled(Button)`
`;

export default CreatePoll;

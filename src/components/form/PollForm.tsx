import React, { useState } from 'react';
import styled from "styled-components";
import { Typography, Button, DatePicker, Popconfirm } from 'antd';
import faker from 'faker';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import strings from '../../strings/strings';
import { DeleteOutlined } from '@ant-design/icons';

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

const PollForm: React.FC<{ poll?:PollType }> = ({
  poll
}) => {
  const [title, setTitle] = useState<string>(poll?.title || strings['create.title']);
  const [options, setOptions] = useState<OptionType[]>(poll?.options || createOptions(3));
  const [startDate, setStartDate] = useState<moment.Moment>(moment(poll?.startDate));
  const [endDate, setEndDate] = useState<moment.Moment>(poll?.endDate ? moment(poll.endDate) : moment().add(7, 'd'));

  const { creating, createPoll, editPoll, deletePoll } = usePoll();
  const { me } = useUser();
  const history = useHistory();

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
    if (ranges) {
      ranges[0] && setStartDate(ranges[0]);
      ranges[1] && setEndDate(ranges[1]);
    }
  }

  const onClickCreate = () => {
    if (!me) {
      alert(strings["alert.noMe"]);
      history.push('/login');
      return;
    }
    if(poll) {
      editPoll({
        ...poll,
        title, options, startDate, endDate
      })
    } else {
      createPoll(title, options, startDate, endDate, me.id);
    }
    history.push('/');
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
        loading={creating}
      >
        {poll ? strings["edit.editButton"] : strings["create.createButton"]}
      </CreateButton>
      {poll &&
        <Popconfirm
          title={strings["list.deleteMessage"]}
          onConfirm={() => {
            deletePoll(poll)
            history.push('/');
          }}
        >
          <DeleteOutlined />
        </Popconfirm>
      }
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

export default PollForm;

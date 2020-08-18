import React, { useState } from 'react';
import styled from "styled-components";
import { Typography, Button, DatePicker, Popconfirm, Space } from 'antd';
import faker from 'faker';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import strings from '../../strings/strings';
import { DeleteOutlined } from '@ant-design/icons';
import EditableOptionItem from '../poll/EditableOptionItem';

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

const PollForm: React.FC<{ poll?: PollType }> = ({
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
  const onDeleteOption = (option: OptionType) => {
    const newOptions = options.filter(o => o.id !== option.id);
    if(newOptions.length === 0) {
      alert(strings["alert.minimumOption"]);
      return;
    }
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
    if (poll) {
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
    <Container direction="vertical">
      {poll &&
        <DeletePopconfirm
          title={strings["list.deleteMessage"]}
          onConfirm={() => {
            deletePoll(poll)
            history.push('/');
          }}
        >
          <DeleteOutlined />
        </DeletePopconfirm>
      }
      <Text
        editable={{
          onChange: onTitleChange
        }}
      >
        {title}
      </Text>
      <OptionsContainer direction="vertical">
        {options.map(option => {
          return (
            <EditableOptionItem
              key={option.id}
              option={option}
              editable={!!poll}
              onOptionChange={onOptionChange}
              onDeleteOption={onDeleteOption}
            />
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
    </Container>
  )
};

const Container = styled(Space)`
`;
const OptionsContainer = styled(Space)`
`;
const CreateButton = styled(Button)`
`;
const DeletePopconfirm = styled(Popconfirm)`
  float: right;
`;

export default PollForm;

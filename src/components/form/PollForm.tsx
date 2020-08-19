import React, { useState } from 'react';
import styled from "styled-components";
import { Typography, Button, DatePicker, Popconfirm, Space, Divider } from 'antd';
import faker from 'faker';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import usePoll from '../../hooks/usePoll';
import strings from '../../strings/strings';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import EditableOptionItem from '../poll/EditableOptionItem';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const createOption = (idx: number) => {
  return {
    id: faker.random.uuid(),
    title: `${strings["create.option.default"]} ${idx + 1}`
  }
}

const createOptions = (length: number): OptionType[] => {
  return [...Array(length)].map((_, idx) => {
    return createOption(idx);
  })
}

const PollForm: React.FC<{ poll?: PollType }> = ({
  poll
}) => {
  const [title, setTitle] = useState<string>(poll?.title || strings['create.title.default']);
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
    if (newOptions.length === 0) {
      alert(strings["alert.minimumOption"]);
      return;
    }
    setOptions(newOptions);
  }
  const onAddOption = () => {
    setOptions([...options, createOption(options.length)]);
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
    <Container>
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
      <Title
        level={4}
        editable={{
          onChange: onTitleChange
        }}
      >
        {title}
      </Title>
      <RangePickerContainer>
        <Text>
          {strings["create.range.label"]}
        </Text>
        <RangePicker
          defaultValue={[startDate, endDate]}
          disabledDate={disabledDate}
          onCalendarChange={onChangeCalendar}
        />
      </RangePickerContainer>
      <Divider />
      <OptionsContainer direction="vertical">
        {options.map((option, idx) => {
          return (
            <EditableOptionItem
              key={option.id}
              idx={idx + 1}
              option={option}
              onOptionChange={onOptionChange}
              onDeleteOption={onDeleteOption}
            />
          )
        })}
        <Button
          icon={<PlusOutlined />}
          size="small"
          shape="circle"
          onClick={onAddOption}
        />
      </OptionsContainer>
      <Divider />
      <CreateButton
        onClick={onClickCreate}
        loading={creating}
      >
        {poll ? strings["edit.editButton"] : strings["create.createButton"]}
      </CreateButton>
    </Container>
  )
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const RangePickerContainer = styled(Space)`
`;
const OptionsContainer = styled(Space)`
`;
const CreateButton = styled(Button)`
`;
const DeletePopconfirm = styled(Popconfirm)`
  position: absolute;
  top: 0;
  right: 0;
`;

export default PollForm;

import React, { useState } from 'react';
import styled from "styled-components";
import strings from '../strings/strings';
import { Typography, Button } from 'antd';
import faker from 'faker';

const { Text } = Typography;

const createOptions = (length: number): OptionType[] => {
  return [...Array(length)].map((_, idx) => {
    return {
      id: faker.random.uuid(),
      title: `option ${idx + 1}`
    }
  })
}

const CreatePoll: React.FC = () => {
  const [title, setTitle] = useState<string>(strings['create.title'])
  const [options, setOptions] = useState<OptionType[]>(createOptions(3))


  const onTitleChange = (str: string) => {
    setTitle(str);
  }
  const onOptionChange = (option: OptionType, str: string) => {
    const newOptions = options.map(each => each === option ? { ...each, title: str } : each);
    setOptions(newOptions);
  }
  const onClickCreate = () => {
    // TODO: create poll
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

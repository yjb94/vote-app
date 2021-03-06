import React from 'react';
import styled from "styled-components";
import { Typography, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import strings from '../../strings/strings';

interface EditableOptionItemProps {
  option: OptionType;
  idx: number;
  onOptionChange: (option: OptionType, str: string) => void;
  onDeleteOption: (option: OptionType) => void;
}

const EditableOptionItem: React.FC<EditableOptionItemProps> = ({
  option,
  idx,
  onOptionChange,
  onDeleteOption
}) => {
  const _onOptionChange = (str: string) => {
    if (str.length > 15) {
      alert(strings["alert.maxOptionTitle"]);
      return;
    }
    onOptionChange(option, str)
  }

  const _onDelete = () => {
    onDeleteOption(option);
  }

  return (
    <Container>
      <Typography.Text>
        {idx}.
      </Typography.Text>
      <Option
        key={option.id}
        editable={{
          onChange: _onOptionChange
        }}
      >
        {option.title}
      </Option>
      <DeleteButton
        icon={<CloseOutlined />}
        size="small"
        shape="circle"
        onClick={_onDelete}
      />
    </Container>
  )
};

const Container = styled(Space)`
`;
const Option = styled(Typography.Text)`
`;
const DeleteButton = styled(Button)`
`;

export default EditableOptionItem;

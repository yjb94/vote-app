import React from 'react';
import styled from "styled-components";
import { Typography, Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface EditableOptionItemProps {
  option: OptionType;
  editable: boolean;
  onOptionChange: (option: OptionType, str: string) => void;
  onDeleteOption: (option: OptionType) => void;
}

const EditableOptionItem: React.FC<EditableOptionItemProps> = ({
  option,
  editable,
  onOptionChange,
  onDeleteOption
}) => {
  const _onDelete = () => {
    onDeleteOption(option);
  }

  return (
    <Container>
      <Option
        key={option.id}
        editable={
          editable ? false : {
            onChange: (str: string) => onOptionChange(option, str)
          }
        }
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

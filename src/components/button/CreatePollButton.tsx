import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import strings from '../../strings/strings';
import { Link } from 'react-router-dom';

const CreatePollButton: React.FC = () => {

  return (
    <Container to="/create">
      <Button>
        {strings["create.createButton"]}
      </Button>
    </Container>
  );
};

const Container = styled(Link)`
`;

export default CreatePollButton;
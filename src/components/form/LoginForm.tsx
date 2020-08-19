import React from 'react';
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import styled from 'styled-components';
import strings from '../../strings/strings';
import useUser from '../../hooks/useUser';

const layout = {
  labelCol: {
    span: 8
  }
}

const LoginForm: React.FC = () => {
  const { fetching, signUp } = useUser();

  const onFinish = (values: Store) => {
    signUp(values.email, values.password);
  };

  return (
    <FormContainer
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <FormInputItem
        {...layout}
        label={strings["login.email.label"]}
        name="email"
        rules={[
          { required: true, message: strings["login.email.required"] },
          { type: 'email', message: strings["login.email.invalid"] },
        ]}
      >
        <Input />
      </FormInputItem>

      <FormInputItem
        {...layout}
        label={strings["login.password.label"]}
        name="password"
        rules={[{ required: true, message: strings["login.password.required"] }]}
      >
        <Input.Password />
      </FormInputItem>

      <ButtonContainer>
        <Button 
          type="primary"
          htmlType="submit"
          loading={fetching}
        >
          {strings["login.loginButton"]}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
};

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInputItem = styled(Form.Item)`
  width: 100%;
`;

const ButtonContainer = styled(Form.Item)`
  align-self: flex-end;
`;

export default LoginForm;
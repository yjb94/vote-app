import React from 'react';
import * as firebase from "firebase";
import { Form, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import styled from 'styled-components';
import strings from '../../strings/strings';

const layout = {
  labelCol: {
    span: 8
  }
}

const LoginForm: React.FC = () => {
  const onFinish = (values: Store) => {
    firebase.auth().createUserWithEmailAndPassword(values.username, values.password)
    .catch(error => {
      alert(error.message || error);
    })
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
        name="username"
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {strings["login.loginButton"]}
        </Button>
      </Form.Item>
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

export default LoginForm;
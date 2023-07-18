import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import HeaderShopee from "../../component/partials/header";
import FooterShopee from "../../component/partials/footer";
import {Button, Col, Form, Input, Row} from "antd";

function RegistrationForm() {
  const [errorLogin, setErrorLogin] = useState(null)

  const handleRegister = (values) => {
    const {email, password} = values
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Đăng kí thành công
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // Xử lý lỗi đăng kí
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleRegisterFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <HeaderShopee/>
      <Row style={{backgroundColor: 'white', height: '500px', marginTop: '30px', paddingTop: '50px'}}>
        <Col span={12} offset={6}>
          <h1 style={{textAlign: 'center'}}>Đăng Nhập</h1>
          {/*<h3 style={{textAlign: 'center'}}>Tài khoản: admin - Mật khẩu: 123</h3>*/}
          {errorLogin !== null && <p style={{color: 'red', textAlign: 'center'}}>{errorLogin}</p>}
          <Form
            style={{paddingLeft: '50px'}}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleRegister}
            onFinishFailed={handleRegisterFailed}
          >
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tài khoản!',
                },
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <FooterShopee/>
    </>
  );
}

export default RegistrationForm;

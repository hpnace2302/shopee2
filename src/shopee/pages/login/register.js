import React, {useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import HeaderShopee from "../../component/partials/header";
import FooterShopee from "../../component/partials/footer";
import {Button, Col, Form, Input, Row} from "antd";
import {Link, useHistory} from "react-router-dom";
import {useAuthValue} from "../../authContext";
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from '../../firebase'

function RegistrationForm() {
  const [errorLogin, setErrorLogin] = useState(null)
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()

  const history = useHistory()

  const handleRegister = (values) => {
    console.log(values);
    const {username, password, confirmPassword} = values;
    console.log(username, password);
    setError('')
    if(validatePassword(username, password, confirmPassword)) {
      // Create a new user with username and password using firebase
      createUserWithEmailAndPassword(auth, username, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              history.push('/verify-email')
            }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
  };

  const validatePassword = (email, password, confirmPassword) => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const handleRegisterFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <HeaderShopee/>
      <Row style={{backgroundColor: 'white', height: '500px', marginTop: '30px', paddingTop: '50px'}}>
        <Col span={12} offset={6}>
          <h1 style={{textAlign: 'center'}}>Đăng Nhập</h1>
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
              label="Mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
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
          <span>
            Bạn đã có tài khoản?
            <Link to='/login'>login</Link>
          </span>
        </Col>
      </Row>
      <FooterShopee/>
    </>
  );
}

export default RegistrationForm;

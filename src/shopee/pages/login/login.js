import React, {useState} from 'react'
import {Row, Col, Form, Input, Button} from 'antd'
import {Link, useHistory} from "react-router-dom";
import HeaderShopee from '../../component/partials/header'
import FooterShopee from '../../component/partials/footer'
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import {auth} from '../../firebase'

import 'antd/dist/antd.css';
import firebase from "firebase/compat";

const Login = () => {
  const [errorLogin, setErrorLogin] = useState(null)
  const [error, setError] = useState('');

  const history = useHistory()

  const onFinish = (values) => {
    const {username, password} = values
      signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Đăng nhập thành công
        const user = userCredential.user;
        history.push('/home')
        console.log(user);
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorLogin('Tài khoản hoặc mật khẩu của bạn không đúng!')
        console.log(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    // Tạo provider cho đăng nhập bằng Google
    const provider = new firebase.auth.GoogleAuthProvider();

    // Thực hiện đăng nhập bằng Google
    signInWithPopup(auth, provider)
      .then((result) => {
        // Đăng nhập thành công, chuyển hướng đến trang home
        console.log(result);
        history.push('/home');
      })
      .catch((error) => {
        // Xử lý lỗi đăng nhập
        setError(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <HeaderShopee/>
      <Row style={{backgroundColor: 'white', height: '500px', marginTop: '30px', paddingTop: '50px'}}>
        <Col span={12} offset={6}>
          <h1 style={{textAlign: 'center'}}>Đăng Nhập</h1>
          {/*<h3 style={{textAlign: 'center'}}>Tài khoản: admin - Mật khẩu: 123</h3>*/}
          {error !== null && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
          <button onClick={() => handleGoogleLogin()}>
            Đăng nhập với Google
          </button>
          <Link to='/register'>
            <button>Đăng ký</button>
          </Link>
        </Col>
      </Row>
      <FooterShopee/>
    </>
  )
}

export default React.memo(Login)

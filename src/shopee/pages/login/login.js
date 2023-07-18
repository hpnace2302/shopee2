import React,{useState} from 'react'
import {Row, Col, Form , Input, Button } from 'antd'
import { api } from '../../services/api'
import { helper } from '../../helper/common'
import {Link, useHistory} from "react-router-dom";
import HeaderShopee from '../../component/partials/header'
import FooterShopee from '../../component/partials/footer'
import { useAuthState } from 'react-firebase-hooks/auth';

import 'antd/dist/antd.css';
import firebase from "firebase/compat";
import slugify from "react-slugify";

// Khởi tạo Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB27BFAKwmzJomLokBE6-H29c4oHqay7as",
  authDomain: "shopee-fake-ba879.firebaseapp.com",
  projectId: "shopee-fake-ba879",
  storageBucket: "shopee-fake-ba879.appspot.com",
  messagingSenderId: "504216281323",
  appId: "1:504216281323:web:f1460901fe234ba7635eae",
});

// Lấy đối tượng auth từ Firebase
const auth = firebase.auth();

const Login = () => {
  // Sử dụng hook useAuthState để kiểm tra trạng thái đăng nhập của người dùng
  const [user] = useAuthState(auth);
  const [errorLogin, setErrorLogin] = useState(null)

  const history = useHistory()

  const onFinish = (values) => {
    const {email, password} = values
    firebase.auth().signInWithEmailAndPassword(email, password)
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
                <Input />
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
                <Input.Password />
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
            <button onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
              Đăng nhập với Google
            </button> // Nếu chưa có người dùng đăng nhập, hiển thị nút đăng nhập bằng Google
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

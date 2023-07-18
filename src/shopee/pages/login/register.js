import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import HeaderShopee from "../../component/partials/header";
import FooterShopee from "../../component/partials/footer";

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = () => {
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

    return (
        <>
            <HeaderShopee/>
            <div>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Mật khẩu" />
                <button onClick={handleRegister}>Đăng kí</button>
            </div>
            <FooterShopee/>
        </>
    );
}

export default RegistrationForm;

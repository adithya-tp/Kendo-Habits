import React from 'react';
import AuthModal from '../AuthModal/AuthModal';
import './Register.css';

const Register = () => {
    return (
        <div className="register__page">
            <div className="register__modal">
                <AuthModal register={true}/>
            </div>
        </div>
    );
}

export default Register;
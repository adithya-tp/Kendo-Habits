import React from 'react';
import AuthModal from '../AuthModal/AuthModal';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="signin__page">
            <div className="signin__modal">
                <AuthModal register={false} />
            </div>
        </div>
    );
}

export default SignIn;
import React from 'react';
import RegisterModal from '../RegisterModal/RegisterModal';
import SignInModal from '../SignInModal/SignInModal';

const AuthModal = ({ register, toggleMethod }) => {
    return (
        <div className="auth__modal">
            { register ? <RegisterModal toggleMethod={toggleMethod} /> : <SignInModal toggleMethod={toggleMethod} />}
        </div>
    );
}

export default AuthModal;
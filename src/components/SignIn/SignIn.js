import React from 'react';
import { useHistory } from 'react-router';
import AuthModal from '../AuthModal/AuthModal';
import './SignIn.css';

const SignIn = () => {
    const history = useHistory();
    const goBackHome = () => {
        history.push("/");
    }

    return (
        <div className="signin__page">
            <div className="back__arrow">
                <div className="back__title">
                    <h3>Back to Home</h3>
                </div>
                <svg id="more-arrows" onClick={goBackHome}>
                    <polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
                    <polygon class="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
                    <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
                </svg>
            </div>
            <div className="loving">
                <img src="assets/loving.png" alt=""/>
            </div>
            <div className="signin__modal">
                <AuthModal register={false} />
            </div>
        </div>
    );
}

export default SignIn;
import React, { useState } from 'react';
import './Home.css';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import AuthModal from '../AuthModal/AuthModal';
import { useHistory } from 'react-router';

const Home = () => {
    const history = useHistory();
    const showSignInPage = () => {
        history.push('/signin');
    }

    const showRegisterPage = () => {
        history.push('/register');
    }

    return (
        <div className="home__container">
            <div className="home__doodle">
                <img className="doodle-triangle" src="assets/doodle_triangle.png" alt=""/>
                <img className="doodle" src="assets/homee.png" alt=""/>
            </div>
            <div className="home__text">
                <div className="home__text-top">
                    <div className="top__line-one">
                        <h1>Kendo</h1>
                    </div>
                    <div className="top__line-two">
                        <h1>Habits</h1>
                    </div>
                </div>
                <div className="home__text-bottom">
                    <div className="bottom__line-one">
                        <h3>Building habits</h3>
                    </div>
                    <div className="bottom__line-two">
                        <h3 style={{"color": "#2856ec"}}>Gamified</h3>
                        <h3>!</h3>
                    </div>
                </div>
            </div>
            <div className="auth__buttons">
                {/* Add ripple effect for extra pizzazz */}
                <Ripple>
                    <div className="buttons__one">
                        <Button className="auth-button" primary={true} onClick={showSignInPage}>Sign-In</Button>
                        <Button className="auth-button" primary={true} onClick={showRegisterPage}>Register</Button>
                    </div>
                    <div className="buttons__two">
                        <Button className="login-with-google">Login with Google</Button>
                    </div>
                </Ripple>
            </div>
        </div>
    );
}

export default Home;
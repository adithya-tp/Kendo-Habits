import React, { useState } from 'react';
import './Home.css';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';
import AuthModal from '../AuthModal/AuthModal';

const Home = () => {
    const [signInModal, setSignInModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const showSignInModal = () => {
        setSignInModal(!signInModal);
    };

    const showRegisterModal = () => {
        setRegisterModal(!registerModal);
    };
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
                        <Button primary={true} onClick={showSignInModal}>Sign-In</Button>
                        <Button primary={true} onClick={showRegisterModal}>Register</Button>
                    </div>
                    <div className="buttons__two">
                        <Button>Login with Google</Button>
                    </div>
                </Ripple>
            </div>
            <div className="signin__modal">
                {
                    signInModal && <AuthModal register={false} toggleMethod={showSignInModal}/>
                }
            </div>

            <div className="register__modal">
                {
                    registerModal && <AuthModal register={true} toggleMethod={showRegisterModal}/>
                }
            </div>
        </div>
    );
}

export default Home;
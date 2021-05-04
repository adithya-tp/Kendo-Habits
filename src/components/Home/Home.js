import React from 'react';
import './Home.css';
import { Button } from '@progress/kendo-react-buttons';
import { Ripple } from '@progress/kendo-react-ripple';

const Home = () => {
    return (
        <div className="home__container">
            {/* <div className="home__doodle"> */}
                {/* <img className="doodle-triangle" src="assets/doodle_triangle.png" alt=""/>
                <img className="doodle" src="assets/homee.png" alt=""/> */}
            {/* </div> */}
            <div className="home__text">
                <div className="home__text-top">

                </div>
                <div className="home__text-bottom">

                </div>
            </div>
            <div className="auth__buttons">
                <Ripple>
                    <div className="buttons__one">
                        <Button
                            primary={true}
                        >
                            Sign-In
                        </Button>
                        <Button
                            primary={true}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="buttons__two">
                        <Button>
                            Login with Google
                        </Button>
                    </div>
                </Ripple>
            </div>
        </div>
    );
}

export default Home;
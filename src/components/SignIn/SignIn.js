import React from 'react';
import { useHistory } from 'react-router';
import AuthModal from '../AuthModal/AuthModal';
import './SignIn.css';
import { motion } from "framer-motion";

const SignIn = () => {
    const history = useHistory();
    const goBackHome = () => {
        history.push("/");
    }
    const modalVariants = {
        initial: {
            y: "100vh",
        },
        animate: {
            y: 0,
            transition: { ease: "easeInOut", duration: 1}
        },

        exit: {
            y: "200vh",
            transition: { ease: "easeInOut", duration: 1}
        }
    }

    return (
        <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className="signin__page">
                <div className="dancing">
                    <img src="assets/dance.png" alt=""/>
                </div>

                <div className="reading">
                    <img src="assets/reading-side.png" alt=""/>
                </div>
                <motion.div className="back__arrow">
                    <div className="back__title">
                        <h3>Back to Home</h3>
                    </div>
                    <div className="arrows">
                        <motion.svg whileHover={{ scale: 2 }} id="more-arrows" onClick={goBackHome}>
                            <polygon class="arrow-top" points="37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 "/>
                            <polygon class="arrow-middle" points="37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 "/>
                            <polygon class="arrow-bottom" points="37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 "/>
                        </motion.svg>
                    </div>
                </motion.div>
                <div className="loving">
                    <img src="assets/loving.png" alt=""/>
                </div>
                <div className="signin__modal">
                    <AuthModal register={false} />
                </div>
            </div>
        </motion.div>
    );
}

export default SignIn;
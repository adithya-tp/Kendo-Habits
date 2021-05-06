import { motion } from 'framer-motion';
import React from 'react';
import { useHistory } from 'react-router';
import AuthModal from '../AuthModal/AuthModal';
import './Register.css';

const Register = () => {
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
            className="register__page"
        >
            <div className="back__arrow">
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
            </div>
            <motion.div
                className="loving"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <img src="assets/loving.png" alt=""/>
            </motion.div>
            <motion.div 
                variants={modalVariants}
                exit="exit"
                className="meditating">
                <img src="assets/meditate.png" alt=""/>
            </motion.div>
            <motion.div 
                className="register__modal"
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <AuthModal register={true}/>
            </motion.div>
        </motion.div>
    );
}

export default Register;
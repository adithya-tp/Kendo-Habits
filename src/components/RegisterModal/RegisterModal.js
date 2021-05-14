import { Button } from '@progress/kendo-react-buttons';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import { Error, Hint } from '@progress/kendo-react-labels';
import { emailValidator, nameValidator, passwordValidator } from '../AuthModal/validators';

import React, { useState } from 'react';
import { FormInput } from '../AuthModal/FormInput';
import './RegisterModal.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';

const RegisterModal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    const history = useHistory();

    const { signup } = useAuth();

    async function handleSubmit() {
        if(name && email && password) {
            signup(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name
                });
                history.push("/user");
            })
            .catch((error) => {
                setAuthErrorMessage(error.message);
            });
        } else {
            setAuthErrorMessage("Empty Fields");
        }
    }

    return (
        <Card className="register__modal">
            <CardHeader className="register__modal-header">
                Register
            </CardHeader>
            <Form
                onSubmit={() => {}}
                render={(formRenderProps) => (
                    <FormElement style={{width: 400}}>
                        <Field
                            onChange={(e) => setName(e.target.value)}
                            id={'name'}
                            name={'name'}
                            label={'Name'}
                            type={'name'}
                            placeholder={'Enter your name...'}
                            component={FormInput}
                            validator={nameValidator}
                        />
                        <Field
                            onChange={(e) => setEmail(e.target.value)}
                            id={'email'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            placeholder={'Enter your email...'}
                            component={FormInput}
                            validator={emailValidator}
                        />
                        <div className="register__password-field" style={{ display: "flex", alignItems:"center"}}>
                            <Field
                                onChange={(e) => setPassword(e.target.value)}
                                id={'password'}
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                placeholder={'Enter your password...'}
                                component={FormInput}
                                validator={passwordValidator}
                            />
                            <motion.div whileTap={{ scale: 0.9 }} className="register__eye" style={{ borderRadius: "10px", boxShadow: "-2px 3px black", marginLeft: "30px", cursor: "pointer", margin: "20px 0 0 40px", padding:"10px 10px", backgroundColor:"#FDF074"}}>
                                <FontAwesomeIcon size='3x' icon={faEye} />
                            </motion.div>
                        </div>
                        <div className="k-form-buttons">
                            <Button
                                className="auth-modal sign-in-modal"
                                primary={true}
                                type={'submit'}
                                onClick={handleSubmit}
                                disabled={!formRenderProps.allowSubmit}
                            >
                                Build Habits!
                            </Button>
                            <Button 
                                className="auth-modal"
                                onClick={formRenderProps.onFormReset}
                            >
                                Clear
                            </Button>
                        </div>
                    </FormElement>

                )}
            >
            </Form>
            <Hint>
                Already have an account? &nbsp;&nbsp; <Link to="/login">Sign In</Link>
            </Hint>
            <Error>
                {authErrorMessage}
            </Error>
        </Card>
    );
}

export default RegisterModal;
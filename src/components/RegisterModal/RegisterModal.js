import { Button } from '@progress/kendo-react-buttons';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import React, { useState } from 'react';
import { FormInput } from '../AuthModal/FormInput';
import { emailValidator, nameValidator, passwordValidator } from '../AuthModal/validators';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import './RegisterModal.css';
import { Error, Hint } from '@progress/kendo-react-labels';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const RegisterModal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [authErrorMessage, setAuthErrorMessage] = useState('');

    const { signup } = useAuth();

    async function handleSubmit() {
        signup(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
        })
        .catch((error) => {
            setAuthErrorMessage(error.message);
        });
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
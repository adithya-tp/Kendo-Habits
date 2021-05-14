import { Button } from '@progress/kendo-react-buttons';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import { Error, Hint } from '@progress/kendo-react-labels';

import React, { useState } from 'react';
import { FormInput } from '../AuthModal/FormInput';
import { emailValidator, passwordValidator } from '../AuthModal/validators';
import './SignInModal.css';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignInModal = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    const history = useHistory();

    const { login } = useAuth();

    async function handleSubmit() {
        if(email && password) {
            login(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
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
        <Card className="signin__modal">
            <CardHeader className="signin__modal-header">
                Sign In
            </CardHeader>
            <Form
                onSubmit={() => {}}
                render={(formRenderProps) => (
                    <FormElement style={{width: 400}}>
                        <Field
                            onChange={(e) => setEmail(e.target.value)}
                            className="modal__field"
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
                Need an account? &nbsp;&nbsp; <Link to="/register">Register</Link>
            </Hint>
            <Error>
                {authErrorMessage}
            </Error>
        </Card>
    );
}

export default SignInModal;
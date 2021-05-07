import { Button } from '@progress/kendo-react-buttons';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import React from 'react';
import { FormInput } from '../AuthModal/FormInput';
import { emailValidator, nameValidator, passwordValidator } from '../AuthModal/validators';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import './RegisterModal.css';

const RegisterModal = () => {
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
                            id={'name'}
                            name={'name'}
                            label={'Name'}
                            type={'name'}
                            placeholder={'Enter your name...'}
                            component={FormInput}
                            validator={nameValidator}
                        />
                        <Field
                            id={'email'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            placeholder={'Enter your email...'}
                            component={FormInput}
                            validator={emailValidator}
                        />
                        <Field
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
        </Card>
    );
}

export default RegisterModal;
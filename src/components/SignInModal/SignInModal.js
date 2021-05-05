import { Button } from '@progress/kendo-react-buttons';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import React from 'react';
import { FormInput } from '../AuthModal/FormInput';
import { emailValidator, passwordValidator } from '../AuthModal/validators';

const SignInModal = ({ toggleMethod }) => {
    return (
        <Dialog title="Sign In" onClose={toggleMethod}>
            <Form
                onSubmit={() => {}}
                render={(formRenderProps) => (
                    <FormElement style={{width: 400}}>
                        <Field
                            id={'email'}
                            name={'email'}
                            label={'Email'}
                            type={'email'}
                            component={FormInput}
                            validator={emailValidator}
                        />
                        <Field
                            id={'password'}
                            name={'password'}
                            label={'Password'}
                            type={'password'}
                            component={FormInput}
                            validator={passwordValidator}
                        />
                        <div className="k-form-buttons">
                            <Button
                                primary={true}
                                type={'submit'}
                                disabled={!formRenderProps.allowSubmit}
                            >
                                Submit
                            </Button>
                            <Button onClick={formRenderProps.onFormReset}>
                                Clear
                            </Button>
                        </div>
                    </FormElement>

                )}
            >

            </Form>
        </Dialog>
    );
}

export default SignInModal;
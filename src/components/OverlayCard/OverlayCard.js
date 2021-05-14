import { Dialog } from '@progress/kendo-react-dialogs';
import { TextArea } from '@progress/kendo-react-inputs';
import { Field, FieldWrapper, Form, FormElement } from '@progress/kendo-react-form';
import { Hint, Label, Error } from '@progress/kendo-react-labels';
import React from 'react';
import './OverlayCard.css';

const FormTextArea = fieldRenderProps => {
    const {
        validationMessage,
        touched,
        label,
        id,
        valid,
        disabled,
        hint,
        type,
        optional,
        max,
        value,
        ...others
    } = fieldRenderProps;

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <TextArea valid={valid} type={type} id={id} disabled={disabled} maxLength={max} rows={4} {...others} />
                <Hint direction={'end'} style={{
                    position: 'absolute',
                    right: 0
                }}>
                    {value.length} / {max}
                </Hint>
                <Hint>{hint}</Hint>
            </div>
        </FieldWrapper>
    );
};

const OverlayCard = ({ habit, toggleExpand }) => {
    return (
        <Dialog className="overlay__card" title={habit.habit} onClose={() => toggleExpand(false)}>
            <div className="overlay__card-textarea">
                <Form
                    initialValues={{habitTextarea: ''}}
                    render={formRenderProps => <FormElement style={{
                        width: 250,
                        position: 'absolute'
                    }}>
                        <Field
                            id={'habitTextarea'}
                            name={'habitTextarea'}
                            label={'Description:'}
                            max={200}
                            value={formRenderProps.valueGetter('habitTextarea')}
                            hint={'Hint: Describe your habit'}
                            component={FormTextArea}
                        />
                    </FormElement>}
                />
            </div>
        </Dialog>
    );
}

export default OverlayCard;
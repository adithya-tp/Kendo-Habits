import { Dialog } from '@progress/kendo-react-dialogs';
import { TextArea } from '@progress/kendo-react-inputs';
import { Field, FieldWrapper, Form, FormElement } from '@progress/kendo-react-form';
import { Hint, Label } from '@progress/kendo-react-labels';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import React, { useState } from 'react';
import './OverlayCard.css';
import { Button } from '@progress/kendo-react-buttons';
import Switch from 'react-switch';

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
            <Label style={{ fontFamily: 'Arvo'}} editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <TextArea valid={valid} type={type} id={id} disabled={disabled} maxLength={max} rows={3} {...others} />
                <div className="textarea__hints">  
                    <div>
                        <Hint direction="end" className="hint__two" style={{ fontFamily: 'Arvo'}}>{value.length} / {max}</Hint>
                    </div>
                </div>
            </div>
        </FieldWrapper>
    );
};

const OverlayCard = ({ habit, toggleExpand }) => {
    const [value, setValue] = useState([]);
    const [checked, setChecked] = useState(habit.habitHistory[habit.habitHistory.length - 1]);

    const onChangeLabel = (e) => {
        setValue([...e.value]);
        console.log(value);
    };

    function handleSwitchChange(checked) {
        setChecked(checked);
    }

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

            <div className="multiselect__area">
                <div>Habit Labels:</div>
                <MultiSelect autocomplete="on" data={habit.habitLabels} onChange={onChangeLabel} value={value} />
            </div>
            

            <div className="habit__buttons">
                <Button className="save-habbit__button">Save Changes</Button>
                <Button className="delete-habit__button">Delete Habit</Button>
            </div>

            <div className="habit__switch">
                <Switch 
                    height={60}
                    width={300}
                    offColor="#c5221d"
                    offHandleColor="#f75a55"
                    disabled={checked} 
                    onChange={handleSwitchChange} 
                    checked={checked}
                />
            </div>
        </Dialog>
    );
}

export default OverlayCard;
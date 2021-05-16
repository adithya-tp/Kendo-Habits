import { Dialog } from '@progress/kendo-react-dialogs';
import { TextArea } from '@progress/kendo-react-inputs';
import { Field, FieldWrapper, Form, FormElement } from '@progress/kendo-react-form';
import { Hint, Label } from '@progress/kendo-react-labels';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import React, { useState } from 'react';
import './OverlayCard.css';
import { Button } from '@progress/kendo-react-buttons';
import Switch from 'react-switch';
import { db } from '../../firebase';
import pavlov from '../../pavlov/pavlov1.mp3';

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
                <TextArea value={value} valid={valid} type={type} id={id} disabled={disabled} maxLength={max} rows={3} {...others} />
                <div className="textarea__hints">  
                    <div>
                        <Hint direction="end" className="hint__two" style={{ fontFamily: 'Arvo'}}>{value.length} / {max}</Hint>
                    </div>
                </div>
            </div>
        </FieldWrapper>
    );
};

const OverlayCard = ({ user, habit, toggleExpand }) => {
    const [value, setValue] = useState([...habit.habitLabels]);
    const [description, setDescription] = useState([]);
    const [checked, setChecked] = useState(habit.habitHistory[habit.habitHistory.length - 1]);
    const today = new Date(Date.now());

    const handleChange = (event) => {
        const values = event.target.value;
        const lastItem = values[values.length - 1];
    
        if (lastItem) {
            values.pop();
            const sameItem = values.find((value) => value === lastItem);
        
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }
    
        setValue(values);
    };

    const updateHabitDone = () => {

        habit.habitHistory[habit.habitHistory.length - 1] = true;
        habit.habitCounts[today.getMonth()] += 1;
        
        db.collection('users')
        .doc(user.uid)
        .collection('dailyHabits')
        .doc(habit.id)
        .update({
            habitHistory: habit.habitHistory,
            habitCounts: habit.habitCounts,
        })
    }

    const updateHabitDetails = () => {
        toggleExpand(false);

        db.collection('users')
        .doc(user.uid)
        .collection('dailyHabits')
        .doc(habit.id)
        .update({
            habitDescription: description,
            habitLabels: value
        })
    }

    async function handleSwitchChange(checked) {
        setChecked(checked);
        await updateHabitDone();
        new Audio(pavlov).play();
    }

    return (
        <Dialog className="overlay__card" title={habit.habit} onClose={() => toggleExpand(false)}>
            <div className="overlay__card-textarea">
                <Form
                    initialValues={{habitTextarea: habit.habitDescription}}
                    render={formRenderProps => <FormElement style={{
                    }}>
                        <Field
                            id={'habitTextarea'}
                            name={'habitTextarea'}
                            label={'Description:'}
                            max={200}
                            value={habit.habitDescription}
                            hint={'Hint: Describe your habit'}
                            component={FormTextArea}
                            onChange={() => setDescription(formRenderProps.valueGetter('habitTextarea'))}
                        />
                    </FormElement>}
                />
            </div>

            <div className="multiselect__area">
                <MultiSelect data={habit.habitLabels} onChange={handleChange} value={value} />
            </div>
            

            <div className="habit__buttons">
                <Button className="save-habbit__button" onClick={updateHabitDetails}>Save Changes</Button>
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
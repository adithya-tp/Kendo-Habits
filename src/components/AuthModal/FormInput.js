import { FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Label, Error, Hint } from '@progress/kendo-react-labels';

export const FormInput = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <Input
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    {...others}
                />
                {
                    showHint &&
                    <Hint id={hintId}>{hint}</Hint>
                }
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};
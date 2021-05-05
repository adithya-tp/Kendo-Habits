import { Dialog } from '@progress/kendo-react-dialogs';
import React from 'react';

const RegisterModal = ({ toggleMethod }) => {
    return (
        <Dialog title="Register" onClose={toggleMethod}>
            <div>
                Register!
            </div>
        </Dialog>
    );
}

export default RegisterModal;
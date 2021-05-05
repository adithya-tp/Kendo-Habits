import { Dialog } from '@progress/kendo-react-dialogs';
import React from 'react';

const SignInModal = ({ toggleMethod }) => {
    return (
        <Dialog title="Sign In" onClose={toggleMethod}>
            <div>
                Sign In!
            </div>
        </Dialog>
    );
}

export default SignInModal;
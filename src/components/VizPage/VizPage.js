import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../../firebase';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import './VizPage.css';

const VizPage = () => {

    const [currentUser, setCurrentUser] = useState();
    const [appbarDisplay, setAppbarDisplay] = useState('');
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setCurrentUser(authUser);
                setAppbarDisplay(authUser.displayName);
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    });

    return (
        <div className="viz__page">
            <HabitAppBar userName={appbarDisplay} />
        </div>
    );
}

export default VizPage;
import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
// import { useAuth } from '../../contexts/AuthContext';
import { auth, db } from '../../firebase';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import HabitCard from '../HabitCard/HabitCard';
import './DailyHabits.css';
import firebase from 'firebase';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog } from '@progress/kendo-react-dialogs';
import { useHistory } from 'react-router';
import OverlayCard from '../OverlayCard/OverlayCard';
import { Hint } from '@progress/kendo-react-labels';

const DailyHabits = () => {

    const [currentUser, setCurrentUser] = useState();
    const [appbarDisplay, setAppbarDisplay] = useState('');
    const history = useHistory();
    const [habits, setHabits] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setCurrentUser(authUser);

                setAppbarDisplay(authUser.displayName);
                db.collection('users')
                .doc(authUser.uid)
                .collection('dailyHabits')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setHabits(
                        snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                habit: doc.data().habit,
                                habitDescription: doc.data().habitDescription,
                                habitLabels: doc.data().habitLabels,
                                habitHistory: doc.data().habitHistory,
                            })
                        )
                    )
                });
            } else {
                history.push('/');
                // setAppbarDisplay('');
            }
        });
        console.log(habits);
        return unsubscribe;
    }, []);

    const addHabit = (e) => {
        e.preventDefault();
        db.collection('users')
        .doc(currentUser.uid)
        .collection('dailyHabits')
        .add({
            habit: input,
            habitDescription: '',
            habitLabels: ['all'],
            habitHistory: [0],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    const [expandMe, setExpandMe] = useState(false);
    const [habitOverlay, setHabitOverlay] = useState();

    return (
        <div className="habits_container">
            <HabitAppBar userName={appbarDisplay} />
            <h1> Your daily habits...</h1>
            <ol className="habit__list">
                <div className="daily__habits-input">
                    <div className="input__hint">
                        <Input max={50} value={input} onChange={(e) => setInput(e.target.value)} />
                        <Hint direction="start">{!input && "Add a new habit"}</Hint>
                    </div>
                    <Button disabled={!input.length} onClick={addHabit}>Add Habit</Button>
                </div>
                {
                    habits.map((habit) => (
                        <div 
                            key={habit.id}
                            className="daily__habit-wrapper"
                            onClick={(e) => {
                                // console.log("clicked");
                                setHabitOverlay(habit);
                                console.log(habitOverlay);
                                setExpandMe(!expandMe);
                                // console.log(expandMe);
                            }}
                        >
                            <HabitCard key={habit.id} title={habit.habit} />
                        </div>
                        
                    ))
                }
            </ol>
            {
                expandMe && 
                (
                    <OverlayCard habit={habitOverlay} toggleExpand={setExpandMe} />
                )
            }
        </div>
    );
}

export default DailyHabits;
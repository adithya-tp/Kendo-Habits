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
        console.log(currentUser.uid);
        db.collection('users')
        .doc(currentUser.uid)
        .collection('dailyHabits')
        .add({
            habit: input,
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
                    <Input max={50} value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={!input.length} onClick={addHabit}>Add Item</Button>
                </div>
                {
                    habits.map((habit) => (
                        <div 
                            key={habit.id}
                            className="daily__habit-wrapper"
                            onClick={(e) => {
                                // console.log("clicked");
                                setHabitOverlay(habit);
                                // console.log(habitOverlay);
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
                    <Dialog className="overlay__card" title={habitOverlay.habit} onClose={() => setExpandMe(false)}>
                        <h3>Description</h3>
                    </Dialog>
                )
            }
        </div>
    );
}

export default DailyHabits;
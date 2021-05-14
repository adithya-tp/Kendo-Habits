import { Input } from '@progress/kendo-react-inputs';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import HabitCard from '../HabitCard/HabitCard';
import './DailyHabits.css';
import firebase from 'firebase';
import { Button } from '@progress/kendo-react-buttons';
import { useHistory } from 'react-router';
import OverlayCard from '../OverlayCard/OverlayCard';
import { Hint } from '@progress/kendo-react-labels';
import { motion } from 'framer-motion';
import { Dialog } from '@progress/kendo-react-dialogs';

const DailyHabits = () => {

    const [currentUser, setCurrentUser] = useState();
    const [appbarDisplay, setAppbarDisplay] = useState('');
    const history = useHistory();
    const [habits, setHabits] = useState([]);
    const [input, setInput] = useState('');
    const [currentHabit, setCurrentHabit] = useState();

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
            }
        });
        console.log("useeffect log: ", habits);
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
            habitHistory: [false],
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    async function deleteHabit(del_habit) {
        setWantDelete(false);

        await db.collection('users')
        .doc(currentUser.uid)
        .collection('dailyHabits')
        .doc(del_habit.id)
        .delete()
    }

    function deleteHabitWrapper(del_habit) {
        setWantDelete(true);
        setCurrentHabit(del_habit);
    }

    const [expandMe, setExpandMe] = useState(false);
    const [habitOverlay, setHabitOverlay] = useState();
    const [wantDelete, setWantDelete] = useState(false);

    return (
        <div className="habits_container">
            <HabitAppBar userName={appbarDisplay} />
            <h1> Your daily habits...</h1>
            <ol className="habit__list">
                <div className="daily__habits-input">
                    <div className="input__hint">
                        <Input maxLength={50} value={input} onChange={(e) => setInput(e.target.value)} />
                        <Hint direction="start">{!input && "Add a new habit"}</Hint>
                    </div>
                    <Button disabled={!input.length} onClick={addHabit}>Add Habit</Button>
                </div>
                {
                    habits.map((habit) => (
                        <div
                            key={habit.id}
                            className="daily__habit-wrapper"
                        >
                            <div
                                onClick={(e) => {
                                    setHabitOverlay(habit);
                                    console.log("habit overlay: ", habitOverlay);
                                    setExpandMe(!expandMe);
                                }}
                            >
                                <HabitCard key={habit.id} title={habit.habit} />
                            </div>
                            <motion.div onClick={() => deleteHabitWrapper(habit)} className="delete__icon" whileHover={{ scale: 1.1 }} className="habit__card-delete" style={{ backgroundColor:"#c5221d", width: "20px", borderRadius: "5px", textAlign: "center", padding: "5px 10px 5px 10px"}}>
                                <span style={{ color: "white", cursor: "pointer"}} className="k-icon k-i-delete"></span>
                            </motion.div>
                        </div>                        
                    ))
                }
            </ol>
            {
                expandMe && 
                (
                    <OverlayCard user={currentUser} habit={habitOverlay} toggleExpand={setExpandMe} />
                )
            }
            {
                wantDelete &&
                (
                    <Dialog title={"Do you want to delete this habit?"} onClose={() => setWantDelete(false)}>

                        <div style={{ marginBottom: "20px" }} className="delete__habit-buttons">
                            <Button className="delete__habit-del" onClick={() => deleteHabit(currentHabit)}>Yes, Delete</Button>
                            <Button className="delete__habit-cancel" onClick={() => setWantDelete(false)}>Cancel</Button>
                        </div>
                    </Dialog>
                )
            }
        </div>
    );
}

export default DailyHabits;
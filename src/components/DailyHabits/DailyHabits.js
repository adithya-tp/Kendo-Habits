import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Hint } from '@progress/kendo-react-labels';
import { Dialog } from '@progress/kendo-react-dialogs';
import { firstDayOfMonth, lastDayOfMonth } from '@progress/kendo-date-math';


import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import HabitCard from '../HabitCard/HabitCard';
import './DailyHabits.css';
import firebase from 'firebase';
import { useHistory } from 'react-router';
import OverlayCard from '../OverlayCard/OverlayCard';
import { motion } from 'framer-motion';

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
        let habitHistory = new Array(200).fill(false);
        for(let i = 0; i < 199; i++) {
            if(Math.random() < 0.7) {
                habitHistory[i] = true;
            }
        }

        const daysCumSum = [];
        const today = new Date(Date.now());
        const year_start = new Date(today.getFullYear(), 0, 1);
        var curr_date = year_start;
        while(curr_date.getMonth() < today.getMonth()) {
            let month_start = firstDayOfMonth(curr_date);
            let month_end = lastDayOfMonth(curr_date);
            daysCumSum.push(month_end.getDate() - month_start.getDate() + 1);
            curr_date = new Date(curr_date.getFullYear(), curr_date.getMonth() + 1, 1);
        }
        daysCumSum.push(today.getDate());
        daysCumSum.push(0);
        for(let i = daysCumSum.length - 2; i >= 0; i--) {
            daysCumSum[i] += daysCumSum[i + 1];
        }

        var habitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var hh_copy = [...habitHistory];
        for(let i = 0; i < daysCumSum.length - 1; i++) {
            var curr_slice = hh_copy.slice(hh_copy.length - daysCumSum[i], hh_copy.length - daysCumSum[i + 1]);
            habitCounts[i] = curr_slice.reduce((a, b) => a + b, 0);
        }
        // console.log(daysCumSum);
        // console.log(habitCounts);

        db.collection('users')
        .doc(currentUser.uid)
        .collection('dailyHabits')
        .add({
            habit: input,
            habitDescription: '',
            habitLabels: ['all'],
            habitHistory: habitHistory,
            habitCol: Math.floor(Math.random()*16777215).toString(16),
            habitCounts: habitCounts,
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
                                <HabitCard key={habit.id} title={habit.habit} bgc={habit.habitHistory[habit.habitHistory.length - 1] ? "#00ff00" : "#ffffff"} />
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
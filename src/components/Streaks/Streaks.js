import React, { useEffect, useState } from 'react';
import StreakTile from '../StreakTile/StreakTile';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import './Streaks.css'
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';

const Streaks = () => {

    const [appbarDisplay, setAppbarDisplay] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const [hoverHabit, setHoverHabit] = useState('Hover to see habit name');
    const [habitsData, setHabitsData] = useState([]);
    const history = useHistory();

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
                    setHabitsData(
                        snapshot.docs.map(
                            doc => 
                            {
                                var last_seven = doc.data().habitHistory;
                                last_seven = [...last_seven]
                                last_seven = last_seven.slice(Math.max(last_seven.length - 10, 0));

                                return({
                                    id: doc.id,
                                    habit: doc.data().habit,
                                    col: "#" + doc.data().habitCol,
                                    streak: last_seven
                                });
                            }
                        )
                    )
                });
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    }, []);

    // const [habitsDatePicker, setHabitsDatePicker] = useState({
    //     value: { 
    //         start: new Date(2021, 5, 2), 
    //         end: new Date(2021, 5, 9)
    //     }
    // });

    // const habitsDateChange = (event) => {
    //     setHabitsDatePicker({ value: event.target.value })
    // }

    function createHabitStreaks(data) {
        let cols = [];
    
        if(data.length) {
            let div = data[0].streak.length;
            for(let i = 0; i < data.length * data[0].streak.length; i++) {
                let clr;
                clr = data[Math.floor(i / div)].streak[i % div] ? data[Math.floor(i / div)].col : "#e0e0e0";
                cols.push(
                    <div  
                        key={i}
                        onMouseOver={() => setHoverHabit(data[Math.floor(i / div)].habit)}
                        onMouseOut={() => setHoverHabit('Hover to see habit name')}
                    >
                        <StreakTile h={Math.max(10, 100 - 2 * div)} w={Math.max(10, 100 - 2 * div)} key={i} color={clr} />
                    </div>
                )
            }
        }
        return cols;
    };

    return (
        <>
            <HabitAppBar userName={appbarDisplay} />
            <div className="streaks__main">
                <div className="streaks__middle">
                    <div className="title__middle">
                        <div className="title__middle-habit">
                            <h2 style={{borderBottom: "1px solid black"}}>{hoverHabit}</h2>
                        </div>
                        <div className="title__middle-date">
                            <h2>Date: May 1, 2020</h2>
                        </div>
                    </div>
                    <div className="habits__middle">
                        <div 
                            className="habit__streaks"
                            style={{
                                display: "grid",
                                gridTemplate: `repeat(${habitsData.length}, auto) / repeat(${habitsData.length ? habitsData[0].streak.length : 0}, auto)`,
                                gridGap: "0.1rem"
                            }}
                        >
                            {
                                createHabitStreaks(habitsData)
                            }
                        </div>
                    </div>
                </div>
                <div className="streaks__right">
                    <div className="habits__panelbar">
                        <PanelBar>
                            <PanelBarItem expanded={true} title="Habit Categories">
                                <PanelBarItem selected={true} title={'All'} />
                                <PanelBarItem title={'Sports'} />
                                <PanelBarItem title={'Mental Health'} />
                                <PanelBarItem title={'Work'} />
                                <PanelBarItem title={'Coding'} />
                            </PanelBarItem>
                        </PanelBar>
                    </div>
                    {/* <div className="habits__datepicker-card">
                        <Card>
                            <div className="habits__datepicker">
                                <div className="datepicker__header">
                                    <h3>Habit Timeline</h3>
                                </div>
                                <DateRangePicker
                                    value={habitsDatePicker.value}
                                    onChange={habitsDateChange}
                                />
                            </div>
                        </Card>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Streaks;
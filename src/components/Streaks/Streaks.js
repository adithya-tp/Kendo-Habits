import React, { useEffect, useState } from 'react';
import StreakTile from '../StreakTile/StreakTile';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import './Streaks.css'
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';

const Streaks = ({ allLabels }) => {

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
                                last_seven = last_seven.slice(Math.max(last_seven.length - 7, 0));

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

    const [label, setLabel] = useState('all');
    const [labels, setLabels] = useState([]);
    useEffect(() => {
        const temp_labels = [];
        if(allLabels.length) {
            var sel = false;
            allLabels[0].forEach(function(lab, idx) {
                if(lab === label) {
                    sel = true;
                } else {
                    sel = false;
                }
                temp_labels.push(
                    <div className="streak__label" style={{ height: "30px", fontFamily: 'Arvo'}} onClick={() => setLabel(lab)}>
                        <PanelBarItem key={idx} title={lab} selected={sel}/>
                    </div>
                );
            })

            setLabels([...temp_labels]);
        }
        console.log(label);
    }, [label]);

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

                    <div style={{ boxShadow: "-0.1rem 0.15rem 0rem rgba(0, 0, 0, 0.3)", position: "relative", marginTop: "5px", backgroundColor: "white", padding: "10px", borderRadius: "5px"}}>
                        <h3 style={{fontFamily: 'Arvo'}}>Selected Label : {label} </h3>
                    </div>
                </div>

                <div className="streaks__right">
                    <div className="habits__panelbar">
                        <PanelBar>
                            <PanelBarItem expanded={true} title="Habit Categories">
                                {
                                    labels
                                }
                            </PanelBarItem>
                        </PanelBar>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Streaks;
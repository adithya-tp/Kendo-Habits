import React, { useEffect, useState } from 'react';
import StreakTile from '../StreakTile/StreakTile';
import { Card, PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import './Streaks.css'
import { useAuth } from '../../contexts/AuthContext';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import { useHistory } from 'react-router';

function createHabitStreaks(data) {
    // console.log(data);
    let cols = [];
    for(let i = 0; i < data.length * data[0].streak.length; i++) {
        let clr;
        // console.log(i);
        clr = data[Math.floor(i / 7)].streak[i % 7] ? data[Math.floor(i / 7)].col : "#e0e0e0";
        // console.log(clr);
        cols.push(<StreakTile key={i} color={clr} />)
    }
    return cols;
};

const Streaks = () => {

    const { currentUser } = useAuth();
    const [appbarDisplay, setAppbarDisplay] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(currentUser) {
            setAppbarDisplay(currentUser.displayName);
        }
    });

    const [habitsDatePicker, setHabitsDatePicker] = useState({
        value: { 
            start: new Date(2021, 5, 2), 
            end: new Date(2021, 5, 9) 
        }
    });

    const habitsDateChange = (event) => {
        setHabitsDatePicker({ value: event.target.value })
    }

    const[habitsData, setHabitsData] = useState([
        {
            col: "#ff0000",
            streak: [1, 1, 1, 1, 0, 0, 0]
        },
        {
            col: "#00A3FF",
            streak: [1, 0, 1, 1, 1, 1, 1]
        },
        {
            col: "#00FFB2",
            streak: [1, 1, 1, 1, 1, 1, 1]
        },
        {
            col: "#F54CB1",
            streak: [0, 0, 0, 1, 1, 0, 1]
        },
    ]);

    return (
        <>
            <HabitAppBar userName={appbarDisplay} />
            <div className="streaks__main">
                <div className="streaks__middle">
                    <div className="title__middle">
                        <h1>Your Habit Streaks</h1>
                    </div>
                    <div className="habits__middle">
                        <div className="date__hover">
                            <h2>May 1</h2>
                        </div>
                        <div className="habit__streaks">
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
                    <div className="habits__datepicker-card">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Streaks;
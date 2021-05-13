import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import HabitCard from '../HabitCard/HabitCard';
import './DailyHabits.css';

const DailyHabits = () => {

    const { currentUser } = useAuth();
    const [appbarDisplay, setAppbarDisplay] = useState('');

    useEffect(() => {
        if(currentUser) {
            setAppbarDisplay(currentUser.displayName);
        }
    });

    return (
        <div className="habits_container">
            <HabitAppBar userName={appbarDisplay} />
            <h1> Your daily habits...</h1>
            <ol className="habit__list">
                <HabitCard title="Make bed in the morning." />
                <HabitCard title="Do 10 pushups." />
                <HabitCard title="Read a few pages of a book before bed." />
                <HabitCard title="Do 10 pushups." />
                <HabitCard title="Make bed in the morning." />
                <HabitCard title="Do 10 pushups." />
                <HabitCard title="Read a few pages of a book before bed." />
                <HabitCard title="Do 10 pushups." />
            </ol>
        </div>
    );
}

export default DailyHabits;
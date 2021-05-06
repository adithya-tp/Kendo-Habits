import React from 'react';
import HabitCard from '../HabitCard/HabitCard';
import './DailyHabits.css';

const DailyHabits = () => {
    return (
        // <div className="timeline__container">
            <div className="timeline">
                <ul>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                    <li>
                        <div className="timeline__content">
                            <HabitCard title="Tidy up bed in the morning" />
                        </div>
                    </li>
                </ul>
            </div>
        // </div>
    );
}

export default DailyHabits;
import React from 'react';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import './HabitCard.css';

const HabitCard = ({ title }) => {
    return (
        <Card className="habit__card">
            <CardHeader>
                {title}
            </CardHeader>
        </Card>
    );
}

export default HabitCard;
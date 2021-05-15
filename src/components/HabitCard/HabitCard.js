import React from 'react';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import './HabitCard.css';
import { motion } from 'framer-motion';

const HabitCard = ({ title, bgc }) => {

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="habit__card"
        >
            <Card className="habit__card" style={{backgroundColor: bgc}}>
                <CardHeader className="habit__cardheader">
                    {title}
                </CardHeader>
            </Card>
        </motion.div>
    );
}

export default HabitCard;
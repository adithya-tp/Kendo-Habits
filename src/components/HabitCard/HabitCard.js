import React, { useState } from 'react';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import { TextArea } from '@progress/kendo-react-labels';
import { Dialog } from '@progress/kendo-react-dialogs';
import './HabitCard.css';
import { motion } from 'framer-motion';

const HabitCard = ({ title }) => {

    const [expandMe, setExpandMe] = useState(false);

    const expandHabitCard = () => {
        setExpandMe(!expandMe);
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={expandHabitCard}
            className="habit__card"
        >
            <Card className="habit__card">
                <CardHeader className="habit__cardheader">
                    {title}
                </CardHeader>
            </Card>

            {
                expandMe && 
                <Dialog title={title} onClose={expandHabitCard}>
                    <h3>Description</h3>


                </Dialog>
            }
        </motion.div>
    );
}

export default HabitCard;
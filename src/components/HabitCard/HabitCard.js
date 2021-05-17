import React from 'react';
import { Card, CardHeader } from '@progress/kendo-react-layout';
import './HabitCard.css';
import { motion } from 'framer-motion';

const HabitCard = ({ title, bgc, lab }) => {

    const lab_tags = [];
    for(let i = 0; i < lab.length; i++) {
        lab_tags.push(<h4 style={{ opacity: 0.8, textAlign: 'center', color: "white", backgroundColor: "#3963ED", height: "10px", width:`${8 * lab[i].length}px`, maxWidth: "100px", padding: "0px 4px 10px 4px", margin: "5px 2px 0px 5px", borderRadius: "3px"}}>{lab[i]}</h4>)
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className="habit__card"
        >
            <Card className="habit__card" style={{backgroundColor: bgc}}>
                <div style={{display: 'flex'}}>
                    { 
                        lab_tags
                    }
                </div>
                <CardHeader className="habit__cardheader">
                    {title}
                </CardHeader>
            </Card>
        </motion.div>
    );
}

export default HabitCard;
import { motion } from 'framer-motion';
import React from 'react';
import './StreakTile.css';

const StreakTile = ( {color} ) => {
    return (
        <motion.div whileHover={{ scale: 1.1 }} className="streak__tile" style={{ backgroundColor: color}}></motion.div>
    );
}

export default StreakTile;
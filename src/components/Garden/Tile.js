import { motion } from 'framer-motion';
import React from 'react';
import '../Garden/game.css';

const Tile = ({ src, x, y, z }) => {
    return (
        <motion.img
            alt="garden_tile"
            src={src}
            className="tile"
            style={{left: `${x}%`, top: `${y}%`, zIndex: z}}
        />
    );
}

export default Tile;
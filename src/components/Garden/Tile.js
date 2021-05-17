import { motion } from 'framer-motion';
import React from 'react';
import { land_both } from '../../garden/images';
import '../Garden/game.css';

const Tile = ({ src, x, y, z, ybase }) => {
    let additional_img = src.includes('tree') ? (<motion.img
                                                    whileHover={{ opacity: 0.2}}
                                                    alt="garden_tile"
                                                    src={land_both}
                                                    className="tile"
                                                    style={{left: `${x}%`, top: `${ybase}%`, zIndex: z}}
                                                />) : (null);
    return (
        <>
            {
                additional_img
            }
            <motion.img
                whileHover={{ opacity: 0.2}}
                alt="garden_tile"
                src={src}
                className="tile"
                style={{left: `${x}%`, top: `${y}%`, zIndex: z}}
            />
        </>
    );
}

export default Tile;
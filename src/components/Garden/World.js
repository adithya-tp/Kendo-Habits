import React from 'react';
import Landscape from './Landscape';
import '../Garden/game.css';

const World = ({ itemPositions }) => {
    return (
        <div className="world">
            <Landscape itemPositions={itemPositions} />
        </div>
    );
}

export default World;